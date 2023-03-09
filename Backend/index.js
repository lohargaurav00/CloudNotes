const connectTOMongo = require("./db");
const express = require('express')
const app = express()
const port = 5000
connectTOMongo();

app.get('/',(req,res)=>{
    res.send("hii Gaurav")
})

app.use(express.json())

app.use("/api/auth",require('./routes/Auth'));
app.use("/api/note",require('./routes/Note'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})