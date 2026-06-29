// Load environment variables FIRST
const dotenv = require("dotenv");
const result = dotenv.config();

console.log(result);

console.log("DB_USER =", process.env.DB_USER);
console.log("DB_HOST =", process.env.DB_HOST);


// Imports
const express = require("express");
const path = require("path");
const session = require("express-session");


// Initialize database after env is loaded
require("./database/db");


// Routes
const authRoutes = require("./routes/auth");
const pdfRoutes = require("./routes/pdf");
const adminRoutes = require("./routes/admin");


// Create app FIRST
const app = express();



app.use(express.json());


app.use(express.urlencoded({
    extended: true
}));



// Session
app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
        maxAge: 10 * 60 * 1000,
        httpOnly: true
    }

}));



// Static files
app.use(express.static("public"));



// Routes
app.use("/api", authRoutes);

app.use("/api", pdfRoutes);

app.use("/admin", adminRoutes);



// Home page
app.get("/", (req,res)=>{

    res.sendFile(
        path.join(__dirname,"public","index.html")
    );

});



// Start server
const PORT = process.env.PORT || 3000;


app.listen(PORT, ()=>{

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});