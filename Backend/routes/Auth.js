const express = require('express')
const Users = require('../models/Users')
const router = express.Router()
const { body, validationResult } = require('express-validator');

router.get('/',[
   body('email',"Enter a valid email address").isEmail(),
   body('password',"Enter a valid Password").isLength({ min: 8 }),

], 

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let user = await Users.findOne({email: req.body.email});
  if(user){
    return res.status(400).send({error: "Email id already exit's!! use a valid email id"});
  }

  user = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  })
  res.json(req.json(Users))
  
  // .then(Users=> res.json(Users))
  // .catch(err=>{
  // res.json({error: "Email id already exit's!! use a valid email id", message:err.message})
  // });
  })

module.exports = router