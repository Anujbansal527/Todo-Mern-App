const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const URL = process.env.DB_URL;

const Connection = async() => {
    await mongoose.connect(URL,{

    })
    .then(()=>{console.log(`Connected to database sucessfully`)})
    .catch((error)=>{console.log(`Error while connecting database ${error}`)})
}

module.exports = Connection;