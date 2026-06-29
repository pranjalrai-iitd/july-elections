// Load environment variables FIRST
const dotenv = require("dotenv");
const result = dotenv.config();

console.log(result);

console.log("DB_USER =", process.env.DB_USER);
console.log("DB_HOST =", process.env.DB_HOST);


// Now load everything else
const express = require("express");
const path = require("path");
const session = require("express-session");


// Initialize database after env is loaded
require("./database/db");


const authRoutes = require("./routes/auth");
const pdfRoutes = require("./routes/pdf");


const app = express();


app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
        maxAge: 10 * 60 * 1000,
        httpOnly: true
    }

}));


app.use(express.static("public"));


app.use("/api", authRoutes);
app.use("/api", pdfRoutes);



app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"public","index.html")
    );

});



const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});