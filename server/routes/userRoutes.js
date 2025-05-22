const express = require('express');
const { registerUser, updateUserInfo,addUserAddress,
    updateUserAddress,deleteAddress } = require('../controllers/userController');
const router = express.Router();
const {isAuthorized} = require("../middleware/Authorized")

router.post('/register', registerUser);
router.put("/update", isAuthorized, updateUserInfo)
router.post("/address", isAuthorized, addUserAddress)
router.put("/address/:id/update", isAuthorized, updateUserAddress)
router.delete("/address/:id/remove", isAuthorized, deleteAddress)

module.exports = router;
