const { Router } = require('express');
const controller = require('../controllers').projects;
const hasPermission = require('../src/middleware/authorized')

const router = Router();

router.get('/',   hasPermission(['project.RETRIEVE']),  controller.getAllProjects);
router.post('/',  hasPermission(['project.CREATE']),    controller.createProject);
router.post('/:id/tasks', controller.addTask);


//POST /api/projects

module.exports = router;