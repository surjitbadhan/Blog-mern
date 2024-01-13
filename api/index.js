const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/users");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const port = 4000;
app.use(cors());
app.use(express.json());

const secretKey = "yourSecretKey";

mongoose.connect("mongodb://localhost:27017/blogMern");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, password: hashedPassword });
    res.json({ message: "Registration Successful" });
  } catch (error) {
    res.status(400).json(error);
  }
});

app.post("/login", async (req, res) => { 
  const { username, password } = req.body;

  // Find the user (replace this with your actual user model)
  try {
    const user = await User.findOne({ username });
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      jwt.sign({ username, id: user._id }, secretKey, (err, token) => {
        if (err) {
          throw err;
        }
        res.json(token);
      });
    } else {
      throw err;
    }
  } catch (e) {
    res.status(400).json("wrong credentials");
  }
});

app.get('/profile',(req,res)=>{
 try{
  const token= req.headers.authorization;
  // console.log(req.headers.authorization)
  jwt.verify(token,secretKey,(err,info)=>{
    if(err){
      throw err;
    }
    res.json(info);
  })
 }
 catch(err){
  res.status(400).json("error")
 }
})

app.listen(port, () => {
  console.log(`app is listening at ${port}`);
});
//mongodb://localhost:27017/
