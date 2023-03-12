const jwt = require("jsonwebtoken");
const jwtSecret = "Check_Auth_Gaurav";

//get the user from jwt token and add id to req object
const fetchUser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

  try {
    const data = jwt.verify(token, jwtSecret);
    req.user = data.User;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }

};

module.exports = fetchUser;
