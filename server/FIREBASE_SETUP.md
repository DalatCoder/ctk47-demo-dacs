# Hướng dẫn cấu hình Firebase

## 1. Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com/)
2. Nhấn "Add project" để tạo project mới
3. Đặt tên project (ví dụ: `club-event-manager`)
4. Tắt Google Analytics nếu không cần
5. Nhấn "Create project"

## 2. Thiết lập Firestore Database

1. Trong Firebase Console, chọn "Firestore Database"
2. Nhấn "Create database"
3. Chọn "Start in test mode" (có thể thay đổi sau)
4. Chọn location gần nhất (asia-southeast1 cho Việt Nam)
5. Nhấn "Done"

## 3. Thiết lập Web App

1. Trong Firebase Console, chọn "Project settings" (⚙️)
2. Cuộn xuống phần "Your apps"
3. Nhấn biểu tượng "</>" để thêm web app
4. Đặt tên app và nhấn "Register app"
5. Copy thông tin config và dán vào file .env

## 4. Cấu hình file .env

Mở file `.env` và thay thế các giá trị sau:

```env
# Firebase Configuration
FIREBASE_API_KEY=AIzaSyC...your_api_key_here
FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789012
FIREBASE_APP_ID=1:123456789012:web:abc123def456

# Server Configuration
PORT=3000
NODE_ENV=development
```

## 5. (Tùy chọn) Thiết lập Admin SDK

Nếu muốn sử dụng Firebase Admin SDK:

1. Trong Firebase Console, vào "Project settings" > "Service accounts"
2. Nhấn "Generate new private key"
3. Download file JSON
4. Copy nội dung file JSON và dán vào .env:

```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

## 6. Kiểm tra kết nối

Chạy server và kiểm tra console:

```bash
npm start
```

Nếu thành công, bạn sẽ thấy:
```
✅ Firebase đã được kết nối thành công!
🔥 Firebase đã được kết nối thành công!
Server đang chạy tại http://localhost:3000
```

## 7. Cấu hình Firestore Rules (Tùy chọn)

Trong Firebase Console > Firestore Database > Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Cho phép read/write events collection
    match /events/{document} {
      allow read, write: if true;
    }
  }
}
```

**Lưu ý**: Rules trên chỉ để development, production cần rules bảo mật hơn.

## Troubleshooting

### Lỗi "Firebase: Error (auth/invalid-api-key)"
- Kiểm tra FIREBASE_API_KEY trong .env
- Đảm bảo API key đúng từ Firebase Console

### Lỗi "Firebase: Error (auth/project-not-found)"
- Kiểm tra FIREBASE_PROJECT_ID trong .env
- Đảm bảo project ID đúng

### Lỗi "Missing or insufficient permissions"
- Kiểm tra Firestore Rules
- Đảm bảo đã enable Firestore Database
