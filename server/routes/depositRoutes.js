const express = require('express');
const router = express.Router();
const {isAuthorized} = require("../middleware/Authorized")
const depositController = require("../controllers/DepositController");
const multer = require("multer")
const Upload = multer({ storage: multer.memoryStorage() });

router.post("/", isAuthorized,Upload.single("proof"),depositController.createDeposit);
router.get("/", isAuthorized,depositController.getAllDeposits);
router.get("/:id/get",isAuthorized, depositController.getDeposit);
router.put("/:id/update", isAuthorized,depositController.updateDeposit);
router.delete("/:id/delete", isAuthorized,depositController.deleteDeposit);
router.get("/chart-data", isAuthorized,depositController.getDepositChartData);
router.post("/:id/approve", isAuthorized,depositController.approveDeposit);
router.post("/:id/reject", isAuthorized,depositController.rejectDeposit);
router.get("/stats", isAuthorized, depositController.getUserDepositStats)
router.get("/calendar-skipped/:year/:month", isAuthorized, depositController.skippedDays)
router.get('/monthly-approved-sum', depositController.monthlySavings);
router.get('/requests', depositController.monthlySavings);

router.param("id",depositController.getDepositById)
module.exports = router;
