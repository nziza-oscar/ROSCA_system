const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config();
// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// mongodb://localhost:27017/nihemart
// mongodb+srv://onexengineer1:ghZPAVWqCWlV7OTW@cluster0.qpxeisi.mongodb.net/nihemart
mongoose.connect("mongodb://localhost:27017/ROSCA", {

}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

// Import Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const depositRoutes = require("./routes/depositRoutes")

// Use Routes

app.use("/api/home",(req,res)=>{
  return res.json({message: "welcome to our ROSCA platform"})
})
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/deposit", depositRoutes)
app.use((req,res,next)=>{
   
  return res.status(404).json({message: "404: ROUTE NOT FOUND"})
  
})
app.get('/api/test-email', async (req, res) => {
    try {
      await sendEmail({
        email: 'nzizaoscar25@example.com', // Replace with recipient email
        subject: 'Email Confirmations',
        message: 'This is a test email from your eCommerce app.',
      });
      res.send('Email sent successfully');
    } catch (err) {
      res.status(500).send('Error sending email');
    }
  });

  console.log(process.env.EMAIL_PORT)
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
