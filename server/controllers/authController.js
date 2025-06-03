const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // For generating reset tokens
const sendEmail = require('../utils/sendEmail'); // Utility for sending emails
const {notify} = require("./notificationController")
// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d', // Token expires in 7 days by default
  });
};

exports.userInfo = async(req,res)=>{
   try {
      const data = await User.findById(req.userId)
  
      return res.json(data)

   } catch (error) {
      return res.status(404).json({error:error.message,messae:"User not found"})
   }
}
// fetch users
exports.fetchUsers = async(req,res)=>{
  try {
    if(req.userRole != "admin") return res.json([])
     const data = await User.find().populate("deposits").exec()
     return res.status(200).json(data)
  } catch (error) {
     return res.status(404).json({error:error.messae,message: "Failed to fetch users"})
  }
}

exports.systemUsers = async(req,res)=>{
  try {
    if(req.userRole != "admin") return res.json([])
     const data = await User.find().countDocuments()
     return res.status(200).json({systemUsers: data})
  } catch (error) {
     return res.status(404).json({error:error.messae,message: "Failed to fetch users"})
  }
}



exports.createUser = async(req,res)=>{
  try {
    const { name,email,phone,role,password,idno } = req.body
     const userExist = await User.findOne({email: email})

    if(req.userRole !== "admin") return res.status(403).json({message: "Unauthorized action"})
    if(userExist) return res.status(403).json({message: "User already exist"})
     const newUser = new User({name,email,phone,role,password,idno})
     await newUser.save()
     
     return res.json(newUser)
  } catch (error) {
    return res.status(400).json({message: error.message})
  }
}



exports.register = async (req, res) => {
  try {
    const { names: name, email, password, phone, role, idno, position } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({ name, email, password, phone, position, idno, role });

    // Get all admins
    const admins = await User.find({ role: 'admin' });
    const adminIds = admins.map((admin) => admin._id);

    // Notify all admins
    await notify({
      from: user._id,
      to: adminIds,
      not_type: 'new_account',
      description: `${user.name} has created a new account.`,
    });

    const token = generateToken({ _id: user._id, role: user.role, name: user.name, email: user.email });

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken({_id:user._id,role:user.role});

    // Send response with token
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token expires in 10 minutes

    await user.save();

    // Send email with reset token
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/auth/reset-password/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) has requested to reset your password. Please make a PUT request to: \n\n ${resetUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Token',
      message,
    });

    res.status(200).json({ success: true, message: 'Email sent' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Reset password
// @route   PUT /api/auth/reset-password/:resetToken
// @access  Public
exports.resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { password } = req.body;

    // Hash the reset token to compare with the one in the database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Find user by reset token and check expiration
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Check if token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update password and clear reset token fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
