const express=require ('express');
const dotenv=require('dotenv');
dotenv.config();

const app=express();

const PORT=process.env.PORT || 5000;
app.get('/',(req,res)=>res.send('API is running'));
app.post('/',(req,res)=>{
    console.log("hello world");
    res.send(req.body);
})
app.listen(PORT,console.log(`Server started at port ${PORT} `));

