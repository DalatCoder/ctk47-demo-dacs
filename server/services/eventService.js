// services/eventService.js
const { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} = require('firebase/firestore');
const { db } = require('../config/firebase');

class EventService {
  constructor() {
    this.collectionName = 'events';
    this.eventsRef = collection(db, this.collectionName);
  }

  // Lấy tất cả sự kiện
  async getAllEvents() {
    try {
      const q = query(this.eventsRef, orderBy('time', 'asc'));
      const querySnapshot = await getDocs(q);
      const events = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        events.push({
          id: doc.id,
          ...data,
          // Chuyển đổi Timestamp thành string để hiển thị
          time: data.time instanceof Timestamp ? data.time.toDate().toISOString().slice(0, 16) : data.time
        });
      });
      
      return events;
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sự kiện:', error);
      throw error;
    }
  }

  // Lấy một sự kiện theo ID
  async getEventById(eventId) {
    try {
      const docRef = doc(db, this.collectionName, eventId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          // Chuyển đổi Timestamp thành string để hiển thị
          time: data.time instanceof Timestamp ? data.time.toDate().toISOString().slice(0, 16) : data.time
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Lỗi khi lấy sự kiện:', error);
      throw error;
    }
  }

  // Thêm sự kiện mới
  async createEvent(eventData) {
    try {
      const { title, time, description, address } = eventData;
      
      // Chuyển đổi string time thành Timestamp
      const eventTime = new Date(time);
      
      const newEvent = {
        title: title.trim(),
        time: Timestamp.fromDate(eventTime),
        description: description.trim(),
        address: address.trim(),
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      const docRef = await addDoc(this.eventsRef, newEvent);
      console.log('✅ Sự kiện đã được tạo với ID:', docRef.id);
      
      return {
        id: docRef.id,
        ...newEvent,
        time: time // Trả về time dưới dạng string để hiển thị
      };
    } catch (error) {
      console.error('Lỗi khi tạo sự kiện:', error);
      throw error;
    }
  }

  // Cập nhật sự kiện
  async updateEvent(eventId, eventData) {
    try {
      const { title, time, description, address } = eventData;
      
      // Chuyển đổi string time thành Timestamp
      const eventTime = new Date(time);
      
      const updatedEvent = {
        title: title.trim(),
        time: Timestamp.fromDate(eventTime),
        description: description.trim(),
        address: address.trim(),
        updatedAt: Timestamp.now()
      };

      const docRef = doc(db, this.collectionName, eventId);
      await updateDoc(docRef, updatedEvent);
      
      console.log('✅ Sự kiện đã được cập nhật:', eventId);
      return true;
    } catch (error) {
      console.error('Lỗi khi cập nhật sự kiện:', error);
      throw error;
    }
  }

  // Xóa sự kiện
  async deleteEvent(eventId) {
    try {
      const docRef = doc(db, this.collectionName, eventId);
      await deleteDoc(docRef);
      
      console.log('✅ Sự kiện đã được xóa:', eventId);
      return true;
    } catch (error) {
      console.error('Lỗi khi xóa sự kiện:', error);
      throw error;
    }
  }

  // Kiểm tra kết nối Firebase
  async testConnection() {
    try {
      const querySnapshot = await getDocs(this.eventsRef);
      console.log('✅ Kết nối Firebase thành công. Số lượng sự kiện:', querySnapshot.size);
      return true;
    } catch (error) {
      console.error('❌ Lỗi kết nối Firebase:', error);
      return false;
    }
  }
}

module.exports = new EventService();
