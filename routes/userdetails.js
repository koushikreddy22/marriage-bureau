const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const requirelogin = require('../middleware/requirelogin')
const Userdata=mongoose.model('Userdetails')

router.post('/create',requirelogin,(req,res)=>{
    const {age,gender}=req.body
    const userdata=new Userdata(
        {
            age,
            gender,
            user:req.user
        }
    )
    userdata.save().then((result)=>{
        res.json({userdata:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports=router