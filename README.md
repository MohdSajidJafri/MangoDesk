# Meeting Notes Summarizer

An AI-powered application to summarize meeting transcripts and share them via email.

## Features

- Upload or paste meeting transcripts
- Customize summarization instructions
- Generate AI-powered summaries using Google's Gemini API
- Edit generated summaries
- Share summaries via email

## Tech Stack

- **Frontend**: React
- **Backend**: Node.js with Express
- **AI**: Google Gemini API
- **Email**: Nodemailer

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Gmail account for sending emails (or other email provider)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure email credentials:
   - Create a `.env` file in the backend directory
   - Add the following variables:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASS=your-app-password
     ```
   - Note: For Gmail, you'll need to create an App Password. See [Google Account Help](https://support.google.com/accounts/answer/185833) for instructions.

4. Start the backend server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## How to Use

1. Paste your meeting transcript in the text area
2. (Optional) Add custom instructions for the AI summarizer
3. Click "Generate Summary"
4. Review and edit the generated summary as needed
5. Enter recipient email addresses (comma-separated)
6. Click "Send Email" to share the summary

## Notes

- The application uses Google's Gemini API for AI summarization
- Email sending requires valid SMTP credentials
- For production use, consider implementing proper authentication and security measures