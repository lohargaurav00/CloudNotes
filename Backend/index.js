const connectTOMongo = require("./db");
const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000


app.use(cors())
connectTOMongo();

app.get('/',(req,res)=>{
    res.send("hii Gaurav")
})

app.use(express.json())

app.use("/api/auth/createUser",require('./routes/Auth_createUser'));
app.use("/api/auth/loginUser",require('./routes/Auth_loginUser'));
app.use("/api/auth/getUser",require('./routes/Auth_getUser'));
app.use("/api/note",require('./routes/Note'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})