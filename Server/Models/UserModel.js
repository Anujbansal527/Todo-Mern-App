const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv").config();

const UserSchema = mongoose.Schema({
    username:{ type:String , required : true},
    email: { type:String , required : true},
    password: { type:String , required : true},
    todo: [{type:mongoose.Types.ObjectId, ref:"Todo"}]
});

UserSchema.pre("save", async function(next) {
    const user = this;
    //console.log("User data at middile ware",user) 
    if(!user.isModified("password")){
        console.log("password is already modified")
        next();
    }
    try {
        const salt = 10;
        const hashed = await bcrypt.hash(user.password,salt)
        //console.log("Hashed password",hashed)
        this.password = hashed;
        next()
    } catch (error) {
        next(error)
    }
})  


UserSchema.methods.CreateToken = async function(next){
    const payload = {
        userId : this._id.toString(),
        email: this.email,
    }
    const SECERETE = process.env.JWT_SECERETE;
    //console.log(SECERETE)
    try {
        return jwt.sign(payload,SECERETE,{ expiresIn: "2hr"})
    } catch (error) {
        console.log(`Token not created ${error}`)
    }
}

UserSchema.methods.comparePass = async function(password){
    return await bcrypt.compare(password , this.password) ;
}


module.exports = mongoose.model("User",UserSchema);