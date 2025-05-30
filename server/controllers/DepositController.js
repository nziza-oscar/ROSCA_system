


const Deposit = require("../models/deposits")

const Withdrawal = require('../models/Withdrawal');
const {uploadToCloudinary,deleteFromCloudinary} = require("./cloudinaryService")
const mongoose = require("mongoose")

const User = require("../models/User")
exports.createDeposit = async (req, res) => {
  try {
    const {amount,date} = req.body
    if(!req.file) return res.json({message: "No proof were given"})
    if(!req.userId) return res.status(403).json({message: "Unauthorized action"})
    const fileBuffer = req.file.buffer
    const result = await uploadToCloudinary(fileBuffer)
    
    let deposit = new Deposit({amount: amount,depositedAt:date, proof:{url: result.secure_url, public_id: result.public_id}});
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
     const {startDate,endDate,all} = req.query
      

    if (req.userRole !== 'admin') {
      filter.depositedBy = req.userId;
    }
   if(startDate != "undefined" && endDate!="undefined"){
     const start = new Date(startDate);
     const end = new Date(endDate);
     end.setHours(23, 59, 59, 999); 
     filter.depositedAt= {
          $gte: start,
          $lte: end
        }
  
   }


    const userId = req.userId;
    const condition = userId&& req.userRole=="user" ? {depositedBy: new mongoose.Types.ObjectId(userId) } : {}
    const result = await Deposit.aggregate([
      { $match: filter },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          approvedAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "approved"] }, "$amount", 0]
            }
          },
          rejectedAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "rejected"] }, "$amount", 0]
            }
          },
        }
      }
    ]);

    const stats = result[0] || { totalAmount: 0, approvedAmount: 0, rejectedAmount:0 };


    const deposits = await Deposit.find(filter).populate("depositedBy confirmedBy");
    res.json({deposits, stats});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getDepositById = async (req, res, next) => {
  try {
    const deposit = await Deposit.findById(req.params.id).populate("depositedBy confirmedBy");
    if (!deposit) return res.status(404).json({ message: "Not found maybe it have been deleted" });
    req.deposit = deposit
    next()
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getDeposit = async (req, res) => {
 return res.json(req.deposit)
};

exports.updateDeposit = async (req, res) => {
  try {
    const updated = await Deposit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};


exports.approveDeposit = async (req, res) => {

  try {
    if(req.userRole !== "admin") return res.status(403).json({message: "Authorized action"})
    const updated = await Deposit.findByIdAndUpdate(req.params.id, {status: "approved"}, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
   return res.json(updated);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

exports.rejectDeposit = async (req, res) => {

  try {
    if(req.userRole !== "admin") return res.status(403).json({message: "Authorized action"})
    const updated = await Deposit.findByIdAndUpdate(req.params.id, {status: "rejected",comment: req.body.comment}, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    return res.json(updated);
  } catch (err) {
   return res.status(400).json({ error: err.message });
  }
};


exports.deleteDeposit = async (req, res) => {
  try {
    // if(req.userRole !== "admin") return res.status(403).json({message: "Request admin for removal"})
    const findDeposit = await Deposit.findById(req.params.id)
    if(!findDeposit) return res.status(404).json({message: "Deposit not found"})
    const result = await deleteFromCloudinary(findDeposit.proof.public_id)
    const deleted = await Deposit.findByIdAndDelete(req.params.id);
    
    if (!deleted) return res.status(404).json({ message: "Not found" });
    
   return  res.json({ message: "Deleted successfully",id:req.params.id, result });
  } catch (err) {
   return res.status(500).json({ error: err.message });
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


exports.getUserDepositStats = async (req, res) => {
  try {
    const userId = req.userId; // or req.user._id if from auth
    const condition = userId ? {depositedBy: new mongoose.Types.ObjectId(userId) } : {}
    const result = await Deposit.aggregate([
      { $match: condition },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" },
          approvedAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "approved"] }, "$amount", 0]
            }
          },
          rejectedAmount: {
            $sum: {
              $cond: [{ $eq: ["$status", "rejected"] }, "$amount", 0]
            }
          },
        }
      }
    ]);

    const stats = result[0] || { totalAmount: 0, approvedAmount: 0, rejectedAmount:0 };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



const getSkippedDays = async (userId, year, month) => {
  // Step 1: Calculate start and end dates for the month
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999); // last day of month

  // Step 2: Fetch deposits
  const deposits = await Deposit.find({
    depositedBy: userId,
    depositedAt: {
      $gte: start,
      $lte: end
    }
  });

  // Step 3: Create full list of dates in the month
  const totalDays = new Date(year, month, 0).getDate(); // days in month
  const allDates = [];
  for (let day = 1; day <= totalDays; day++) {
    const d = new Date(year, month - 1, day);
    allDates.push(d.toISOString().split('T')[0]);
  }

  // Step 4: Get unique deposit dates
  const depositedDates = [...new Set(deposits.map(d =>
    new Date(d.depositedAt).toISOString().split('T')[0]
  ))];

  // Step 5: Find missing dates
  const skippedDates = allDates.filter(date => !depositedDates.includes(date));

  return skippedDates;
};



// const getSkippedDaysEvents = async (userId, year, month) => {
//   const DAILY_AMOUNT = 2000;

//   const start = new Date(year, month - 1, 1);
//   const end = new Date(year, month, 0, 23, 59, 59, 999);

//   const deposits = await Deposit.find({
//     depositedBy: userId,
//     depositedAt: { $gte: start, $lte: end }
//   });

//   const totalDays = new Date(year, month, 0).getDate();
//   const allDates = [];
//   for (let day = 1; day <= totalDays; day++) {
//     const d = new Date(year, month - 1, day);
//     allDates.push(d.toISOString().split('T')[0]);
//   }

//   const depositedDates = [...new Set(deposits.map(d =>
//     new Date(d.depositedAt).toISOString().split('T')[0]
//   ))];

//   const skippedDates = allDates.filter(date => !depositedDates.includes(date));

//   return skippedDates.map((date,index) => ({
//     id: index+1,
//     title: `have debt - ${DAILY_AMOUNT} FRW`,
//     start: date,
//     color: '#ff0000'
//   }));
// };


const getSkippedDaysEvents = async (userId, year, month,DAILY_AMOUNT) => {


  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);

  const deposits = await Deposit.find({
    depositedBy: userId,
    depositedAt: { $gte: start, $lte: end }
  });

  const totalDays = new Date(year, month, 0).getDate();
  const events = [];

  for (let day = 1; day <= totalDays; day++) {
    const currentDate = new Date(year, month - 1, day);
    const dateStr = currentDate.toISOString().split('T')[0];
     
    const depositForDay = deposits.find(d =>
      new Date(d.depositedAt).toISOString().split('T')[0] === dateStr
    );

    if (depositForDay && depositForDay.status === 'approved') {
      events.push({
        id: `paid-${day}`,
        title: `Paid - ${DAILY_AMOUNT} FRW`,
        start: dateStr,
        color: '#007a55'
      });
    } 
    else if(depositForDay && depositForDay.status === 'pending'){
        events.push({
        id: `pending-${day}`,
        title: `Pending - ${DAILY_AMOUNT} FRW`,
        start: dateStr,
        color: '#00d492'
      });
    }
    else {
      events.push({
        id: `unpaid-${day}`,
        title: `Unpaid - ${DAILY_AMOUNT} FRW`,
        start: dateStr,
        color: '#ec003f'
      });
    }
  }

  return events;
};


exports.skippedDays = async(req,res)=>{
  try {
     const {year, month} = req.params
     const user = await User.findById(req.userId)
     const DAILY_AMOUNT = user.position * 1000
    
     const data = await getSkippedDaysEvents(req.userId, year,month,DAILY_AMOUNT)
     return res.json(data)
  } catch (error) {
    return res.status(404).json({message: error.message})
  }
}



const getMonthlyApprovedSums = async (year, month) => {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);

  const result = await Deposit.aggregate([
    {
      $match: {
        status: "approved",
        depositedAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: "$depositedBy",
        totalAmount: { $sum: "$amount" },
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "user"
      }
    },
    {
      $unwind: "$user"
    },
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        name: "$user.name", 
        email: "$user.email", 
        phone: "$user.phone", 
        idno: "$user.idno", 
        totalAmount: 1,
        count: 1
      }
    }
  ]);

  return result;
};


exports.monthlySavings = async(req,res)=>{
  try {
    const{year,month} = req.query
    const sums = await getMonthlyApprovedSums(year,month)
    return res.json(sums)
    
  } catch (error) {
    return res.status(405).json({message: error.message})
  }
}


exports.depositRequests = async (req, res) => {
  try {
    const { start:startDate, end:endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: "Start date and end date are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // Include the whole end day

    const deposits = await Deposit.find({
      status: 'pending',
      depositedAt: {
        $gte: start,
        $lte: end
      }
    }).populate('depositedBy', 'name email phone idno').exec(); // Optional: populate user info

    res.json(deposits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


