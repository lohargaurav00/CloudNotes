const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const jwtSecret = "Check_Auth_Gaurav";

// Authenticate a user using: Post "api/auth/loginUser login required"
router.post(
    "/",
    [
      body("email", "Enter a valid email address").isEmail(),
      body("password", "Password can,t be blank").exists(),
    ],
  
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
  
      try {
        let user = await Users.findOne({email});
        if (!user) {
          return res
            .status(400)
            .send({ error: "Please try to login with correct credentials" });
        }
  
        const passCompare =  await bcrypt.compare(password, user.password);
        if (!passCompare) {
          return res
            .status(400)
            .send({ error: "Please try to login with correct credentials" });
        }
  
        const data = {
          User: {
            id: user.id,
          },
        };
  
        const jwtToken = jwt.sign(data, jwtSecret);
        res.json({"authToken":jwtToken});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
      }
    }
  );
  
  module.exports = router;