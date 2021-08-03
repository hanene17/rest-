
const express= require("express");
//const bodyParser = require('body-parser')
require("dotenv").config({ path: "./config/.env" });
const dbconnect= require('./config/connectdb')
// require enviroment variable
const app= express();

const User= require('./models/User')
const PORT= process.env.PORT
// connect DB
dbconnect()
app.use(express.json());


//test routing
app.get('/', function(req, res) {
    res.send('hello world');
  });
//RETURN ALL USERS 
app.get("/users", async (req, res) => {
    try {
      const result = await User.find();
      res.send({ response: result, message: "geting users successfully" });
    } catch (error) {
      res.status(400).send({ message: "can not get contacts" });
    }
  });
  

  //ADD A NEW USER TO THE DATABASE
app.post("/users", async (req, res) => {
    try {
      const newUser = new User(req.body);
      const response = await newUser.save();
      res.send({ res: response, message: "New User added" });
    } catch (error) {
      console.log(error);
      res.status(400).send("status 400");
    }
  });
  //EDIT A USER BY ID 
  app.put("/users/:id", async (req, res) => {
    try {
      const result = await User.updateOne(
        { _id: req.params.id },
        { $set: { ...req.body } }
      );
  
      result.nModified
        ? res.send({ message: "user updated" })
        : res.send({ message: "user already updated" });
    } catch (error) {
      res.status(400).send({ message: "there is no user with this id" });
    }
  });
  //REMOVE A USER BY ID 
  app.delete("/users/:id", async (req, res) => {
    try {
      const result = await User.deleteOne({ _id: req.params.id });
      result.n
        ? res.send({ response: "user deleted" })
        : res.send("there is no user with this id");
    } catch (error) {
      res.status(400).send("there is no id ");
    }
  });
  
app.listen(PORT,(err)=>{
    err ? console.error(err): console.log(`server is running on port ${PORT}!`)
})
