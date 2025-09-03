# 🎉 Hệ thống Quản lý Sự kiện CLB

Ứng dụng web quản lý sự kiện cho câu lạc bộ, được xây dựng với Node.js, Express và Firebase.

## ✨ Tính năng

- 📋 **Hiển thị danh sách sự kiện** - Giao diện card hiện đại
- ➕ **Thêm sự kiện mới** - Form với validation đầy đủ
- ✏️ **Chỉnh sửa sự kiện** - Cập nhật thông tin dễ dàng
- 🗑️ **Xóa sự kiện** - Có xác nhận an toàn
- 🔥 **Lưu trữ Firebase** - Dữ liệu được đồng bộ real-time
- 📱 **Responsive Design** - Tương thích mọi thiết bị

## 🛠️ Công nghệ sử dụng

- **Backend**: Node.js, Express.js
- **Frontend**: EJS, HTML5, CSS3, JavaScript
- **Database**: Firebase Firestore
- **Styling**: Custom CSS với Flexbox/Grid

## 📦 Cấu trúc dự án

```
server/
├── app.js                 # Server chính
├── package.json           # Dependencies
├── .env                   # Cấu hình environment (không commit)
├── .gitignore            # Bỏ qua files nhạy cảm
├── FIREBASE_SETUP.md     # Hướng dẫn cấu hình Firebase
├── config/
│   └── firebase.js       # Cấu hình Firebase
├── services/
│   └── eventService.js   # Service quản lý sự kiện
├── scripts/
│   └── seed-data.js      # Script khởi tạo dữ liệu mẫu
├── views/                # EJS templates
│   ├── index.ejs         # Trang chủ
│   ├── add-event.ejs     # Thêm sự kiện
│   └── edit-event.ejs    # Chỉnh sửa sự kiện
└── public/
    └── css/
        └── style.css     # Styles chính
```

## 🚀 Hướng dẫn cài đặt

### 1. Clone và cài đặt dependencies

```bash
# Di chuyển vào thư mục server
cd server

# Cài đặt packages
npm install
```

### 2. Cấu hình Firebase

Làm theo hướng dẫn chi tiết trong file [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

### 3. Cấu hình Environment Variables

Tạo file `.env` và cấu hình:

```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id_here
FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id_here
FIREBASE_APP_ID=your_app_id_here

# Server Configuration
PORT=3000
NODE_ENV=development
```

### 4. Khởi tạo dữ liệu mẫu (tùy chọn)

```bash
npm run seed
```

### 5. Khởi động ứng dụng

```bash
npm start
```

Truy cập: **http://localhost:3000**

## 📝 Scripts có sẵn

```bash
npm start      # Khởi động server
npm run dev    # Chế độ development (giống start)
npm run seed   # Khởi tạo dữ liệu mẫu
```

## 🎯 API Routes

| Method | Route | Mô tả |
|--------|-------|--------|
| GET | `/` | Trang chủ - danh sách sự kiện |
| GET | `/add` | Form thêm sự kiện mới |
| POST | `/add` | Xử lý thêm sự kiện |
| GET | `/edit/:id` | Form chỉnh sửa sự kiện |
| POST | `/edit/:id` | Xử lý cập nhật sự kiện |
| POST | `/delete/:id` | Xóa sự kiện |

## 🔧 Cấu hình Firebase

### Firestore Collections

- **events**: Lưu trữ thông tin sự kiện

### Event Schema

```javascript
{
  id: "auto-generated",
  title: "string",
  time: "Timestamp",
  description: "string", 
  address: "string",
  createdAt: "Timestamp",
  updatedAt: "Timestamp"
}
```

## 🛡️ Bảo mật

- Environment variables được lưu trong `.env` (không commit)
- Firebase rules cần được cấu hình phù hợp cho production
- Input validation ở cả client và server side

## 🐛 Troubleshooting

### Lỗi kết nối Firebase
1. Kiểm tra cấu hình trong `.env`
2. Đảm bảo Firebase project đã được tạo
3. Kiểm tra Firestore đã được enable

### Lỗi port đã được sử dụng
```bash
# Thay đổi port trong .env
PORT=3001
```

### Lỗi dependencies
```bash
# Xóa node_modules và cài lại
rm -rf node_modules
npm install
```

## 🤝 Đóng góp

1. Fork project
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📄 License

Dự án này được phát hành dưới [MIT License](LICENSE).

## 👥 Tác giả

- **Nhóm 25** - CLB Sinh viên

## 🙏 Acknowledgments

- Firebase Documentation
- Express.js Documentation
- EJS Template Engine
- CSS Grid và Flexbox Guides
