const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_MAIL = process.env.SENDGRID_MAIL;

const smtpOptions = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_PORT === '465',
    auth: process.env.SMTP_MAIL && process.env.SMTP_PASSWORD ? {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    } : undefined,
};

let sendgridEnabled = false;
if (SENDGRID_API_KEY && SENDGRID_API_KEY !== 'YOUR_SENDGRID_API_KEY' && SENDGRID_API_KEY.startsWith('SG.')) {
    sgMail.setApiKey(SENDGRID_API_KEY);
    sendgridEnabled = true;
} else {
    console.warn('[Email] SendGrid is not configured or invalid. Falling back to SMTP if available.');
}

const isSmtpAvailable = smtpOptions.auth && smtpOptions.host;
const smtpTransporter = isSmtpAvailable ? nodemailer.createTransport(smtpOptions) : null;

const sendEmail = async (options) => {
    const msg = {
        to: options.email,
        from: SENDGRID_MAIL || process.env.SMTP_MAIL,
        subject: options.subject || 'No Subject',
        text: options.message,
        html: options.html || options.message,
    };

    if (!msg.from) {
        throw new Error('Email sender is not configured. Set SENDGRID_MAIL or SMTP_MAIL.');
    }

    if (sendgridEnabled) {
        const sgMsg = {
            ...msg,
            templateId: options.templateId,
            dynamic_template_data: options.data,
        };

        try {
            await sgMail.send(sgMsg);
            console.log('Email Sent Successfully via SendGrid');
            return;
        } catch (error) {
            console.error('SendGrid Error:', error.response?.body || error.message);
            if (!isSmtpAvailable) throw error;
            console.warn('[Email] SendGrid failed, attempting SMTP fallback.');
        }
    }

    if (!smtpTransporter) {
        throw new Error('No email transport available. Configure SendGrid or SMTP.');
    }

    try {
        await smtpTransporter.sendMail({
            from: msg.from,
            to: msg.to,
            subject: msg.subject,
            text: msg.text,
            html: msg.html,
        });
        console.log('Email Sent Successfully via SMTP');
    } catch (error) {
        console.error('SMTP Error:', error.message);
        throw error;
    }
};

module.exports = sendEmail;
