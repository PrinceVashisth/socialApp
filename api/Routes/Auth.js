const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../Databse/model/user');

// RagisterUser
router.post('/ragister', async (req,res)=>{
  const Salt = await bcrypt.genSalt(10);
  const Pass = await bcrypt.hash(req.body.password,Salt);
  const user= await new User({
    UserName:req.body.UserName,
     email:req.body.email,
     password:Pass
  })
  try {
    const Users = await user.save();
    res.send(user).status(200);
  } catch (error) {
    
  }
})

// LOGIN USER

router.post('/login',async (req,res)=>{
try {
  const user = await User.findOne({email:req.body.email});
  if(!user){
    res.sendStatus(404).send('not a user');
  }

  const ValidPassword = await bcrypt.compare(req.body.password,user.password);
  if (!ValidPassword) {
    res.sendStatus(404).send('wrong password');
  }
  res.sendStatus(200).send("okay");
} catch (error) {
  console.log(error);
}
})


module.exports = router;