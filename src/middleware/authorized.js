module.exports = (permissions)=>{

    return (req, res, next)=>{

        let authorized = false;

        permissions.forEach(permission => {
            if (res.currentUser.permissions.some(e => e === permission)) {
                authorized = true;
            }
        });        
        
        if (!authorized)
            return res.status(403).json({message:'Forbidden'})
        next()
    }   
}