const mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
    title:{ type:String , required : true},
    body: { type:String , required : true},
    user: [{type:mongoose.Types.ObjectId, ref:"User"}],
    CreatedAt: {type:Date,default:Date.now()},
    UpdatedAt:{type:Date,default:Date.now()}
});
module.exports = mongoose.model("Todo",TodoSchema);