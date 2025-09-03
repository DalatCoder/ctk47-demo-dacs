// scripts/seed-data.js
const eventService = require('../services/eventService');

const sampleEvents = [
    {
        title: 'Hội thảo Công nghệ 2025',
        time: '2025-09-15T10:00',
        description: 'Hội thảo về các xu hướng công nghệ mới nhất trong năm 2025, bao gồm AI, Machine Learning, và các công nghệ web hiện đại.',
        address: '123 Nguyễn Văn Cừ, Quận 5, TP.HCM'
    },
    {
        title: 'Workshop Lập trình Web',
        time: '2025-09-20T14:00',
        description: 'Workshop thực hành lập trình web với Node.js, Express và React. Phù hợp cho người mới bắt đầu.',
        address: '456 Lê Văn Việt, Quận 9, TP.HCM'
    },
    {
        title: 'Hackathon Sinh viên 2025',
        time: '2025-09-25T09:00',
        description: 'Cuộc thi lập trình 24 giờ dành cho sinh viên. Giải thưởng hấp dẫn và cơ hội kết nối với các công ty công nghệ.',
        address: 'Đại học Khoa học Tự nhiên, TP.HCM'
    },
    {
        title: 'Seminar Khởi nghiệp',
        time: '2025-10-01T19:00',
        description: 'Chia sẻ kinh nghiệm khởi nghiệp trong lĩnh vực công nghệ từ các doanh nhân thành công.',
        address: '789 Võ Văn Tần, Quận 3, TP.HCM'
    }
];

async function seedData() {
    console.log('🌱 Bắt đầu khởi tạo dữ liệu mẫu...');
    
    try {
        // Kiểm tra kết nối Firebase
        const isConnected = await eventService.testConnection();
        if (!isConnected) {
            console.error('❌ Không thể kết nối Firebase. Vui lòng kiểm tra cấu hình.');
            process.exit(1);
        }

        // Lấy danh sách sự kiện hiện tại
        const existingEvents = await eventService.getAllEvents();
        
        if (existingEvents.length > 0) {
            console.log(`⚠️ Đã có ${existingEvents.length} sự kiện trong database.`);
            console.log('Bạn có muốn thêm dữ liệu mẫu không? (y/N)');
            
            // Trong môi trường thực tế, có thể sử dụng readline để nhận input
            // Ở đây chúng ta sẽ bỏ qua để tránh phức tạp
            console.log('Bỏ qua khởi tạo dữ liệu mẫu vì đã có dữ liệu.');
            return;
        }

        // Thêm từng sự kiện mẫu
        for (let i = 0; i < sampleEvents.length; i++) {
            const event = sampleEvents[i];
            console.log(`📅 Tạo sự kiện: ${event.title}`);
            
            await eventService.createEvent(event);
            console.log(`✅ Đã tạo sự kiện ${i + 1}/${sampleEvents.length}`);
        }

        console.log('🎉 Hoàn thành khởi tạo dữ liệu mẫu!');
        console.log(`📊 Đã thêm ${sampleEvents.length} sự kiện vào database.`);
        
    } catch (error) {
        console.error('❌ Lỗi khi khởi tạo dữ liệu mẫu:', error);
        process.exit(1);
    }
}

// Chạy script nếu được gọi trực tiếp
if (require.main === module) {
    seedData().then(() => {
        console.log('✨ Script hoàn thành!');
        process.exit(0);
    }).catch((error) => {
        console.error('💥 Script thất bại:', error);
        process.exit(1);
    });
}

module.exports = seedData;
