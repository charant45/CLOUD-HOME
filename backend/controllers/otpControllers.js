const nodemailer = require("nodemailer");
const OtpModel = require("../model/otpSchema");
const { version } = require("mongoose");
const UserModel = require("../model/userModel");
// eqkj dwjs ihze ztkv
const setOTPMail = async (email, otp) =>{
    try{
        let mailer = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: process.env.OTP_EMAIL,
                pass: process.env.OTP_PASSWORD,
            },
        })
        
        const response = await mailer.sendMail({
            from: "home.cloud.web.dev.project@gmail.com",
            to: email,
            subject: "Cloud Home - OTP",
            html: `
            <html>
            <body>
            <h1>Your OTP for Cloud Home</h1>
            <h1>${otp}</h1>
            </body>
            </html>
            `,
        });
        console.log(response);
        return true;
    }catch(err){
        console.log(err);
        return false;
    }

}

const generateOtp = async (req, res) => {
    try {
        const { email, _id } = req.user;
        const restrictedTimeForOtp = 10 * 60 * 1000;
        
        const sentOTPMail = await OtpModel.findOne({ email, createdAt: { $gte: Date.now() - restrictedTimeForOtp } });
        console.log("sentOTPMail", sentOTPMail);
        
        if (sentOTPMail) {
            res.status(200);
            res.json({
                status: "success",
                message: `Otp is already sent to ${email}`,
                data: {},
            });
            return;
        }
        
        const randomOtp = Math.floor(1000 + Math.random() * 9000);
        console.log(randomOtp);
        
        const isMailSent = await setOTPMail(email, randomOtp);

        if (!isMailSent) {
            res.status(500);
            res.json({
                status: "fail",
                message: `Otp Not sent to ${email}`,
                data: {},
            });
            return;
        }

        await OtpModel.create({
            otp: randomOtp,
            email,
            userId: _id,
        });

        res.status(201);
        res.json({
            status: "success",
            message: `OTP sent to ${email}`,
            data: {},
        });
    } catch (error) {
        console.log("-------------------------------");
        console.log(error);
        console.log("-------------------------------");
        res.status(500);
        res.json({
            status: "fail",
            message: "Internal server error",
            data: {},
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const { otp } = req.body;

        console.log("Otp from request ", otp);


        const { email } = req.user;


        console.log("Email from request ", email);


        const sentOTPMail = await OtpModel.findOne({ email, createdAt: { $gte: Date.now() - 10 * 60 * 1000 } });
        if (!sentOTPMail) {
            res.status(404);
            res.json({
                status: "fail",
                message: "Verification failed",
            });
            return;
        }

        const hashedOtp = sentOTPMail.otp;


        console.log("Otp from database ", hashedOtp);


        const isCorrect = await sentOTPMail.verifyOtp(otp + "", hashedOtp);

        if (!isCorrect) {
            res.status(400);
            res.json({
                status: "fail",
                message: "Invalid OTP",
            });
            return;
        }

        await UserModel.findOneAndUpdate({ email }, { isEmailVerified: true });
        res.status(200);
        res.json({
            status: "success",
            message: "OTP verified",
        });
    } catch (error) {
        console.log("-------------------------------");
        console.log(error);
        console.log("-------------------------------");
        res.status(500);
        res.json({
            status: "fail",
            message: "Internal server error",
            data: {},
        });
    }
};

module.exports = { generateOtp, verifyOtp }