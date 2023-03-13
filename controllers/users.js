const User = require("../models").User;



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

module.exports = {
    getAllUsers,
    createUser
}