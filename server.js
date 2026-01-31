require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the build directory (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Brevo API Configuration
const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL;
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || 'Lahori Samosa';

// Send Email Endpoint
app.post('/api/send-email', async (req, res) => {
  console.log('Received email request');
  try {
    const { to, subject, htmlContent, textContent } = req.body;

    if (!BREVO_API_KEY || !BREVO_SENDER_EMAIL) {
      console.error('Brevo configuration missing');
      return res.status(500).json({ success: false, error: 'Server misconfiguration: Missing Brevo keys' });
    }

    if (!to || !subject || (!htmlContent && !textContent)) {
      console.warn('Missing required fields in request:', req.body);
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    const emailData = {
      sender: {
        name: BREVO_SENDER_NAME,
        email: BREVO_SENDER_EMAIL
      },
      to: Array.isArray(to) ? to : [{ email: to }],
      subject: subject,
      htmlContent: htmlContent || textContent
    };

    console.log('Sending email via Brevo to:', emailData.to);

    const response = await axios.post(BREVO_API_URL, emailData, {
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
        'content-type': 'application/json'
      }
    });

    console.log('Email sent successfully:', response.data);
    res.json({ success: true, message: 'Email sent successfully', data: response.data });

  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Brevo API Error Response:', error.response.data);
      console.error('Status:', error.response.status);
      res.status(error.response.status).json({
        success: false,
        error: 'Failed to send email via Brevo',
        details: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Brevo API No Response:', error.request);
      res.status(500).json({ success: false, error: 'No response from email provider' });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Server Internal Error:', error.message);
      res.status(500).json({ success: false, error: 'Internal server error: ' + error.message });
    }
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve React app for all non-API routes (for production)
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

console.log(`Starting Node.js server on port ${PORT}...`);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  if (!BREVO_API_KEY) console.warn('WARNING: BREVO_API_KEY is missing in .env');
  if (!BREVO_SENDER_EMAIL) console.warn('WARNING: BREVO_SENDER_EMAIL is missing in .env');
});
