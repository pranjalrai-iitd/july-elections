const express = require("express");

const router = express.Router();

const db = require("../database/db");

const generateOTP = require("../utils/otp");

const sendOTP = require("../utils/sms");



router.post("/request-otp", (req,res)=>{


    const {name,mobile} = req.body;


    if(!name || !mobile){

        return res.json({

            success:false,

            message:"Name and mobile required"

        });

    }



    const query =
    `
    SELECT * FROM voters
    WHERE name=? AND mobile=?
    `;



    db.query(
        query,
        [name,mobile],
        (err,result)=>{


            if(err){

                console.log(err);

                return res.json({

                    success:false,

                    message:"Database error"

                });

            }



            if(result.length===0){


                return res.json({

                    success:false,

                    message:"Details not found"

                });


            }



            const otp =
            generateOTP();



            const expiry =
            new Date(
                Date.now()+5*60*1000
            );



            db.query(

                `
                INSERT INTO otp_codes
                (mobile,otp,expires_at)
                VALUES(?,?,?)
                `,

                [
                    mobile,
                    otp,
                    expiry
                ],

                ()=>{


                    sendOTP(
    mobile,
    otp
)
.then(()=>{

    console.log("OTP sent");

})
.catch(err=>{

    console.log(
    "SMS error:",
    err.message
    );

});


                    return res.json({

                        success:true,

                        message:
                        "OTP generated successfully"

                    });


                }

            );



        }

    );



});



router.post("/verify-otp",
(req,res)=>{


const {mobile,otp}=req.body;



db.query(

`
SELECT * FROM otp_codes
WHERE mobile=?
AND otp=?
AND expires_at > NOW()
`,

[mobile,otp],

(err,result)=>{


if(err){

return res.json({

success:false,

message:"Database error"

});

}



if(result.length===0){

return res.json({

success:false,

message:"Invalid or expired OTP"

});

}



req.session.mobile = mobile;


return res.json({

success:true,

message:"OTP verified"

});


}


);


});
module.exports = router;