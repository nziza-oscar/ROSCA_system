const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const validator = require('validator'); // For email validation


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true, // Remove extra spaces
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },

  position:{
    type:Number,
    default:1
  },
  
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true, // Ensure email is unique
    lowercase: true, // Convert email to lowercase
    trim: true,
    validate: {
      validator: validator.isEmail, // Validate email format
      message: 'Please provide a valid email address',
    },
  },
  idno:{
    type: Number,
    required:[true, "ID is required"],
    unique:true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false, 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  dob:String,
  phone: {
    type: String,
    trim: true,
    required:false,
    validate: {
        validator: function (value) {
        return /^\+?[0-9]{10,15}$/.test(value);
      },
      message: 'Please provide a valid phone number',
    },
  },

  settings: {
    language:String,
    currency: String,

  }, 
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip if password is not modified
  this.password = await bcrypt.hash(this.password, 12); // Hash password with bcrypt
  next();
});

// Compare password for login
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Update `updatedAt` field before saving
UserSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

UserSchema.virtual("deposits", {
  ref: "deposits",
  localField: "_id",
  foreignField: "depositedBy"
});

module.exports = mongoose.model('User', UserSchema);