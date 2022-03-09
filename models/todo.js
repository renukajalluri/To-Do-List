const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
   task:{
        type:String,
        required:true
    },
    date:{
        type:String ,
        // default: Date.now,
        required:true
    },
    category:{
        type:String,
        required:true
    }
});


const Todo = mongoose.model('Contact',todoSchema);

module.exports = Todo;