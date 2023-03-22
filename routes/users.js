const { Router } = require('express');
const controller = require('../controllers').users;
const hasPermission = require('../src/middleware/authorized')

const router = Router();

// RBAC - Role Based Access Control

// 'user.CREATE'
// 'user.RETRIEVE'
// 'user.UPDATE'
// 'user.DELETE'

router.get('/',     hasPermission(['permission.ALL', 'user.RETRIEVE']), controller.getAllUsers);
router.post('/',    hasPermission(['permission.ALL', 'user.CREATE']), controller.createUser);
router.get('/:id', controller.getUserById);
router.delete('/:id', controller.deleteUser);

router.post('/:id/projects',  hasPermission(['permission.ALL']), controller.addProject);
router.get('/:id/projects', controller.getUserProjects);

router.put('/:id', controller.updateUser);
// router.get('/', (req, res)=>{
//     console.log('/api/users/')
//     res.send('/api/users/')
// });


module.exports = router;