const router = require("express").Router();
const activateController = require("./controllers/activate-controller");
const authController = require("./controllers/auth-controller");
const activateMiddleware = require("./middlewares/activate-middleware");
const roomController = require("./controllers/rooms-controller");
router.post("/api/send-otp", authController.sendOtp);
router.post("/api/verify-otp", authController.verifyOtp);
router.post("/api/activate", activateMiddleware, activateController.activate);
// activate middleware check if user has valid tokens or not
router.get("/api/refresh", authController.refresh);
router.post("/api/logout", activateMiddleware, authController.logout);
router.post("/api/rooms", activateMiddleware, roomController.create);
router.get("/api/rooms", activateMiddleware, roomController.getAllRooms);


module.exports = router;
