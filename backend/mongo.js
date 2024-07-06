const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const newSchemaa=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    ,
    username:{
        type:String,
        required:true
    },
    Mobile:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
})

// secureing our password with bycrpt,it acts as middleware ie data save krne se phle y run hga
newSchemaa.pre('save',async function(next){
   
   const user=this;
   
   if(!user.isModified('password')){
   return next();
   }
   try{
    const saltRound=await bcrypt.genSalt(10);
    const hash_password=await bcrypt.hash(user.password,saltRound)
    console.log(hash_password);
    user.password=hash_password;
    next();
}
   catch(e){
     next(e)
   }
})


newSchemaa.methods.generateToken=async function(){
    try{
      return jwt.sign({
        userId:this._id.toString(),
        email:this.email,
        
      },
      process.env.JWT_KEY,
      {
        expiresIn:"30d"
      }
    )
   }
   catch(e){
   console.log(e);
   }
}









const collection=mongoose.model("userdata",newSchemaa);
module.exports=collection;