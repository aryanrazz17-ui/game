// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const emailjs = require('@emailjs/nodejs');

const nodemailer = require('nodemailer');

exports.sendMsg = async (to, subject, html) => {
    try {
        // Check if SMTP credentials are provided
        if (process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD) {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SMTP_EMAIL,
                    pass: process.env.SMTP_PASSWORD
                }
            });

            const mailOptions = {
                from: process.env.SMTP_EMAIL,
                to: to,
                subject: subject,
                html: html
            };

            await transporter.sendMail(mailOptions);
            console.log('Email sent via Gmail SMTP to:', to);
            return { status: true };
        }

        // Fallback to existing logic (SendGrid/EmailJS) if SMTP is not configured
        // const msg = {
        //     to: to,
        //     from: 'no-reply@playzelo.com',
        //     subject: subject,
        //     html: html
        // };
        // const response = await sgMail.send(msg);
        const msg = {
            message: html,
            to_email: to,
        }

        emailjs
            .send('service_e11codc', 'template_c0sj1nw', msg, {
                publicKey: 'rYBKywq0hlACo5yYV',
                privateKey: 'Y8JotNhzfmM-QWMn7dLWS',
            })
            .then(
                function (response) {
                    console.log('SUCCESS!', response.status, response.text);
                },
                function (err) {
                    console.log('FAILED...', err);
                },
            );

        console.log('Email Successfully Sent via fallback!');
        return { status: true };
    }
    catch (err) {
        console.error({ title: 'emailHelper => sendMsg', message: err.message });
        return { status: false };
    }
};

exports.authenticationEmail = (code) => {
    return `${code}`;
}