'use strict';

const router = require('express').Router();
const users = require('../controllers/users');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', users.register);
router.post('/authenticate', users.authenticate);
router.post('/decode', verifyToken, users.decode);

module.exports = router;