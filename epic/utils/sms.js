const twilio = require("twilio");

console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("MSG SID:", process.env.TWILIO_MESSAGING_SERVICE_SID);
console.log("TOKEN EXISTS:", !!process.env.TWILIO_AUTH_TOKEN);

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



async function sendOTP(mobile, otp) {

    const formattedNumber = formatMobile(mobile);

    try {

        await client.messages.create({

            body: `Your OTP to download your EPIC for IIS CR July Election is ${otp}. Valid for 5 minutes. CEC`,

            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID,

            to: formattedNumber

        });

    } catch (err) {

        console.log("========== TWILIO ERROR ==========");
        console.log("Code:", err.code);
        console.log("Status:", err.status);
        console.log("Message:", err.message);
        console.log("More Info:", err.moreInfo);
        console.log("==================================");

        throw err;
    }

}


module.exports = sendOTP;