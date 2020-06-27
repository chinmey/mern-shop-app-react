const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();

const items=require("./routes/api/items")
const users=require("./routes/api/users")
const auth=require("./routes/api/auth")

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/mernshopdb",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("connected database")});



app.use('/api/items',items);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port=process.env.PORT||5000;

app.listen(port,()=>{console.log(`server started on ${port}`)});