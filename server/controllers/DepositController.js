const Deposit = require("../models/deposit");

exports.createDeposit = async (req, res) => {
  try {
    let deposit = new Deposit(req.body);
      deposit.depositedBy = req.userId
    const saved = await deposit.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getAllDeposits = async (req, res) => {
  try {
    let filter = {};

    if (req.userRole !== 'admin') {
      filter.depositedBy = req.userId;
    }

    const deposits = await Deposit.find(filter).populate("depositedBy confirmedBy");
    res.json(deposits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDepositById = async (req, res) => {
  try {
    const deposit = await Deposit.findById(req.params.id).populate("depositedBy confirmedBy");
    if (!deposit) return res.status(404).json({ message: "Not found" });
    res.json(deposit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDeposit = async (req, res) => {
  try {
    const updated = await Deposit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteDeposit = async (req, res) => {
  try {
    if(req.userRole !== "admin") return res.status(403).json({message: "Request admin for removal"})
    const deleted = await Deposit.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDepositChartData = async (req, res) => {
  try {
    const matchStage = req.userRole === 'admin' ? {} : { depositedBy: req.userId };

    // return res.json(matchStage)
    const result = await Deposit.aggregate([
      { $match:{} },
      {
        $group: {
          _id: {
            year: { $year: "$depositedAt" },
            month: { $month: "$depositedAt" }
          },
          totalAmount: { $sum: "$amount" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const formatted = result.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
      totalAmount: item.totalAmount,
      count: item.count
    }));

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
