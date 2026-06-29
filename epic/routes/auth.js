const express = require("express");

const router = express.Router();

const db = require("../database/db");

const generateOTP = require("../utils/otp");

const sendOTP = require("../utils/sms");



// Request OTP
router.post("/request-otp", async (req, res) => {

    const { name, mobile } = req.body;


    if (!name || !mobile) {

        return res.json({
            success: false,
            message: "Name and mobile required"
        });

    }


    try {

        const result = await db.query(
            `
            SELECT *
            FROM voters
            WHERE name=$1 AND mobile=$2
            `,
            [name, mobile]
        );


        if (result.rows.length === 0) {

            return res.json({
                success: false,
                message: "Details not found"
            });

        }


        const otp = generateOTP();


        const expiry = new Date(
            Date.now() + 5 * 60 * 1000
        );


await db.query(
`
INSERT INTO otp_codes
(mobile, otp, expires_at)
VALUES($1,$2,$3)
`,
[
    mobile,
    otp,
    expiry
]
);


const message =
`Your OTP to download your EPIC for IIS CR July Election is ${otp}. Valid for 5 minutes. CEC`;


await db.query(
`
INSERT INTO otp_requests
(mobile, otp, message)
VALUES($1,$2,$3)
`,
[
    mobile,
    otp,
    message
]
);



        try {

            await sendOTP(
                mobile,
                otp
            );


            console.log("OTP sent");


            return res.json({

                success: true,
                message: "OTP sent successfully"

            });


        } catch(err) {

            console.log(
                "SMS error:",
                err.message
            );


            return res.json({

                success:false,
                message:"OTP generated but SMS failed"

            });

        }



    } catch(err) {

        console.log(
            "DATABASE ERROR:",
            err
        );


        return res.json({

            success:false,
            message:"Database error"

        });

    }


});






// Verify OTP
router.post("/verify-otp", async (req,res)=>{


    const {mobile, otp} = req.body;


    try {


        const result = await db.query(

            `
            SELECT *
            FROM otp_codes
            WHERE mobile=$1
            AND otp=$2
            AND expires_at > NOW()
            `,

            [
                mobile,
                otp
            ]

        );



        if(result.rows.length === 0){

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



    } catch(err) {


        console.log(
            "VERIFY ERROR:",
            err
        );


        return res.json({

            success:false,
            message:"Database error"

        });

    }


});



module.exports = router;