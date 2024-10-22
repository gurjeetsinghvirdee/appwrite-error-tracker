"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_appwrite_1 = require("node-appwrite");
const dotenv = require("dotenv");
dotenv.config();
// Debugging output to check env variables
console.log("Endpoint:", process.env.APPWRITE_ENDPOINT);
console.log("Project ID:", process.env.APPWRITE_PROJECT_ID);
console.log("API Key:", process.env.APPWRITE_API_KEY);
console.log("Database ID:", process.env.APPWRITE_DATABASE_ID);
console.log("Collection ID:", process.env.APPWRITE_COLLECTION_ID);
const client = new node_appwrite_1.Client();
client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'YOUR_APPWRITE_ENDPOINT')
    .setProject(process.env.APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID')
    .setKey(process.env.APPWRITE_API_KEY || 'YOUR_API_KEY');
const databases = new node_appwrite_1.Databases(client);
function logErrorToAppwrite(error) {
    return __awaiter(this, void 0, void 0, function* () {
        console.error("Logged Error:", error); // Log to terminal
        try {
            const data = {
                error: error.message,
                stack: error.stack,
                timestamp: new Date().toISOString(),
            };
            yield databases.createDocument(process.env.APPWRITE_DATABASE_ID || 'YOUR_DATABASE_ID', process.env.APPWRITE_COLLECTION_ID || 'YOUR_COLLECTION_ID', 'unique()', // unique ID or provide a specific ID
            data);
            console.log('Error logged successfully to Appwrite');
        }
        catch (err) {
            console.error('Failed to log error to Appwrite:', err);
        }
    });
}
exports.default = logErrorToAppwrite;
