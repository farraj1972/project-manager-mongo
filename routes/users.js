const { Router } = require('express');
const controller = require('../controllers').users;

const router = Router();

router.get('/', controller.getAllUsers);
router.post('/', controller.createUser);
router.get('/:id', controller.getUserById);
router.delete('/:id', controller.deleteUser);

router.post('/:id/projects', controller.addProject);
//router.get('/:id/projects', controller.getUserProjects);

// router.get('/', (req, res)=>{
//     console.log('/api/users/')
//     res.send('/api/users/')
// });


module.exports = router;