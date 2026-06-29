const authRoutes = require("./routes/auth");
const express = require("express");
const path = require("path");
const pdfRoutes = require("./routes/pdf");
const session = require("express-session");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}


require("./database/db");


const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended:true
}));
app.use(session({

    secret: process.env.SESSION_SECRET,

    resave:false,

    saveUninitialized:false,

    cookie:{

        maxAge:10*60*1000,

        httpOnly:true

    }

}));

app.use(express.static("public"));
app.use("/api",authRoutes);
app.use("/api",pdfRoutes);


app.get("/",(req,res)=>{

res.sendFile(
path.join(__dirname,"public","index.html")
);

});


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

console.log(
`Server running at http://localhost:${PORT}`
);

});