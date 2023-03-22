const jwt = require('jsonwebtoken');
const { User } = require("../../models");

module.exports = ()=>{

    return async (req, res, next)=>{    
        try {

            if (
                req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer') &&
                req.headers.authorization.split(' ')[1]
            ) {
                const token = req.headers.authorization.split(' ')[1];
        
                const decoded = jwt.verify(token, process.env.PERSONAL_SECRET);
        
                //const user = await User.findOne({where:{id:decoded.id}});
                const user = await User.findById(decoded.id);
//                if (user.status !== 'ACTIVE')
                    if (user) {
                        res.currentUser = {
                            id:user.id,
                            profiles:user.profiles
                        }
                    }
            }    

        } catch(error) {
            console.log(error)
        }
        next()
    }
}