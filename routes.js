let express = require('express');
let router = express.Router();
const {User} = require("./modal/user")

router.post("/addUser",async(req,res,next)=>{
    const user = new User({name:req.body.name,email:req.body.email,age:req.body.age})
    await user.save()
    res.status(200).send({message:"User Successfully Created....."})
})

router.get("/getAllUsers",async(req,res,next)=>{
    const usersList = await User.find({});
    res.status(200).send(usersList)
})

module.exports = router