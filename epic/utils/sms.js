const twilio = require("twilio");


const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);



function formatMobile(number) {

    number = String(number).replace(/\D/g, "");


    // Already has country code
    if (number.startsWith("91")) {
        return "+" + number;
    }


    // Indian numbers
    return "+91" + number;

}



async function sendOTP(mobile, otp) {


    const formattedNumber = formatMobile(mobile);


    console.log("Sending OTP to:", formattedNumber);


    try {


        const message = await client.messages.create({

            body:
            `Your OTP to download your EPIC for IIS CR July Election is ${otp}. Valid for 5 minutes. CEC`,


            messagingServiceSid:
            process.env.TWILIO_MESSAGING_SERVICE_SID,


            to:
            formattedNumber

        });



        console.log("OTP sent. SID:", message.sid);


        return true;


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