const mongoose=require('mongoose')

const userdetailSchema=new mongoose.Schema({
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        reference: "User"
    }
})
mongoose.model("Userdetails",userdetailSchema)