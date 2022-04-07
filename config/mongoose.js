
//require the library
const mongoose = require("mongoose");

const DB = 'mongodb+srv://Signup:123@cluster0.nnrbm.mongodb.net/todolist?retryWrites=true&w=majority';



mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log('connection successful')
}).catch((err)=>{
   console.log(err)            
})
