const nodemailer = require('nodemailer');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    try {
        const data = JSON.parse(event.body);

        // Validate data
        if (!data.type || !data.email || !data.details) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'All fields are required' }),
            };
        }

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Replace with your email provider's SMTP server
            port: 587,
            secure: false, // Use TLS
            auth: {
                user: process.env.SMTP_USER, // Your email address
                pass: process.env.SMTP_PASS, // Your email password or app password
            },
        });

        // Email content
        const mailOptions = {
            from: `"Post Submission" <${process.env.SMTP_USER}>`, // Sender email
            to: 'your-email@example.com', // Replace with your recipient email
            subject: `New Post Submission: ${data.type}`,
            text: `You've received a new post submission:\n\nType: ${data.type}\nEmail: ${data.email}\nDetails: ${data.details}`,
            html: `
                <h1>New Post Submission</h1>
                <p><strong>Type:</strong> ${data.type}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Details:</strong> ${data.details}</p>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post submitted and email sent successfully!' }),
        };
    } catch (error) {
        console.error('Error sending email:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};
