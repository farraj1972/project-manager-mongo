const { Router } = require('express');
const controller = require('../controllers').projects;

const router = Router();

router.get('/', controller.getAllProjects);

module.exports = router;