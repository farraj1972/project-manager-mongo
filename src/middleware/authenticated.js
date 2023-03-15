module.exports = ()=>{
    return (req, res, next)=>{
        if (!res.currentUser) {
            return res.status(401).json({message:'Unauthorized'})
        }
        next()
    }
}