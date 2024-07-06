const express=require("express")
const collection=require("./mongo")
const cors=require("cors")
require('dotenv').config();
const Jwt=require('jsonwebtoken')
const jwtKey='e-comm';
const bcrypt=require("bcryptjs")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

const mongoose=require("mongoose")
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("connected");
})
.catch((err)=>console.log(err))

app.post("/login",async(req,res)=>{
    const{email,password}=req.body
    try{
        const check=await collection.findOne({email:email})
        if(check){
            const token = await check.generateToken();
            res.json({msg:"exist",token:token});
        }
        else{
            res.json("not exist")
        }
    }
    catch(e){

    }
})
app.post("",async(req,res)=>{
    const{email,password,address,mobile,username}=req.body

    const data={
        email:email,
        password:password,
        address:address,
        Mobile:mobile,
        username:username
    }
    try{
        const check=await collection.findOne({email:email})
        if(check){
            res.json("exist");
        }        
        else{   

            const newUser=  await collection.create(data);   
            const token = await newUser.generateToken();
            res.json({msg:"not exist",token:token})
        }
    }
    catch(e){
       console.log(e);
    }
})
app.get("",(req,res)=>{
    res.send("Fsd")
})
app.listen(8000,()=>{
    console.log("port connected");
})