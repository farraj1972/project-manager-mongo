
const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const router = Router();

// Authorization Methods
router.post('/register', async (req, res)=>{

    try {    


        const user = await User.findOne({email:{$eq:req.body.email}});
            //{where:{email:req.body.email}} 

        if (user) {
            return res.status(409).send('Email already in use!');
        }

        const hash = bcrypt.hashSync(req.body.password, 10);

        if (hash) {
            const newUser = await User.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                email:req.body.email,
                password:hash
            });
            return res.status(201).json({newUser});
        }

        throw new Error('Server error');

    } catch (error) {
        return res.status(500).send(error.message);
    }
})

// const registerUser =  async (req, res)=>{

//     try {    


//         const user = await User.findOne({email:{$eq:req.body.email}});
//             //{where:{email:req.body.email}} 

//         if (user) {
//             return res.status(409).send('Email already in use!');
//         }

//         const hash = bcrypt.hashSync(req.body.password, 10);

//         if (hash) {
//             const newUser = await User.create({
//                 firstName:req.body.firstName,
//                 lastName:req.body.lastName,
//                 email:req.body.email,
//                 password:hash
//             });
//             return res.status(201).json({newUser});
//         }

//         throw new Error('Server error');

//     } catch (error) {
//         return res.status(500).send(error.message);
//     }
// }

router.post('/login', async (req, res)=>{
//const userLogin = async (req, res)=>{

    try {
        const user = await User.findOne({email:{$eq:req.body.email}});
        //const user = await User.findOne({where:{email:req.body.email}}); 

        if (user) {
            //console.log(req.body.password, user.password )
            if (bcrypt.compareSync(req.body.password, user.password)) {

                const token = jwt.sign({
                    id:user.id
                    }, process.env.PERSONAL_SECRET,
                    {expiresIn:'3h'} 
                );
                return res.status(200).json({
                    userid:user.id,
                    token:token
                });

            } 
            // else {
            //     return res.status(401).send('Unknown email or invalid password');
            // }
        }
        return res.status(401).send('Unknown email or invalid password');
    
    } catch (error) {
        return res.status(500).send(`msg: ${error.message}`);
    }
})

module.exports = router;