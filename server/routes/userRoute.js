const { userRegister, userLogin , userAuth, verifyEmail} = require("../utils/Auth");
const { verifyOtp } = require("../utils/otpMobile");

const router = require("express").Router();

//  Registration route
router.post("/register", async (req, res) => {
  await userRegister(req.body, res);
});

// Owner Login route
router.post("/login", async (req, res) => {
  await userLogin(req.body, res);
});

router.get("/verify/:id/:token",async(req,res)=>{
 await verifyEmail(req,res)
})

router.post('/verify/otp',async(req,res)=>{
  await verifyOtp(req.body.otp,req.body.number,req,res)
 })

module.exports = router;
