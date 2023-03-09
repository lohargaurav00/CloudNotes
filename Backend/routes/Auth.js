const express = require("express");
const Users = require("../models/Users");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');

router.get(
  "/",
  [
    body("email", "Enter a valid email address").isEmail(),
    body("password", "Enter a valid Password").isLength({ min: 8 }),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .send({ error: "Email id already exit's!! use a valid email id" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password,salt);

      user = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Some error occurred");
    }
  }
);

module.exports = router;
