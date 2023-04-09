const tokenService = require("../services/token-service");
module.exports = async function (req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      throw new Error();
    }
    const userData = await tokenService.verifyAccessToken(accessToken);
    req.user = userData; //  _id: '64327abf14bf1d25a1aa191a', activated: false
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" }); // unauthorized
  }
};
