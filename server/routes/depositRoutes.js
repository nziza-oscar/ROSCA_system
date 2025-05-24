const express = require('express');
const router = express.Router();
const {isAuthorized} = require("../middleware/Authorized")
const depositController = require("../controllers/DepositController");

router.post("/", isAuthorized,depositController.createDeposit);
router.get("/", isAuthorized,depositController.getAllDeposits);
router.get("/:id/get",isAuthorized, depositController.getDeposit);
router.put("/:id/update", isAuthorized,depositController.updateDeposit);
router.delete("/:id", isAuthorized,depositController.deleteDeposit);
router.get("/chart-data", isAuthorized,depositController.getDepositChartData);
router.post("/:id/approve", isAuthorized,depositController.approveDeposit);
router.post("/:id/reject", isAuthorized,depositController.rejectDeposit);

router.param("id",depositController.getDepositById)
module.exports = router;
