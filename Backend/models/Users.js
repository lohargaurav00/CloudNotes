const mongoose =  require('mongoose');
const { Schema } = mongoose;  

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    
    },
    password:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const user = mongoose.model('user', usersSchema);
module.exports = user