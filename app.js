const express=require('express')
const app=express()
const port=4000


const mongoose=require('mongoose')
mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/marriage")

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connecting",err)
})
require('./models/user.js')
require('./models/userdetails.js')
app.use(express.json())
app.use(require('./routes/auth.js'))
app.use(require('./routes/userdetails.js'))


app.listen(port,()=>{console.log(`The server is running on port ${port}`)})