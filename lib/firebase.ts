import * as dotenv from 'dotenv';
import admin from 'firebase-admin';

dotenv.config();

if (!process.env.FIREBASE_CREDENTIALS) {
  throw new Error("FIREBASE_CREDENTIALS is not defined in .env");
}

// JSON string olarak gelen env değişkenini parse et
const firebaseCredentials = JSON.parse(process.env.FIREBASE_CREDENTIALS.replace(/\\n/g, '\n'));

// Firebase initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
  });
}

export const messaging = admin.messaging();
export default admin;
