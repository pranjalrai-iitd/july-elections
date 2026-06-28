const express = require("express");

const router = express.Router();

const path = require("path");

const fs = require("fs");

const db = require("../database/db");



router.get("/pdf",(req,res)=>{


const mobile =
req.session.mobile;



if(!mobile){

return res.status(401).send(
"Unauthorized"
);

}



db.query(

`
SELECT pdf_file
FROM voters
WHERE mobile=?
`,

[mobile],

(err,result)=>{


if(err){

return res.status(500).send(
"Database error"
);

}



if(result.length===0){

return res.status(404).send(
"PDF not found"
);

}



const pdfPath =
path.join(

__dirname,
"../private_pdfs",
result[0].pdf_file

);



if(!fs.existsSync(pdfPath)){

return res.status(404).send(
"File missing"
);

}



res.setHeader(
"Content-Type",
"application/pdf"
);



fs.createReadStream(pdfPath)
.pipe(res);



});


});



module.exports = router;