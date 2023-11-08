const express = require('express');
const app = express();
const colors =require('colors');
const cookieParser = require("cookie-parser");
const cookieSession=require("cookie-session");
app.use(cookieParser());
require('dotenv').config();

const mongoose = require('mongoose');
const cors = require("cors")
app.use(express.json()); // For JSON data

const PORT = process.env.PORT||5000
// console.log(process.env.MONGO_URI);
// console.log(process.env.PORT);

app.use(cookieSession({
    name:"session",
    keys:["kalash"],
    maxAge:24*60*69*100,
  }))
  
app.use(cors({
  origin: ["http://127.0.0.1:3000", "http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}))

app.get('/', (req, res) => res.send('API is running'));

app.post('/', (req, res) => {
  console.log("hello world");
  res.send(req.body);
});

app.use('/api/user',require('./Routes/userRoute'));
// app.use('/api/message',require('./Routes/messageRoute'));


mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log('Mongodb connected'.bgBlue)})
.catch((err)=>{console.log('ERR :',err)})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`.bgMagenta.underline);
});
