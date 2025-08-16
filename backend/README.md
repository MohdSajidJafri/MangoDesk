# Backend Setup Instructions

## Environment Configuration

To enable the application functionality, you need to set up your environment variables:

1. Create a file named `.env` in this directory
2. Add the following content to the file:

```
EMAIL_USER=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
GEMINI_API_KEY=your-gemini-api-key
```

### How to get your API keys:

#### Gmail App Password:

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to "App passwords" 
5. Select "Mail" and "Other" (custom name)
6. Enter "Meeting Notes Summarizer" as the app name
7. Click "Generate"
8. Use the 16-character password that appears

#### Gemini API Key:

1. Go to https://ai.google.dev/
2. Sign in with your Google account
3. Navigate to "Get API key" in the top menu
4. Create a new project or select an existing one
5. Click "Create API Key" and copy the generated key

## Running the Backend

After setting up the `.env` file:

```
npm run dev
```

The server will run on http://localhost:5000
