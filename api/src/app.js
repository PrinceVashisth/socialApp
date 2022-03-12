const express = require('express');
const app = express();
const path = require('path');
const Port = process.env.PORT || 8000;
// Paths
require('../Databse/db/database');
const User = require('../Databse/model/user');
const UserRoute = require('../Routes/users');
const AuthRoute = require('../Routes/Auth');
const PostRoute = require('../Routes/posts');
// middlewares
app.use(express.json());
app.use("/Api/users",UserRoute);
app.use("/Api/Auth",AuthRoute);
app.use('/Api/Posts',PostRoute);


app.listen(Port,(req,res)=>{
    console.log(`Listening at port ${Port}`);
})
