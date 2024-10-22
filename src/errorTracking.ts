import { Client, Databases } from 'node-appwrite';
import * as dotenv from 'dotenv';

dotenv.config();

// Debugging output to check env variables
console.log("Endpoint:", process.env.APPWRITE_ENDPOINT);
console.log("Project ID:", process.env.APPWRITE_PROJECT_ID);
console.log("API Key:", process.env.APPWRITE_API_KEY);
console.log("Database ID:", process.env.APPWRITE_DATABASE_ID);
console.log("Collection ID:", process.env.APPWRITE_COLLECTION_ID);

const client = new Client();

client
  .setEndpoint(process.env.APPWRITE_ENDPOINT || 'YOUR_APPWRITE_ENDPOINT')
  .setProject(process.env.APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID')
  .setKey(process.env.APPWRITE_API_KEY || 'YOUR_API_KEY');

const databases = new Databases(client);

async function logErrorToAppwrite(error: any) {
  console.error("Logged Error:", error); // Log to terminal

  try {
    const data = {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    };

    await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID',
      process.env.APPWRITE_COLLECTION_ID || 'YOUR_COLLECTION_ID',
      'unique()', // unique ID or provide a specific ID
      data
    );
    console.log('Error logged successfully to Appwrite');
  } catch (err) {
    console.error('Failed to log error to Appwrite:', err);
  }
}

export default logErrorToAppwrite;