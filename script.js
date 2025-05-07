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

    // Check for missing fields
    if (!fullName || !email || !phone || !subject || !message) {
        return res.send(`
            <script>
                alert('Please fill in all fields!');
                window.history.back();
            </script>
        `);
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
        res.send(`
            <script>
                alert('Email sent successfully!');
                window.location.href = '/'; // or redirect to another page
            </script>
        `);
    } catch (error) {
        console.error(error);
        res.send(`
            <script>
                alert('Failed to send email. Please try again later.');
                window.history.back();
            </script>
        `);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});
