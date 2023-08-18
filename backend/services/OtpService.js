const crypto = require("crypto");
const hashService = require("./hash-service");
const accountSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
const client = require("twilio")(accountSid, smsAuthToken, {
  lazyLoading: true,
});

class OtpService {
  generateOtp() {
    return crypto.randomInt(1000, 9999); // randomInt fucnction use to generate random integer between 1000 and 9999
  }
  async sendBySms(phone, otp) {
    return await client.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your Codersvoices OTP is ${otp}`,
    });
  }
  verifyOtp(hashOtp, data) {
    const computedHash = hashService.hashOtp(data);
    return computedHash === hashOtp;
  }
  sendByEmail() {}
}
module.exports = new OtpService();
