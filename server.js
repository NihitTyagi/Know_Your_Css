const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000; // Your desired port

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Email route
app.post('/send-feedback', (req, res) => {
  const { name, email, message } = req.body;

  // Nodemailer setup
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'montyspacetyagi@gmail.com',
      pass: '9997870086',
    },
  });

  const mailOptions = {
    from: email,
    to: 'montytyagig@gmail.com',
    subject: `Feedback from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending feedback');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Feedback sent successfully');
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
