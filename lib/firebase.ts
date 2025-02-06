import * as dotenv from 'dotenv';
import admin from 'firebase-admin';
import * as fs from 'fs';

dotenv.config();

if (!process.env.FIREBASE_CREDENTIALS) {
  throw new Error("FIREBASE_CREDENTIALS is not defined in .env");
}

const firebaseCredentialsPath = process.env.FIREBASE_CREDENTIALS.trim(); // Trim spaces
const firebaseCredentials = JSON.parse(fs.readFileSync(firebaseCredentialsPath, 'utf8'));

// Firebase initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const messaging = admin.messaging();
export default admin;
