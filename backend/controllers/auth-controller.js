const UserDto  = require("../Dto/user-dto");
const hashService = require("../services/hash-service");
const OtpService = require("../services/OtpService");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
class AuthController {
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }
    const otp = await OtpService.generateOtp();

    // hash
    const ttl = 1000 * 60 * 5;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires} `;
    const hash = hashService.hashOtp(data);

    // send OTP
    try {
      // await OtpService.sendBySms(phone, otp);  
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "OTP sending failed!" });
    }
  }

  // OTP Verify Function  and check and create new user
  async verifyOtp(req, res) {
    const { otp, hash, phone } = req.body;
    if (!otp || !hash || !phone) {
      res.status(400).json({ message: "All fields are required" });
    }

    const [hashedOtp, expires] = hash.split(".");

    if (Date.now() > expires) {
      res.status(400).json({ message: "OTP expired!" });
    }
    // data receive from user
    const data = `${phone}.${otp}.${expires} `;

    const isValid = OtpService.verifyOtp(hashedOtp, data);
    if (!isValid) {
      res.status(400).json({ message: "invalid OTP" });
    }

    let user;
    try {
      user = await userService.findUser({ phone });
      if (!user) {
        user = await userService.createUser({ phone });
      }
    } catch (err) {
      console.log(err);
    }
   // json web tokens
    const { accessToken, refreshToken } = tokenService.generateTokens({ _id: user._id, activated: false });
    tokenService.storeRefreshToken(refreshToken, user._id);
    // store accessToken in cookie and store refreshToken in cookie
    // on every request refreshToken assign 
    res.cookie('refreshToken',refreshToken, {
      // valid for 30 days
      maxAge: 1000 * 60 * 60 * 24 * 30,
      // javascript can't read httpOnly cookie only server can read
      httpOnly:true
    })
    res.cookie("accessToken", accessToken, {
      // valid for 30 days
      maxAge: 1000 * 60 * 60 * 24 * 30,
      // javascript can't read httpOnly cookie only server can read
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({user:userDto,auth:true});

  }
}
module.exports = new AuthController();
