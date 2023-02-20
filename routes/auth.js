const express=require('express')
const router=express.Router()
const mongoose=require('mongoose')
const User=mongoose.model('User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const jwt_key="sanbjhbdsvjhgcbsajhvcjhadsdbchjasdbvhgasddbchbsadhadvbhbhas"
const requirelogin=require('../middleware/requirelogin.js')
router.get('/check',requirelogin,(req,res)=>{
    res.send("hello")
})
router.post('/register',(req,res)=>{
    const {first_name,last_name,phone,password}=req.body

    User.findOne({phone:phone}).then((saveduser)=>{
        if(saveduser){
           return res.status(422).json({error:"user already exists"})
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user=new User({
                first_name,
                last_name,
                phone,
                password:hashedpassword
            })
            user.save().then(user=>{
                res.json({message:"saved successfully"})
            }).catch((err)=>{
                console.log(err)
            })
        })
        const user=new User({
            first_name,
            last_name,
            phone,
            password
        })
        user.save().then(user=>{
            res.json({message:"saved successfully"})
        }).catch((err)=>{
            console.log(err)
        })
    }).catch((err)=>{
        console.log(err)
    })
    
})
router.post('/login',(req,res)=>{
    const {phone,password}=req.body
    User.findOne({phone}).then((saveduser)=>{
        if(!saveduser){
            return res.status(422).json({error:"user does not exists"})
        }
        let domatch=false
        if(saveduser.password===password){
            domatch=true
        }
            if(domatch){
                // res.json({message:"loggedin successfully"})
                const token=jwt.sign({_id:saveduser._id},jwt_key)
                res.json({token})
            }else{
               return res.status(422).json({error:"incorrect password"})
            }
    })
})


module.exports=router