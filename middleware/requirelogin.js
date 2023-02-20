const jwt=require('jsonwebtoken')
const jwt_key="sanbjhbdsvjhgcbsajhvcjhadsdbchjasdbvhgasddbchbsadhadvbhbhas"
const mongoose=require('mongoose')
const User=mongoose.model('User')
module.exports=(req,res,next)=>{
    const {authorization}=req.headers
   
    if(!authorization){
       return res.status(401).json({error:"require login"})
    }
   const token= authorization.replace("Bearer ","")
   jwt.verify(token,jwt_key,(err,payload)=>{
    if(err){
       return res.status(401).json({error:"require login"})
    }
    const {_id}=payload
    User.findById({_id}).then((userdata)=>{
        req.user=userdata
        next()
    })
    
   })
}