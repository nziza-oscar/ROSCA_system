const express = require('express');
const router = express.Router();
const {isAuthorized} = require("../middleware/Authorized")
const depositController = require("../controllers/depositController");

router.post("/", isAuthorized,depositController.createDeposit);
router.get("/", isAuthorized,depositController.getAllDeposits);
router.get("/:id",isAuthorized, depositController.getDepositById);
router.put("/:id/update", isAuthorized,depositController.updateDeposit);
router.delete("/:id", isAuthorized,depositController.deleteDeposit);
router.get("/chart-data", depositController.getDepositChartData);

module.exports = router;
