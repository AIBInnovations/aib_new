import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"AIB Website" <${process.env.EMAIL_USER}>`,
      to: 'aibinnovations@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Contact email error:', err);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

// Newsletter / CTA signup
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  try {
    await transporter.sendMail({
      from: `"AIB Website" <${process.env.EMAIL_USER}>`,
      to: 'aibinnovations@gmail.com',
      subject: `New Newsletter Signup: ${email}`,
      html: `
        <h2>New Newsletter Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
      `,
    });

    res.json({ success: true, message: 'Successfully subscribed!' });
  } catch (err) {
    console.error('Newsletter email error:', err);
    res.status(500).json({ error: 'Failed to subscribe. Please try again.' });
  }
});

// Meeting booking
app.post('/api/booking', async (req, res) => {
  const { date, time, month, year } = req.body;

  if (!date || !time) {
    return res.status(400).json({ error: 'Date and time are required.' });
  }

  try {
    await transporter.sendMail({
      from: `"AIB Website" <${process.env.EMAIL_USER}>`,
      to: 'aibinnovations@gmail.com',
      subject: `New Meeting Booking — ${month} ${date}, ${year} at ${time}`,
      html: `
        <h2>New Meeting Booking Request</h2>
        <p><strong>Date:</strong> ${month} ${date}, ${year}</p>
        <p><strong>Time:</strong> ${time} (Asia/Kolkata)</p>
        <p><strong>Duration:</strong> 30 minutes</p>
        <p><strong>Type:</strong> Google Meet</p>
      `,
    });

    res.json({ success: true, message: 'Booking confirmed!' });
  } catch (err) {
    console.error('Booking email error:', err);
    res.status(500).json({ error: 'Failed to confirm booking. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`AIB Email server running on http://localhost:${PORT}`);
});
