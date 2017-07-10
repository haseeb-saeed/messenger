'use strict';

const router = require('express').Router();
const chats = require('../controllers/chats');
const verifyToken = require('../middleware/verifyToken');
const messagesRouter = require('../routes/messages');

router.use(verifyToken);

router.param('chatId', chats.getChatById);

router.get('/', chats.list);
router.post('/', chats.create);
router.get('/:chatId', chats.read);

router.use('/:chatId/messages', messagesRouter);

module.exports = router;