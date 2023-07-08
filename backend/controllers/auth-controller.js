const UserDto = require("../Dto/user-dto");
const hashService = require("../services/hash-service");
const OtpService = require("../services/OtpService");
const tokenService = require("../services/token-service");
const userService = require("../services/user-service");
// const removeToken =
class AuthController {
  // otp send function
  async sendOtp(req, res) {
    const { phone } = req.body;
    if (!phone) {
      res.status(400).json({ message: "Phone field is required" });
    }
    const otp = await OtpService.generateOtp();

    // hash
    const ttl = 1000 * 60 * 5; // 1000 equal to 1 second
    const expires = Date.now() + ttl; // 10:18 + 5 = 10:23
    const data = `${phone}.${otp}.${expires}`; // 8769469542.4567.10:23
    const hash = hashService.hashOtp(data); // hashed otp

    // send OTP
    try {
      // await OtpService.sendBySms(phone, otp);
      return res.json({
        hash: `${hash}.${expires}`,
        phone,
        otp,
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

    if (Date.now() > +expires) {
      res.status(400).json({ message: "OTP expired!" });
    }
    // data receive from user
    const data = `${phone}.${otp}.${expires}`;

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
    const { accessToken, refreshToken } = tokenService.generateTokens({
      _id: user._id,
      activated: false,
    });
    tokenService.storeRefreshToken(refreshToken, user._id);
    // store accessToken in cookie and store refreshToken in cookie
    // on every request refreshToken assign
    res.cookie("refreshToken", refreshToken, {
      // valid for 30 days
      maxAge: 1000 * 60 * 60 * 24 * 30,
      // javascript can't read httpOnly cookie only server can read
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      // valid for 30 days
      maxAge: 1000 * 60 * 60 * 24 * 30,
      // javascript can't read httpOnly cookie only server can read
      httpOnly: true,
    });

    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  // token refresh method
  async refresh(req, res) {
    // get refresh token from cookie

    const { refreshToken: refreshTokenFromCookie } = req.cookies;
    // check if token is valid
    let userData;
    try {
      userData = await tokenService.verifyRefreshToken(refreshTokenFromCookie);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    // Check if token is in db

    try {
      const token = await tokenService.findRefreshToken(
        userData._id,
        refreshTokenFromCookie
      );
      if (!token) {
        return res.status(401).json({ message: "Invalid token" });
      }
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // check if valid user
    const user = await userService.findUser({ _id: userData._id });

    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    // Generate new tokens
    const { refreshToken, accessToken } = tokenService.generateTokens({
      _id: userData._id,
    });

    // Update refresh token
    try {
      await tokenService.updateRefreshToken(userData._id, refreshToken);
    } catch (err) {
      return res.status(500).json({ message: "Internal error" });
    }
    // put in cookie
    res.cookie("refreshToken", refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    // response
    const userDto = new UserDto(user);
    res.json({ user: userDto, auth: true });
  }

  async logout(req, res) {
    const { refreshToken } = req.cookies;
    await tokenService.removeToken(refreshToken);
    // delete cookies
    res.clearCookie("refreshToken");
    res.clearCookie("accessToken");
    res.json({ user: null, auth: false });
  }
} // end of class
module.exports = new AuthController();
