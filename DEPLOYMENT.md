# Deployment Guide for Meeting Notes Summarizer

This guide provides step-by-step instructions for deploying both the frontend and backend of the Meeting Notes Summarizer application.

## Backend Deployment (Render.com)

1. Create a new account on [Render](https://render.com/) if you don't have one.

2. Click on "New" and select "Web Service".

3. Connect your GitHub repository or use the "Public Git repository" option with the URL: `https://github.com/MohdSajidJafri/MangoDesk.git`

4. Configure the web service:
   - Name: `mangodesk-api`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `node index.js`
   - Select the "Free" plan

5. Add the following environment variables:
   - `EMAIL_USER`: Your Gmail address
   - `EMAIL_PASS`: Your Gmail app password
   - `NODE_ENV`: `production`

6. Click "Create Web Service" and wait for the deployment to complete.

7. Note the URL of your deployed backend (e.g., `https://mangodesk-api.onrender.com`).

## Frontend Deployment (Netlify)

1. Create a new account on [Netlify](https://www.netlify.com/) if you don't have one.

2. Click on "New site from Git".

3. Connect to your GitHub repository and select it.

4. Configure the build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/build`

5. Add the following environment variable:
   - `REACT_APP_API_URL`: The URL of your deployed backend (e.g., `https://mangodesk-api.onrender.com`)

6. Click "Deploy site" and wait for the deployment to complete.

## Update Frontend Configuration (If Needed)

If your deployed backend URL is different from the one in the code, you'll need to update it:

1. Go to your Netlify site dashboard.
2. Navigate to "Site settings" > "Build & deploy" > "Environment variables".
3. Add a new variable:
   - Key: `REACT_APP_API_URL`
   - Value: Your actual backend URL (e.g., `https://mangodesk-api.onrender.com`)
4. Trigger a new deployment by clicking "Trigger deploy" in the "Deploys" tab.

## Testing the Deployed Application

1. Open your deployed frontend URL in a browser.
2. Test the application by:
   - Pasting a meeting transcript
   - Adding a custom instruction (optional)
   - Clicking "Generate Summary"
   - Entering recipient email(s)
   - Clicking "Send Email"

## Troubleshooting

If you encounter issues:

1. Check the logs in Render.com for backend errors.
2. Check the deployment logs in Netlify for frontend errors.
3. Verify that the environment variables are set correctly.
4. Ensure your Gmail account is properly configured to allow sending emails via SMTP.

## Updating the Application

To update the application after making changes:

1. Push your changes to GitHub.
2. Both Render and Netlify will automatically redeploy your application.
