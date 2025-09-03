const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

// Import Firebase services
const eventService = require('./services/eventService');

const app = express();
const PORT = process.env.PORT || 3000;

// Cấu hình view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Cấu hình layouts
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Kiểm tra kết nối Firebase khi khởi động
(async () => {
    try {
        await eventService.testConnection();
        console.log('🔥 Firebase đã được kết nối thành công!');
    } catch (error) {
        console.error('❌ Không thể kết nối Firebase:', error.message);
        console.log('💡 Vui lòng kiểm tra cấu hình Firebase trong file .env');
    }
})();















// API

// Get all events
app.get('/api/events', async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.json({
            status: 'success',
            data: events
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sự kiện:', error);
        res.status(500).json({ error: 'Không thể tải danh sách sự kiện. Vui lòng thử lại sau.' });
    }
})

// Get event by ID
app.get('/api/events/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'Sự kiện không tồn tại'
            });
        }
        res.json({
            status: 'success',
            data: event
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sự kiện:', error);
        res.status(500).json({ error: 'Không thể tải danh sách sự kiện. Vui lòng thử lại sau.' });
    }
})
















// Routes
// Trang chủ - Dashboard
app.get('/', async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.render('index', { 
            events: events,
            currentPage: 'dashboard',
            pageTitle: 'Dashboard'
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sự kiện:', error);
        res.render('index', { 
            events: [], 
            error: 'Không thể tải danh sách sự kiện. Vui lòng thử lại sau.',
            currentPage: 'dashboard',
            pageTitle: 'Dashboard'
        });
    }
});

// Trang danh sách tất cả sự kiện
app.get('/events', async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.render('events', { 
            events: events,
            currentPage: 'events',
            pageTitle: 'Quản lý Sự kiện'
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách sự kiện:', error);
        res.render('events', { 
            events: [], 
            error: 'Không thể tải danh sách sự kiện. Vui lòng thử lại sau.',
            currentPage: 'events',
            pageTitle: 'Quản lý Sự kiện'
        });
    }
});

// Trang thêm sự kiện mới
app.get('/events/add', (req, res) => {
    res.render('add-event', {
        currentPage: 'add-event',
        pageTitle: 'Thêm Sự kiện Mới'
    });
});

// Legacy route (để tương thích)
app.get('/add', (req, res) => {
    res.redirect('/events/add');
});

// Xử lý thêm sự kiện mới
app.post('/events/add', async (req, res) => {
    try {
        const { title, time, description, address } = req.body;
        
        if (!title || !time || !description || !address) {
            return res.render('add-event', { 
                error: 'Vui lòng điền đầy đủ thông tin!',
                title, time, description, address,
                currentPage: 'add-event',
                pageTitle: 'Thêm Sự kiện Mới'
            });
        }

        await eventService.createEvent({ title, time, description, address });
        res.redirect('/events');
    } catch (error) {
        console.error('Lỗi khi tạo sự kiện:', error);
        res.render('add-event', { 
            error: 'Có lỗi xảy ra khi tạo sự kiện. Vui lòng thử lại.',
            title: req.body.title,
            time: req.body.time,
            description: req.body.description,
            address: req.body.address,
            currentPage: 'add-event',
            pageTitle: 'Thêm Sự kiện Mới'
        });
    }
});

// Legacy route (để tương thích)
app.post('/add', async (req, res) => {
    req.url = '/events/add';
    app._router.handle(req, res);
});

// Trang chỉnh sửa sự kiện
app.get('/events/edit/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await eventService.getEventById(eventId);
        
        if (!event) {
            return res.redirect('/events');
        }
        
        res.render('edit-event', { 
            event: event,
            currentPage: 'events',
            pageTitle: 'Chỉnh sửa Sự kiện'
        });
    } catch (error) {
        console.error('Lỗi khi lấy thông tin sự kiện:', error);
        res.redirect('/events');
    }
});

// Legacy route (để tương thích)
app.get('/edit/:id', async (req, res) => {
    res.redirect('/events/edit/' + req.params.id);
});

// Xử lý cập nhật sự kiện
app.post('/events/edit/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        const { title, time, description, address } = req.body;
        
        if (!title || !time || !description || !address) {
            const event = await eventService.getEventById(eventId);
            return res.render('edit-event', { 
                event: event,
                error: 'Vui lòng điền đầy đủ thông tin!',
                currentPage: 'events',
                pageTitle: 'Chỉnh sửa Sự kiện'
            });
        }

        await eventService.updateEvent(eventId, { title, time, description, address });
        res.redirect('/events');
    } catch (error) {
        console.error('Lỗi khi cập nhật sự kiện:', error);
        const event = await eventService.getEventById(req.params.id);
        res.render('edit-event', { 
            event: event,
            error: 'Có lỗi xảy ra khi cập nhật sự kiện. Vui lòng thử lại.',
            currentPage: 'events',
            pageTitle: 'Chỉnh sửa Sự kiện'
        });
    }
});

// Legacy route (để tương thích)
app.post('/edit/:id', async (req, res) => {
    req.url = '/events/edit/' + req.params.id;
    app._router.handle(req, res);
});

// Xóa sự kiện
app.post('/events/delete/:id', async (req, res) => {
    try {
        const eventId = req.params.id;
        await eventService.deleteEvent(eventId);
        res.redirect('/events');
    } catch (error) {
        console.error('Lỗi khi xóa sự kiện:', error);
        res.redirect('/events');
    }
});

// Legacy route (để tương thích)
app.post('/delete/:id', async (req, res) => {
    req.url = '/events/delete/' + req.params.id;
    app._router.handle(req, res);
});

// Route cho các trang khác trong sidebar
app.get('/analytics', (req, res) => {
    res.render('analytics', {
        currentPage: 'analytics',
        pageTitle: 'Thống kê'
    });
});

app.get('/settings', (req, res) => {
    res.render('settings', {
        currentPage: 'settings',
        pageTitle: 'Cài đặt'
    });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
