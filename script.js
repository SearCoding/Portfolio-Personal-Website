const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));  // assumes your contact.html is in /public

app.post('/send', async (req, res) => {
    const { fullName, email, phone, subject, message } = req.body;

    // Check if any field is missing
    if (!fullName || !email || !phone || !subject || !message) {
        // Redirect back to contact page with error status
        return res.redirect('/contact.html?status=missing');
    }

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
        // Redirect back to contact page with success status
        res.redirect('/contact.html?status=success');
    } catch (error) {
        console.error(error);
        // Redirect back to contact page with error status
        res.redirect('/contact.html?status=error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
