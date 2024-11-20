<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";

const name = ref();
const categories = reactive([]);
const categoryDetail = reactive(null);
const selectId = ref(null);
const searchQuery = ref("");

onMounted(async () => {
  const response = await axios.get(`${API_URL}/categories/`);
  if (response.status === 200) {
    categories.push(...response.data);
  }
});
</script>

<template>
    <body style="margin-top: 50px; width: 600px; margin: auto;">
      <h2>Danh mục sản phẩm</h2>
  
      <!-- Form nhập liệu -->
      <form class="form">
        <div class="form-group">
          <label for="name">Tên danh mục:</label>
          <input id="name" type="text" class="form-control" placeholder="Nhập tên danh mục" />
        </div>
        <div class="form-group">
          <label for="search">Tìm kiếm:</label>
          <input id="search" type="text" class="form-control" placeholder="Nhập từ khóa tìm kiếm" />
        </div>
        <button type="submit" class="btn-submit">Thêm</button>
      </form>
  
      <!-- Bảng danh mục -->
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>HÀNH ĐỘNG</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(category, index) in categories" :key="category.id">
            <td>{{ index + 1 }}</td>
            <td>{{ category.name }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </body>
  </template>
  
  <style>
  /* Phông chữ chung */
  body {
    font-family: Arial, sans-serif;
    color: #333;
  }
  
  /* Tiêu đề */
  h2 {
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  /* Form */
  .form {
    margin-bottom: 30px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    font-size: 14px;
    margin-bottom: 5px;
    color: #555;
  }
  
  .form-control {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease;
  }
  
  .form-control:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
  
  .btn-submit {
    display: block;
    width: 100%;
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-submit:hover {
    background-color: #0056b3;
  }
  
  /* Bảng */
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .table th,
  .table td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  .table thead tr {
    background-color: #f4f4f4;
    font-weight: bold;
  }
  
  .table tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  
  .table tbody tr:nth-child(even) {
    background-color: #ffffff;
  }
  
  .table tbody tr:hover {
    background-color: #f1f1f1;
  }
  </style>
  