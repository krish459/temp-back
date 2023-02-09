const bcrypt = require("bcrypt")
const _ = require("lodash")
// const axios = require("axios")
const otpGenerator = require("otp-generator")
const User = require("../models/userModel");
const Otp = require("../models/otpModel")




const sendOtp=async(OTP, number)=>{
    try{
        
    const otp = new Otp({number: number, otp: OTP})

    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt)
    const resultOtp = await otp.save()
    console.log("Otp sent successfully");

    
    }catch(error){
        console.log(`OTP not sent ${error}`);
    }
}
const verifyOtp=async(OTP, number,req,res)=>{
    try{
        const otpHolder = await Otp.find({
            number: number
        })
        // console.log("1");
        if(otpHolder.length===0)return res.status(400).send("You are using an Expired OTP!")
        // console.log("2");
        const rightOtpFind = otpHolder[otpHolder.length - 1]
        // console.log("3");
        const validUser = await bcrypt.compare(OTP, rightOtpFind.otp)
        // console.log("4");


        if(rightOtpFind.number=== req.body.number  && validUser){
            const user = new User(_.pick(req.body, ["number"]))
            // console.log("5");
            const token = user.generateJWT()
            // console.log("6");
            const result = user
            // console.log("7");
            const OTPDelete = await Otp.deleteMany({
                number: rightOtpFind.number
            })
            // console.log("8");
            return res.status(200).send({
                message: "Otp verification Successful",
                token: token,
                data: result
            })
            //console.log("9");

        }

    }catch(error){
        console.log(`OTP Verification Error :  ${error}`);
    }
}

module.exports = {sendOtp,verifyOtp
  };