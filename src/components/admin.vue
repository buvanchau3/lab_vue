<template>
    <div class="admin-page">
      <h1>Chào mừng đến với Giao Diện Quản Trị Viên</h1>
      <p>Đây là trang dành cho người quản trị.</p>
      <div>
        <button @click="goToUserManagement">Quản lý người dùng</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
//   const goToUserManagement = () => {
//     router.push({ name: 'user-management' }); // Điều hướng tới trang quản lý người dùng (nếu có)
//   };
  </script>
  
  <style scoped>
  .admin-page {
    text-align: center;
    margin-top: 50px;
  }
  </style>
  