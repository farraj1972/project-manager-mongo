const { Task } = require("../models");

const Project = require("../models").Project;
var ObjectId = require('mongoose').Types.ObjectId;

const getAllProjects = async (req, res)=> {

    try {

        const projects = await Project.find({owner:res.currentUser.id});

        res.json({projects});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const createProject = async (req, res)=>{

    try {

        const newProject = new Project({
            title:req.body.title,
            imageUrl:req.body.imageUrl,
            description:req.body.description,
            activityLog:[{
                
            }]        
        })
    
        newProject.owner = res.currentUser.id;
        
        const project = await newProject.save();
    
        return res.status(201).json({project});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const addTask = async (req, res)=> {

    try {

        const newTask = new Task({
            name:req.body.name,
            description:req.body.description  
        })
        
        const task = await newTask.save();

        const project = await Project.findByIdAndUpdate(
            new ObjectId(req.params.id),
            { $push:{tasks:task._id}},
            {new:true}
        ); 

        if (!project) {
            return res.status(404).json({message:'Project not found'});            
        }
        
        return res.status(201).json({project:project.tasks})

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
} 

module.exports = {
    getAllProjects,
    addTask,
    createProject    
}