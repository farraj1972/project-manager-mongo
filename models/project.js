const mongoose = require('mongoose')
const Task = require('./task');

const projectSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true    
    },
    imageUrl:{
        type:String,
        required:true    
    },
    description:{
        type:String,
        required:true    
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"     
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Task"     
    }],
    activityLog: [
        {
            description: {
                type: String,
            },
            timestamp: {
                type: Date,
                default:Date.now
            },
        },
    ]
    // ,
    // tasks:[Task.schema]

})

module.exports = mongoose.model('Project', projectSchema);
