const nodemailer = require('nodemailer');

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // SMTP server host (e.g., smtp.gmail.com)
  port: process.env.EMAIL_PORT, // SMTP port (e.g., 465 for SSL)
  secure: false, // Use SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password or app-specific password
  },
});

// Function to send an email
const sendEmail = async ({ email, subject, message }) => {
  try {
    // Define email options
    const mailOptions = {
      from: `"Your Ecommerce App" <${process.env.EMAIL_USERNAME}>`, // Sender address
      to: "santosjuniorsoftwareengineer1@gmail.com", // Recipient address
      subject: subject, // Email subject
      text: message, // Plain text body
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Created Successfully</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
  <!-- Main container -->
  <div class="max-w-2xl mx-auto my-10 bg-white rounded-lg shadow-lg overflow-hidden">
    <!-- Header -->
    <div class="bg-blue-600 text-white text-center py-8">
      <h1 class="text-3xl font-bold">Welcome to Our Ecommerce App!</h1>
      <p class="mt-2 text-lg">Your account has been successfully created.</p>
    </div>

    <!-- Body -->
    <div class="px-8 py-10">
      <p class="text-gray-700 text-lg mb-6">
        Hello <span class="font-semibold">[User's Name]</span>,
      </p>
      <p class="text-gray-700 text-lg mb-6">
        Thank you for signing up with us! To complete your registration, please confirm your email address by clicking the button below:
      </p>

      <!-- Confirmation Button -->
      <div class="text-center">
        <a
          href="#"
          class="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Confirm Your Email
        </a>
      </div>

      <p class="text-gray-700 text-lg mt-8">
        If you did not create an account, please ignore this email or contact our support team.
      </p>
    </div>

    <!-- Footer -->
    <div class="bg-gray-100 text-center py-6">
      <p class="text-gray-600 text-sm">
        &copy; 2023 Your Ecommerce App. All rights reserved.
      </p>
      <p class="text-gray-600 text-sm mt-2">
        <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a> | 
        <a href="#" class="text-blue-600 hover:underline">Terms of Service</a>
      </p>
    </div>
  </div>
</body>
</html>`, // HTML body (optional)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err.message);
    throw new Error('Email could not be sent');
  }
};

module.exports = sendEmail;