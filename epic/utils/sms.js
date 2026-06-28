const twilio = require("twilio");


const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);



function formatMobile(number){

    // remove spaces, dashes, brackets
    number = number.replace(/\D/g,'');


    // if already has country code
    if(number.startsWith("91")){
        return "+" + number;
    }


    // Indian 10 digit number
    return "+91" + number;

}



async function sendOTP(mobile, otp){


    const formattedNumber =
    formatMobile(mobile);



    console.log(
        "Sending OTP to:",
        formattedNumber
    );


    await client.messages.create({

        body:
        `Your OTP for downloading your IIS CR July Election EPIC is ${otp}. Valid for 5 minutes.`,

        from:
        process.env.TWILIO_PHONE_NUMBER,

        to:
        formattedNumber

    });


}



module.exports = sendOTP;