const User = require("../models").User;
const Project = require("../models").Project;


const getAllUsers = async (req, res)=> {

    try {

        const users = await User.find();

        res.json({users});

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

const addProject = async (req, res)=>{

    const userId = req.params.id;

    const project = new Project({
        title:req.body.title,
        imageUrl:req.body.imageUrl,
        description:req.body.description        
    })

    try {

        Project.create(project)
        .then(async (newProject)=>{

            const result = await User.findByIdAndUpdate(
                userId,
                { $push: { projects:newProject._id }},
                {
                    new:true
                }
            );

            return res.status(201).json(result);
        })
        .catch((error)=>{
            return res.status(400).send({message:error.message});
        })

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

module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    deleteUser,
    addProject
}