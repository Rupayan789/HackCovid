const express=require('express');
const helmet = require('helmet');
const mongoose=require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors=require('cors')
require('dotenv').config();
const authRoute=require('./routes/auth')

const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'));
app.use(helmet());
app.use(cors())
//mongoose connection
mongoose.connect(process.env.MONGO_URI,{ useCreateIndex:true,useFindAndModify:true,useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Database Connected")});

app.use('/auth',authRoute)
module.exports=app;
