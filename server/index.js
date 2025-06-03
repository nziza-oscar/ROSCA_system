const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const depositRoutes = require("./routes/depositRoutes")
const withdrawalRoutes = require("./routes/withdrawalRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
app.use("/home",(req,res)=>{
  return res.json({message: "welcome to ishema API's platform"})
})
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/deposit", depositRoutes)
app.use("/api/withdrawals", withdrawalRoutes)
app.use("/api/notification", notificationRoutes)
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

app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Internal Server Error' });
});

// Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
