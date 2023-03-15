const { Router } = require('express');
const isAuthenticated = require('../src/middleware/authenticated')()
const router = Router();

router.use('/users',    isAuthenticated,    require('./users'));
router.use('/projects', isAuthenticated,    require('./projects'));

router.use('/auth',                         require('../src/security'));

module.exports = router;
