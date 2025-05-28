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
const multer = require("multer")
const Upload = multer({ storage: multer.memoryStorage() });

const isAdmin = (req,res,next)=>{
  if(req.userRole != "admin") return res.status(404).json({message: "Unauthorized Actions"}) 
    next()
}
// User routes
router.post('/', isAuthorized, isAdmin, Upload.single("proof"), createWithdrawal);
// router.get('/my', getUserWithdrawals);
router.get('/all',isAuthorized, getAllUserBalances);
// Admin routes
router.get('/list', getAllWithdrawals);
// router.put('/:id', updateWithdrawalStatus);
// router.delete('/:id', deleteWithdrawal);

module.exports = router;