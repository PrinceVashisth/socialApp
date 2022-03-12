const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    ProfilePicture:{
        type:String,
        default:""
    },
    CoverPicture:{
        type:String,
        default:""
    },
    Followers:{
       type:Array,
       default:[]
    },
    Followings:{
        type:Array,
        default:[]
    },
    IsAdmin:{
        type:Boolean,
        default:false
    },
    desct:{
       type:String,
       max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3],
    },   
  },
  {timestamps:true}
);


module.exports = mongoose.model("User",UserSchema);