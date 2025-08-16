# Meeting Notes Summarizer - Project Documentation

## Project Overview

The Meeting Notes Summarizer is a full-stack web application designed to help users summarize meeting transcripts using AI and share them via email. The application leverages Google's Gemini AI to generate concise, structured summaries from raw meeting transcripts, which can then be edited by users before being shared.

## Tech Stack

### Frontend
- **Framework**: React.js
- **State Management**: React Hooks (useState)
- **Styling**: Custom CSS
- **HTTP Client**: Native Fetch API
- **Build Tool**: Create React App

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **File Handling**: Multer (for transcript uploads)
- **Email Service**: Nodemailer (for sending emails)
- **AI Integration**: Google Generative AI SDK (@google/generative-ai)
- **Environment Variables**: dotenv

### Deployment
- **Backend Hosting**: Render.com
- **Frontend Hosting**: Netlify
- **Version Control**: Git/GitHub

## Architecture

The application follows a client-server architecture with clear separation of concerns:

1. **Client (Frontend)**
   - Provides user interface for transcript input
   - Handles custom prompt input
   - Displays and allows editing of generated summaries
   - Manages email recipient input
   - Communicates with backend via RESTful API

2. **Server (Backend)**
   - Exposes RESTful API endpoints
   - Processes transcript data
   - Communicates with Gemini AI API
   - Handles email sending via SMTP
   - Manages environment variables for secure configuration

## Key Features

1. **Transcript Input**
   - Users can paste meeting transcripts directly into a text area
   - Simple, intuitive interface focused on functionality

2. **Custom AI Instructions**
   - Users can provide custom prompts to guide the AI summarization
   - Examples: "Summarize in bullet points for executives" or "Highlight only action items"

3. **AI-Powered Summarization**
   - Integration with Google's Gemini API
   - Generates structured summaries based on transcript content and custom instructions

4. **Editable Summaries**
   - Generated summaries can be edited before sharing
   - Allows users to refine or correct AI output

5. **Email Sharing**
   - Users can enter recipient email addresses
   - Formatted emails with summaries are sent via SMTP

## Development Approach

### 1. Project Setup
- Created separate directories for frontend and backend
- Set up basic project structure and dependencies
- Configured development environment

### 2. Backend Development
- Implemented Express server with necessary middleware
- Created API endpoints for summary generation and email sending
- Integrated Gemini AI for natural language processing
- Set up Nodemailer for email functionality
- Implemented proper error handling and response formatting

### 3. Frontend Development
- Created React components for user interface
- Implemented form handling for transcript input and custom prompts
- Added functionality for editing generated summaries
- Developed email recipient input and validation
- Integrated with backend API endpoints

### 4. Security & Configuration
- Implemented environment variables for sensitive information
- Secured API keys and email credentials
- Added CORS configuration for secure cross-origin requests
- Implemented proper error handling and validation

### 5. Deployment
- Configured backend for deployment on Render.com
- Set up frontend deployment on Netlify
- Created deployment documentation
- Implemented environment-specific configurations

## API Endpoints

### 1. Generate Summary
- **Endpoint**: `/api/generate-summary`
- **Method**: POST
- **Request Body**:
  - `transcript`: The meeting transcript text
  - `prompt`: Custom instructions for the AI (optional)
- **Response**: JSON object containing the generated summary

### 2. Send Email
- **Endpoint**: `/api/send-email`
- **Method**: POST
- **Request Body**:
  - `recipients`: Array of email addresses
  - `subject`: Email subject (optional, defaults to "Meeting Summary")
  - `summary`: The summary text to send
- **Response**: JSON object indicating success or failure

## Challenges and Solutions

### 1. CORS Configuration
- **Challenge**: Cross-origin resource sharing issues between frontend and backend
- **Solution**: Implemented proper CORS configuration with appropriate headers

### 2. API Key Security
- **Challenge**: Securing the Gemini API key
- **Solution**: Moved API key to environment variables and removed hardcoded values

### 3. Email Authentication
- **Challenge**: Secure email sending with proper authentication
- **Solution**: Implemented secure SMTP configuration with app passwords for Gmail

### 4. Deployment Issues
- **Challenge**: Path-to-regexp errors during backend deployment
- **Solution**: Simplified CORS configuration to avoid URL format issues

## Future Enhancements

1. **User Authentication**
   - Add user accounts and authentication
   - Store user preferences and history

2. **Database Integration**
   - Implement database storage for transcripts and summaries
   - Enable retrieving past summaries

3. **Advanced Customization**
   - Allow saving custom prompt templates
   - Provide more formatting options for summaries

4. **File Upload**
   - Support direct file uploads (audio, video, text)
   - Implement automatic transcription for audio/video files

5. **Team Collaboration**
   - Add sharing capabilities within teams
   - Implement commenting and collaborative editing

## Conclusion

The Meeting Notes Summarizer demonstrates effective integration of modern web technologies with AI capabilities to solve a practical business problem. The application successfully leverages Google's Gemini AI to generate useful meeting summaries and provides a straightforward mechanism for sharing them via email.

The clean separation between frontend and backend, proper security practices, and focus on core functionality make this application a solid foundation that can be extended with additional features in the future.
