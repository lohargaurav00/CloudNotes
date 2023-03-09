const mongoose = require("mongoose");
const mongoUrl = 'mongodb://127.0.0.1:27017/Notes';


const connectTOMongo =async ()=>{
     await mongoose.connect(mongoUrl);
     console.log("connected to mongod");

}


module.exports = connectTOMongo;