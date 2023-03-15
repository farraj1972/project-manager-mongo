const Project = require("../models").Project;


const getAllProjects = async (req, res)=> {

    try {

        const projects = await Project.find();

        res.json({projects});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const addTask = async (req, res)=> {

    try {

        const projects = await Project.find();

        res.json({projects});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
} 

module.exports = {
    getAllProjects,
    addTask
}