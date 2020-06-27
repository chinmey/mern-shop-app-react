const express=require("express");
const bcrypt=require("bcryptjs");

const router=express.Router();
// User Model
const User=require("../../modal/User");
const config=require('config');
const jwt=require('jsonwebtoken');

const auth=require("../../middleware/auth");

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






router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check for existing user
      const user = await User.findOne({ email });
      if (!user) throw Error('User Does not exist');
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw Error('Invalid credentials');
  
      const token = jwt.sign({ id: user._id }, config.get('jwtSecret'), { expiresIn: 3600 });
      if (!token) throw Error('Couldnt sign the token');
  
      res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  });


  /* route gets the user info from passed credential since jwt is stateless i helps to do authoriazation*/

  router.get('/user',auth,(req,res)=>{
      User.findById(req.user.id).select('-password').then(user=>res.json(user)) 
  })

module.exports= router;