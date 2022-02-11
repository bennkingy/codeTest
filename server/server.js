const data = require('./data/response.json')

const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json(data)
})

app.listen(5000, () => {console.log("Server started on port 5000", data)})