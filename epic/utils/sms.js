const twilio = require("twilio");


const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);


function formatMobile(number){

    number = number.replace(/\D/g,'');

    if(number.startsWith("91")){
        return "+" + number;
    }

    return "+91" + number;

}



async function sendOTP(mobile, otp){

    const formattedNumber = formatMobile(mobile);


    await client.messages.create({

        body:
        `Your OTP to download your EPIC for IIS CR July Election is ${otp}. Valid for 5 minutes. CEC`,

        messagingServiceSid:
        process.env.TWILIO_MESSAGING_SERVICE_SID,

        to:
        formattedNumber

    });

}


module.exports = sendOTP;