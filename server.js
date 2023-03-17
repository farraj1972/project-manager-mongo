require('dotenv').config()


const express = require('express')
const app = express()

const mongoose = require('mongoose')
const currentUser = require('./src/middleware/currentuser')
const permissions = require('./src/middleware/permissions')


mongoose.connection.once('open', ()=>{
    console.log('Connected to Database')    
})

mongoose.connect(process.env.DATABASE_URL)
.then((db)=>{

    app.use(express.json())
    app.use(currentUser())
    app.use(permissions())

    app.use('/api', require('./routes'));    

    app.listen(5000, ()=>{
        console.log('Server started')
    })
})
.catch((err)=>{
    console.log(err)
})