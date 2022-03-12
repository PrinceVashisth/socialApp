// const mongoose = require('mongoose');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../Databse/model/user');

// Update User 
router.put('/:id', async (req,res)=>{    
    if(req.body.userId === req.params.id || req.user.IsAdmin){
        if(req.body.password){
            try{
                const Salt =await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,Salt);
            }catch(error){
                 res.statusCode(500).send("error");
        }
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body})
        res.status(200).send("Account Has Been Updated");
    } catch (error) {
         res.send(error);
    }
    }else{
         res.statusCode(403).send('you can only update your Account');
    }
})

// Delete User
router.delete('/:id', async (req,res)=>{    
    if(req.body.userId === req.params.id || req.body.IsAdmin){
       
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send("Account Has Been deleted sucessfully");
    } catch (error) {
         res.send(error);
    }
    }else{
         res.status(403).send('you can delete only your Account');
    }
})

// Get a User

router.get('/:id',async(req,res)=>{
      try {
          const user = await User.findById(req.params.id);
          const {password,updatedAt, ...others} = user._doc
          res.send(others).status(200);
      } catch (error) {
          res.send(error).status(404);
      }
})

//Follow A user

router.put('/:id/follow',async (req,res)=>{
   if(req.body.userId !== req.params.id ){
       try {
           const user = await User.findById(req.params.id);
           const Currentuser = await User.findById(req.body.userId);
           if(!user.Followers.includes(req.body.userId)){
                 await user.updateOne({$push:{Followers:req.body.userId}});
                 await Currentuser.updateOne({$push:{Followings:req.body.id}});
                 res.send('user has been followed').status(200);
           }else{
               res.status(403).send('you already followed this user');
           }
       } catch (error) {
           res.status(500).send(error);
       }
   }else{
       res.status(403).send('You Can Not Follow Yourself');
   }
})

// Unfolllow A user

router.put('/:id/unfollow',async (req,res)=>{
    if(req.body.userId !== req.params.id ){
        try {
            const user = await User.findById(req.params.id);
            const Currentuser = await User.findById(req.body.userId);
            if(user.Followers.includes(req.body.userId)){
                  await user.updateOne({$pull:{Followers:req.body.userId}});
                  await Currentuser.updateOne({$pull:{Followings:req.body.id}});
                  res.send('user has been unfollowed').status(200);
            }else{
                res.status(403).send('you not followed this user');
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }else{
        res.status(403).send('You Can Not unFollow Yourself');
    }
 })
 

module.exports = router;