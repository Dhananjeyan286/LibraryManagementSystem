// import fast2Sms from "fast-two-sms"

// export default async function(text, number) {// here number shld be an array
//     console.log(fast2Sms)
//     console.log("REached")
//     console.log(fast2Sms.sendMessage)
//     fast2Sms.sendMessage({authorization : process.env.SMS_API_KEY, variables_values: "567", message: "HEllo all", numbers: ["6379078290"]}).then((response) => {
//         console.log(response)
//         console.log("sms sent")
//     }).catch((e)=>{
//         console.log(e)
//     })
// }

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;
// import client from "twilio"

// console.log("port number is")
// console.log(process.env.PORT)
// const clients = client(accountSid, authToken);

import { twilioClient } from "../server.js"


// +16614855056 - my twilio phone number
export default function (phone, text) {
    let code = "+91"
    phone = code + phone
    twilioClient.messages
        .create({
            body: text,
            messagingServiceSid: process.env.TWILIO_ACCOUNT_MESSAGING_SERVICE_ID,
            to: phone,
        })
        .then((message) => console.log(message.sid))
        .catch((err) => console.log(err))
}

// website link for adding phone numbers is - https://console.twilio.com/us1/develop/phone-numbers/manage/verified