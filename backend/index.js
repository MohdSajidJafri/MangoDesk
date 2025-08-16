const express = require('express');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Initialize Google Generative AI
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

// Email transporter configuration
// Using a more reliable configuration for Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '', // Set your email in environment variables
    pass: process.env.EMAIL_PASS || '', // Set your app password in environment variables
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Route to generate summary
app.post('/api/generate-summary', upload.single('transcript'), async (req, res) => {
  try {
    // Get transcript from file or text input
    const transcript = req.file 
      ? req.file.buffer.toString('utf-8') 
      : req.body.transcript;
    
    const customPrompt = req.body.prompt || 'Summarize this meeting transcript';
    
    if (!transcript) {
      return res.status(400).json({ error: 'No transcript provided' });
    }

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const prompt = `${customPrompt}\n\nTranscript:\n${transcript}`;
    
    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    
    res.json({ summary });
  } catch (error) {
    console.error('Error generating summary:', error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

// Route to send email
app.post('/api/send-email', async (req, res) => {
  try {
    const { recipients, subject, summary } = req.body;
    
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ error: 'No recipients provided' });
    }

    if (!summary) {
      return res.status(400).json({ error: 'No summary provided' });
    }

    // Check if email credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not provided. Returning summary without sending email.');
      return res.json({ 
        success: true, 
        message: 'Email credentials not set. For this demo, consider the email as sent.',
        summary: summary
      });
    }

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: recipients.join(', '),
      subject: subject || 'Meeting Summary',
      html: `
        <h2>Meeting Summary</h2>
        <div style="white-space: pre-wrap;">${summary}</div>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    // Return a more user-friendly error message
    res.status(500).json({ 
      error: 'Failed to send email. For this demo, you can consider the summary as the final output.',
      summary: req.body.summary
    });
  }
});

// Root route to confirm server is running
app.get('/', (req, res) => {
  res.json({ message: 'Meeting Notes Summarizer API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
