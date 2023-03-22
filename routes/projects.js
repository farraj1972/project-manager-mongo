const { Router } = require('express');
const controller = require('../controllers').projects;
const hasPermission = require('../src/middleware/authorized')

const router = Router();

router.get('/',   hasPermission(['project.RETRIEVE']),  controller.getAllProjects);
router.post('/',  hasPermission(['project.CREATE']),    controller.createProject);
router.post('/:id/tasks', controller.addTask);
//router.post('/:id/activities', controller.addActivityRecord);
//router.get('/:id/activities', controller.getActivityRecords);

//router.patch('/:id', controller.addActivityRecord);

//POST /api/projects

module.exports = router;