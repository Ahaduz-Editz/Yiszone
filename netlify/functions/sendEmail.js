const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
            },
            body: 'Method Not Allowed',
        };
    }

    const data = JSON.parse(event.body);

    // Configure the transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    // Configure the email options
    const mailOptions = {
        from: `"Post Submission" <${process.env.SMTP_USER}>`,
        to: 'yiszoneemail@gmail.com', // Replace with your email
        subject: `New Post Submission: ${data.type}`,
        text: `You've received a new post submission:\n\nType: ${data.type}\nEmail: ${data.email}\nDetails: ${data.details}`,
        html: `
            <h1>New Post Submission</h1>
            <p><strong>Type:</strong> ${data.type}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Details:</strong> ${data.details}</p>
        `,
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Email sent successfully' }),
        };
    } catch (error) {
        console.error('Error sending email:', error);

        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow all origins
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: 'Failed to send email', error: error.message }),
        };
    }
};
console.log('Incoming request:', event.body);

