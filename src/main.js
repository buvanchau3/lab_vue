// Import file CSS chính và các thư viện cần thiết
// import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
// // Import CSS của Bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Sử dụng bundle để hỗ trợ Popper.js

// Import router
import router from './route';

// Tạo ứng dụng Vue và sử dụng router
createApp(App).use(router).mount('#app');
