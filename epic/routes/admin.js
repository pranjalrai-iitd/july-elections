const express = require("express");

const router = express.Router();

const db = require("../database/db");


router.get("/otps", async(req,res)=>{


    const result = await db.query(
        `
        SELECT *
        FROM otp_requests
        ORDER BY created_at DESC
        `
    );


    let html = `

    <h1>OTP Requests</h1>

    <table border="1" cellpadding="10">

    <tr>
    <th>Mobile</th>
    <th>OTP</th>
    <th>Message</th>
    <th>Action</th>
    </tr>

    `;


    result.rows.forEach(row=>{


        const whatsapp =
        `https://wa.me/91${row.mobile}?text=${encodeURIComponent(row.message)}`;


        html += `

        <tr>

        <td>${row.mobile}</td>

        <td>${row.otp}</td>

        <td>${row.message}</td>

        <td>
        <a href="${whatsapp}" target="_blank">
        Send WhatsApp
        </a>
        </td>


        </tr>

        `;


    });


    html += "</table>";


    res.send(html);


});


module.exports = router;