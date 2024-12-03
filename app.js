// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 8099;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // To parse JSON request body

// Set up Nodemailer transporter
// Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "admin@lastchancemetalscrap.com", // Your email
      pass: "aimy zvud bngd pdti", // Your email password
    },
  });

// API endpoint to handle sending email
app.post('/api/send-email', (req, res) => {
  const { name, email, phone, role, message } = req.body;

  // Setup email options
  const mailOptions = {
    from: email,
    to: "admin@lastchancemetalscrap.com", // Your receiving email
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nRole: ${role}\n\nMessage:\n${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send message' });
    }
    console.log('Email sent: ' + info.response);
    return res.status(200).json({ message: 'Message sent successfully!' });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
