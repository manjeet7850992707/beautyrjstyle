const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Rjmodal = require('./modal/Formmodal'); // Ensure this is the correct path to your schema

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/Rjstyle', {
   
}).then(() => {
    console.log("Successfully connected to the database");
}).catch((error) => {
    console.log(`Error in database connection: ${error}`);
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle sending emails
app.post('/send', async (req, res) => {
    const { name, email, message, number } = req.body; // Include the number field

    try {
        // Save form data to the database
        const record = new Rjmodal({
            name,
            email,
            message,
            number
        });

        await record.save(); // Await for the database save to complete

        // Create the Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'manjeetkatariya2000@gmail.com', // Your email
                pass: 'miwx irzm bywu mllz' // Your email password
            }
        });

        // Define the email options
        const mailOptions = {
            from: email,
            to: 'manjeetkatariya2000@gmail.com',
            subject: `New message from ${name}`,
            text: `Message: ${message}\n\nPhone Number: ${number}` // Include the phone number in the email body
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success if both operations complete
        res.status(200).send({
            message: 'Form submitted and email sent successfully',
            status: 200
        });

    } catch (error) {
        // Handle errors
        console.error('Error processing request:', error);
        res.status(500).send({
            message: 'Error processing request: ' + error.message,
            status: 500
        });
    }
});
app.get('/Find', async (req, res) => {
    try {
        // Fetch records from the MongoDB collection
        const records = await Rjmodal.find();
        
        // Send the response with fetched data
        res.send({
            data: records,
            message: 'Records fetched successfully'
        });
    } catch (error) {
        // Handle any errors
        console.error('Error fetching records:', error);
        res.status(500).send({
            data: null,
            message: 'Error fetching records'
        });
    }
});
app.get('/filterByDate', async (req, res) => {
    const { startDate, endDate } = req.query; // Get the start and end date from query parameters

    try {
        // Parse the dates from query parameters
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Ensure that the dates are valid
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).send({
                message: 'Invalid date format',
                status: 400
            });
        }

        // Fetch records within the date range
        const records = await Rjmodal.find({
            createdAt: { $gte: start, $lte: end }
        });

        // Send the response with fetched data
        res.send({
            data: records,
            message: 'Records fetched successfully'
        });
    } catch (error) {
        // Handle any errors
        console.error('Error fetching records:', error);
        res.status(500).send({
            data: null,
            message: 'Error fetching records'
        });
    }
});

// Route to handle login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Fixed credentials
    const fixedEmail = 'manjeetkatariya2000@gmail.com';
    const fixedPassword = '7850992707';

    // Validate credentials
    if (email === fixedEmail && password === fixedPassword) {
        res.status(200).send({
            message: 'Login successful',
            status: 200
        });
    } else {
        res.status(401).send({
            message: 'Invalid email or password',
            status: 401
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
