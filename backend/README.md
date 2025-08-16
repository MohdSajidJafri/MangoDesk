# Backend Setup Instructions

## Email Configuration

To enable email sending functionality, you need to set up your email credentials:

1. Create a file named `.env` in this directory
2. Add the following content to the file:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
```

### How to get an App Password for Gmail:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to "App passwords" 
5. Select "Mail" and "Other" (custom name)
6. Enter "Meeting Notes Summarizer" as the app name
7. Click "Generate"
8. Use the 16-character password that appears

## Running the Backend

After setting up the `.env` file:

```
npm run dev
```

The server will run on http://localhost:5000
