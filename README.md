# Blog App with React, Redux, and Appwrite

## Overview
This is a blog application built with React and Redux for state management. Appwrite is used for backend services, including authentication, database, and storage. The app allows users to log in, log out, create blogs, update blogs, and delete blogs.

## Features
- **User Authentication**: Log in and log out securely.
- **CRUD Operations**: Create, read, update, and delete blogs.
- **Rich Text Editing**: Blogs can be formatted with TinyMCE.

## Technologies Used
- **Frontend**: React, Redux
- **Backend Services**: Appwrite
- **Rich Text Editor**: TinyMCE

## Setup Instructions
1. Clone the repository and navigate to the project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_APPWRITE_BUCKET_ID=your_bucket_id
   VITE_TINYMCE_API_KEY=your_tinymce_api_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## How to Use
1. **Authentication**: Log in using your credentials.
2. **Blog Management**:
   - Create a blog by filling in the title and content.
   - Update existing blogs.
   - Delete blogs you no longer need.
3. Rich text editing is enabled for blog content using TinyMCE.
