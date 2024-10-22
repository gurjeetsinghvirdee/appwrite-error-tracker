import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

// Step 1: Install Appwrite and dotenv packages
exec('npm install appwrite dotenv', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error installing packages: ${stderr}`);
    return;
  }
  console.log(`Packages installed: ${stdout}`);

  // Step 2: Add Appwrite initialization and error tracking code
  const initCode = `
import { Client, Databases } from 'node-appwrite';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'YOUR_APPWRITE_ENDPOINT')
  .setProject(process.env.APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID')
  .setKey(process.env.APPWRITE_API_KEY || 'YOUR_API_KEY');

const databases = new Databases(client);

async function logErrorToAppwrite(error: any) {
  // Log the error to the terminal
  console.error("Logged Error:", error);

  try {
    const data = {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };
    const permissions: string[] = []; // Add appropriate permissions if necessary

    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID',
      process.env.APPWRITE_COLLECTION_ID || 'YOUR_COLLECTION_ID',
      'unique()', // unique ID or provide a specific ID
      data,
      permissions
    );
    console.log('Error logged successfully to Appwrite');
  } catch (err) {
    console.error('Failed to log error to Appwrite:', err);
  }
}

process.on('uncaughtException', (error) => {
  logErrorToAppwrite(error);
});

process.on('unhandledRejection', (reason, promise) => {
  logErrorToAppwrite(reason);
});
  `;

  const filePath = path.join('src', 'app.ts');

  fs.appendFileSync(filePath, initCode, { encoding: 'utf8' });
  console.log('Appwrite error tracking code added to app.ts');
});