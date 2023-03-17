const rbac=require('../rbac')

module.exports = ()=>{

    return (req, res, next)=>{  

        if (res.currentUser) {

            let permissions = []

            res.currentUser.profiles.forEach(profile => {
                rbac.permissions[profile].forEach(permission =>{
                    permissions[permission] = true;
                })
            });

//            ['project.CREATE', 'task.CREATE', 'user.CREATE']
            res.currentUser.permissions = Object.keys(permissions);
        }
        next()
    }
}