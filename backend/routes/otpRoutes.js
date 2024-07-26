const express = require('express');
const { generateOtp, verifyOtp } = require('../controllers/otpControllers');

const otpRouter = express.Router();

otpRouter.get("/generate", generateOtp);
otpRouter.post("/verify", verifyOtp);

module.exports = otpRouter;