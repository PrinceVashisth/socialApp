const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/SocialApp',{})
.then(()=>{
    console.log('connection sucessfull');
}).catch((e)=>{
    console.log(e);
})