const express=require("express");
const bcrypt=require("bcryptjs");

const router=express.Router();
// User Model
const User=require("../../modal/User");
const config=require('config');
const jwt=require('jsonwebtoken');



/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

/*router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});*/

router.get("/",(req,res)=>{
    res.send("users");
})



router.post("/",(req,res)=>{
  const {name,email,password} =req.body;

  if(!name || !email || !password)
  {
    return res.status(400).json({msg:"enter all fields"});
  }

  const newUser= new User({
    name,email,password
});  

bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(newUser.password,salt,(err,hash)=>{
    if(err) throw err;
    newUser.password=hash;
    newUser.save()
    .then(user=>{

    jwt.sign({id:user.id},config.get('jwtSecret'),{expiresIn:3600},
    (err,token)=>{
      if(err) throw err;
      res.json({
        token,
        user:{
          id:user.id,
          name:user.name
        }
      })
    })


     
    })
  })
})

})

module.exports= router;