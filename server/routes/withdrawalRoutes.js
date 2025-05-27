const express = require('express');
const router = express.Router();
const {
  createWithdrawal,
  getUserWithdrawals,
  getAllWithdrawals,
  updateWithdrawalStatus,
  deleteWithdrawal,
  getAllUserBalances
} = require('../controllers/WithdrawalController');
const { isAuthorized } = require('../middleware/Authorized');

// User routes
// router.post('/', createWithdrawal);
// router.get('/my', getUserWithdrawals);
router.get('/all',isAuthorized, getAllUserBalances);
// Admin routes
// router.get('/', getAllWithdrawals);
// router.put('/:id', updateWithdrawalStatus);
// router.delete('/:id', deleteWithdrawal);

module.exports = router;