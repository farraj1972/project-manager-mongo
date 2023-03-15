const { Router } = require('express');
const router = Router();

router.use('/users',    require('./users'));
router.use('/projects', require('./projects'));

module.exports = router;
