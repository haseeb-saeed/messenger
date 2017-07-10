'use strict';

const router = require('express').Router({mergeParams: true});
const messages = require('../controllers/messages');
const verifyToken = require('../middleware/verifyToken');

router.param('messageId', messages.getMessageById);

router.get('/', messages.list);
router.post('/', messages.create);
router.get('/:messageId', messages.read);

module.exports = router;