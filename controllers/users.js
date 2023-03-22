const User = require("../models").User;
const Project = require("../models").Project;
var ObjectId = require('mongoose').Types.ObjectId;

const getAllUsers = async (req, res)=> {

    const {page = 1, limit= 10} = req.query; 
    
    try {

        const users = await User.find().select({password:0}).
        limit(limit * 1).
        skip((page - 1) * limit).
        exec();

        const count = await User.count();

        return res.json({
            users,
            totalPages: Math.ceil(count/limit),
            currentPage:page
        });

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const createUser = async (req, res)=> {

    const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    });

    try {
        const newUser = await user.save();
    
        res.status(201).json({newUser});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const getUserById = async (req, res)=> {

    try {

        const user = await User.findById(req.params.id);

        if (user) {
            return res.status(200).json({user});
        }

        return res.status(404).json({message:'Cannot find user'})

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const deleteUser = async (req, res)=> {

    try {

        user = await User.findById(req.params.id);
        
        if (user) {

            user.deleteOne();
            
            return res.json({message:'Deleted'});
        }

        return res.status(404).json({message:'Cannot find user'})        
        //await User.deleteOne({req.params.id);
        // const users = await User.find();
        // res.json({users});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const updateUser = async (req, res)=> {

    try {

        let user = await User.findById(req.params.id);
        
        if (user) {
            
            if (req.body.firstName)
                user.firstName = req.body.firstName
            if (req.body.lastName)
                user.lastName = req.body.lastName
            if (req.body.status)
                user.status = req.body.status
            if (req.body.profiles)
                user.profiles = req.body.profiles

            user.save()
            
            return res.json({message:'User updated'});
        }

        return res.status(404).json({message:'Cannot find user'})        
        //await User.deleteOne({req.params.id);
        // const users = await User.find();
        // res.json({users});

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

const addProject = async (req, res)=>{

    try {

        const userId = req.params.id;

        const newProject = new Project({
            title:req.body.title,
            imageUrl:req.body.imageUrl,
            description:req.body.description        
        })
    
        const user = await User.findById(req.params.id);

        if (user) {

            newProject.owner = user._id;
            
            const project = await newProject.save();
        
            return res.status(201).json({project});
        }

        return res.status(404).json({message:'User not found'})        

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

// async function getUser(req, res, next) {
//     let user
//     try {

//         user = await User.findById(req.params.id);

//         if (!user) {
//             return res.status(404).json({message: 'Cannot find user'})
//         }

//     } catch (err) {
//         return res.status(500).send({message:error.message});
//     }

//     res.user = user;

//     next();
// }

const getUserProjects = async (req, res) => {

    try {

        const projects = await Project.find(
            {owner:{$eq:new ObjectId(req.params.id)}}
        ).populate('owner')

        if (projects) {
            return res.json({projects})
        }
        
        return res.status(404).json({message:'User not found'})

    } catch (error) {
        return res.status(500).send({message:error.message});
    }
}

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    addProject,
    getUserProjects,
    updateUser
}