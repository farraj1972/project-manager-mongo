const { Router } = require('express');
const controller = require('../controllers').tasks;

const router = Router();

router.get('/', controller.getAllTasks);