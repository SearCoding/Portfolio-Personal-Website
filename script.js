//Contact Page Script
// This script handles the form submission for the contact page and sends an email using Nodemailer.
// It uses Express.js to create a server and Nodemailer to send emails through Gmail.

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send', async (req, res) => {
    const { fullName, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'determinationnasir@gmail.com',
            pass: 'srndtwtaxdtqqwga'
        }
    });

    const mailOptions = {
        from: email,
        to: 'determinationnasir@gmail.com',
        subject: `${subject} - from ${fullName}`,
        text: `You received a message from:
Name: ${fullName}
Email: ${email}
Phone: ${phone}
Message: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Email sending failed. Please try again later.' });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
