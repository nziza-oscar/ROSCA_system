const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { isAuthorized } = require('../middleware/Authorized');

router.get('/', isAuthorized, notificationController.getUserNotifications);
router.get('/unread-count',isAuthorized, notificationController.getUnreadCount);
router.patch('/:notificationId/read', notificationController.markAsRead);
router.patch('/read-all', notificationController.markAllAsRead);

module.exports = router;
