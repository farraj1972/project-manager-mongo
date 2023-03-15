const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
//        required:true,
        default:Date.now
    },
    deadline:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date
    },   
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]     
})

module.exports = mongoose.model('Task', taskSchema);