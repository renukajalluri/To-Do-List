const express = require('express');
const { redirect } = require('express/lib/response');
const db = require("./config/mongoose");
const Todo = require('./models/todo')
const app = express();
var dateTime = new Date(); 

var moment = require('moment');

const path = require('path');
const { title } = require('process');
const port = 8000;

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended: true} ));
app.use(express.static('assets'));

var toDo =[
    {
        task:"eating",
        date:new Date().toISOString().slice(0, 10),
        category:"Personal"
    },
    {
        task:"working",
        date : new Date().toISOString().slice(0,10),
        category:"work"
    }
]

app.get("/", function (req, res) {
    Todo.find({},(err,todos)=>{
        if(err){
            console.log("error in fetch todos from database");
        }else{
            return res.render("home",{
                     title:"To Do List App",
                     toDo_list : todos
                    })
        }
    })

  });
  
app.post("/create", function (req, res) {
    // toDo.push({
    //     task:req.body.task,
    //     date:req.body.date,
    //     category:req.body.category
    // });
    console.log(moment(req.body.date).format('YYYY-MM-DD'))
    Todo.create({
        task:req.body.task,
        date:moment(req.body.date).format('YYYY-MM-DD'),
        category: req.body.category
    },function(err,newTodo){
        if(err){
            console.log("error in creating the contact");
            return;
        }else{
            console.log(newTodo);
            return res.redirect('/')
        }
    })
    
  });

app.get('/delete-todo',(req,res)=>{
    //get the id from query in url
    let id = req.query.id;
      //find the todo in database using id and delete it
     Todo.findByIdAndDelete(id,(err)=>{
         if(err){
             console.log("error in deleting object form database")
         }else{
             return res.redirect('/');
         }
     })
    })  


var port_number = process.env.PORT;
app.listen(port_number,()=>{
    console.log(`listening on port ${port_number}`);    
})
