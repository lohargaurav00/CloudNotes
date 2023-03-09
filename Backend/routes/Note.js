const express = require('express')
const router = express.Router()



router.get('/', (req, res) => {
    obj = {
        "from":"Note",
        "name": "gaurav",
        "age": "infinity"
    }

    res.send(obj)
  })

module.exports = router