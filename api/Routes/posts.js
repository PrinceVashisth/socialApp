const Router = require('express').Router();
const async = require('hbs/lib/async');
const Post = require('../Databse/model/Post');


// Create a post 
Router.post('/', async (req,res)=>{
     const newPost = new Post(req.body)
     try {
         const savePost = await newPost.save();
         res.status(200).send(savePost);
     } catch (error) {
         res.status(500).send(error);
     }
})

// Update a post 
Router.put('/:id', async (req,res)=>{
    try{ const post = await Post.findById(req.params.id);
     if (post.userId === req.body.userId) {
      await Post.updateOne({$set:req.body});
      res.status(200).send('post updated');
    } else {
         res.status(403).send('you can update only your post');     
     }}catch(e){
       res.status(500).send(e);
     }
})

// Delete a post 

Router.delete('/:id', async (req,res)=>{
    try{ const post = await Post.findById(req.params.id);
     if (post.userId === req.body.userId) {
      await Post.deleteOne();
      res.status(200).send('post deleted');
    } else {
         res.status(403).send('you can delete only your post');     
     }}catch(e){
       res.status(500).send(e);
     }
})

// Like A Post
Router.put('/:id/like', async (req,res)=>{
    try{ 
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.send('post has been liked').status(200);      
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.send('post has been disliked').status(200);
        }
    }catch(e){
       res.send(e).status(500);
    }
   })

// get A Post 

Router.get("/:id", async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        res.send(post).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
})

// GET ALL POSTS
Router.get("/timeline/:userId", async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        const UserPost = await Post.find({userId:currentUser._id});
        const FriendPosts = await Promise.all(
            currentUser.Followings.map(friendId=>{
                Post.find({userId:friendId});
            })
        );
        res.send(UserPost.concat(...FriendPosts)).status(200);
    } catch (error) {
        res.send(error).status(500);
    }
})

module.exports = Router;