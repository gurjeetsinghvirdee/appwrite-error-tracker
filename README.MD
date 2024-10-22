# Appwrite Error Tracker

## Description 
Appwrite Error Tracker is a robust error logging solution designed for seamless integration with Appwrite projects. This TypeScript-based package leverages Appwrite's functions to capture and log errors in real-time, providing detailed reports and ensuring high application reliability.

## What's the Use of This?
Appwrite Error Tracker helps developers maintain high-quality applications by:
- Providing real-time error notifications.
- Offering detailed error reports including stack traces and user actions.
- Monitoring performance and identifying recurring issues.
- Analyzing user impact to prioritize fixes efficiently.

## Setup

### Installation

1. **Install via npm**:
   ```bash
    npm install appwrite-error-tracker
   ```

2. **Create a `.env` file in the root directory**:
   ```bash
    APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
    APPWRITE_API_KEY=YOUR_API_KEY
    APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
    APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID
   ```

3. **Ensure Appwrite Schema**:
   
- Log into Appwrite Console and navigate to your database and collection.
- Add the following attributes if they don't already exist:
  - `error`: string (length 255 or more)
  - `stack`: string (length 1000 or more)
  - `timestamp`: string (or datetime)

### Usage

4. **Integrate into your application**: In your project's entry file (e.g., `app.ts`);
   ```ts
    import logErrorToAppwrite from 'appwrite-error-tracker';

    process.on('uncaughtException', (error) => {
        logErrorToAppwrite(error);
    });

    process.on('unhandledRejection', (reason, promise) => {
        logErrorToAppwrite(reason);
    });
   ```

**Configuration**

Ensure your `.env` file contains the correct Appwrite project details:
- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_COLLECTION_ID`

**License**

This project is licensed under the MIT License. See the [LICENSE](https://github.com/gurjeetsinghvirdee/appwrite-error-tracker/blob/master/LICENSE) file for details.