require('dotenv').config()
const cors = require('cors');

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

    app.use(cors({
        origin: '*'
    }));
    app.use(express.json())
    app.use(currentUser())
    app.use(permissions())

    // app.get('^/teste/:param(xpto[0-9]{2})', (req, res)=>{
    //     res.send(req.params.param)
    // })

    // app.get(/^/, (req, res)=>{
    //     res.send(req.params.param)
    // })    

    app.use('/api', require('./routes'));    

    app.listen(5000, ()=>{
        console.log('Server started')
    })
})
.catch((err)=>{
    console.log(err)
})