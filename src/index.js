const express = require('express')
const app = express()
const {PORT} = require('../env')
const routes = require('./routes/routes')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/crud', routes)

app.listen(PORT, () => {
    console.log(`Server is open in :${PORT}`)
})