// config/firebase.js
const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app');
const { getFirestore } = require('firebase/firestore');
require('dotenv').config();

// Cấu hình Firebase client
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Khởi tạo Firebase client app
const app = initializeApp(firebaseConfig);

// Khởi tạo Firestore
const db = getFirestore(app);

// Cấu hình Firebase Admin SDK
let adminDb;
try {
  // Kiểm tra xem có service account key không
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID
    });
    
    adminDb = admin.firestore();
    console.log('✅ Firebase Admin SDK đã được khởi tạo thành công');
  } else {
    console.log('⚠️ Không tìm thấy service account key. Chỉ sử dụng Firebase client SDK');
  }
} catch (error) {
  console.error('❌ Lỗi khởi tạo Firebase Admin SDK:', error.message);
}

module.exports = {
  db,           // Firestore client
  adminDb,      // Firestore admin (nếu có)
  admin         // Firebase admin instance
};
