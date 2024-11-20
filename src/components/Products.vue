<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";

// Khởi tạo các state cho sản phẩm và trường nhập liệu
const products = reactive([]);
const newProduct = reactive({
  name: "",
  description: "",
  price: "",
  image: "",
  category_id: "",
});
const categories = ref([]);
const searchQuery = ref("");

// Gọi API để lấy danh sách sản phẩm và danh mục khi trang được tải
onMounted(async () => {
  await fetchProducts();
  await fetchCategories();
});

const search = () => {
 return products.filter((product) => product.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
}

const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  if (response.status === 200) {
    products.splice(0, products.length, ...response.data);
  }
};

const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  if (response.status === 200) {
    categories.value = response.data;
  }
};



const handleSubmit = async () => {
  // Gửi dữ liệu sản phẩm mới lên server để lưu
  const response = await axios.post(`${API_URL}/products`, newProduct);
  if (response.status === 201) {
    alert("Sản phẩm được thêm thành công");
    products.push(response.data.data);
    resetForm();
  }
};

const handleDelete = async (id) => {
  if (confirm("Bạn có chắc muốn xoá sản phẩm này?")) {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    if (response.status === 200) {
      alert("Sản phẩm đã được xoá thành công");
      const index = products.findIndex((product) => product.id === id);
      products.splice(index, 1);
    }
  }
};

const handleEdit = (product) => {
  // Copy dữ liệu sản phẩm để sửa
  Object.assign(newProduct, product);
};

const handleUpdate = async () => {
  const response = await axios.put(`${API_URL}/products/${newProduct.id}`, newProduct);
  if (response.status === 200) {
    alert("Cập nhật sản phẩm thành công");
    const index = products.findIndex((product) => product.id === newProduct.id);
    products[index] = { ...newProduct };
    resetForm();
  }
};

const resetForm = () => {
  newProduct.name = "";
  newProduct.description = "";
  newProduct.price = "";
  newProduct.image = "";
  newProduct.category_id = "";
};
</script>

<template>
  <br>
  <br>
  <div class="container py-5">
    <div class="row" >
      <div class="mb-3">
        <h2>Thêm sản phẩm</h2>
        <form @submit.prevent="newProduct.id ? handleUpdate() : handleSubmit()" class="d-flex flex-column">
          <input type="text" v-model="newProduct.name" class="form-control mb-2" placeholder="Tên sản phẩm" required />
          <textarea v-model="newProduct.description" class="form-control mb-2" placeholder="Mô tả sản phẩm"></textarea>
          <input type="number" v-model="newProduct.price" class="form-control mb-2" placeholder="Giá sản phẩm" required />
          <input type="text" v-model="newProduct.img" class="form-control mb-2" placeholder="Link ảnh" />
          <select v-model="newProduct.category_id" class="form-control mb-2" required>
            <option value="" disabled>Chọn danh mục</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
          <button class="btn btn-primary">{{ newProduct.id ? "Cập nhật" : "Lưu" }}</button>
        </form>
      </div>
      <div class="mb-3">
        <h2>Danh sách sản phẩm</h2>
        <input
  type="text"
  v-model="searchQuery"
  class="form-control mb-3"
  placeholder="Tìm kiếm Sản phẩm..."
/>
<br />

<!-- Table to display products -->
<table class="table" border="1">
  <thead>
    <tr>
      <th>Tên sản phẩm</th>
      <th>Hiển thị ảnh</th>
      <th>Mô tả</th>
      <th>Giá</th>
      <th>Thao tác</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in search()" :key="product.id">
      <td>{{ product.name }}</td>
      <td>
        <img :src="product.img" alt="Product Image" width="100" height="100" />
      </td>
      <td>{{ product.description }}</td>
      <td>{{ product.price }} VND</td>
      <td>
        <button @click="handleEdit(product)" class="btn btn-info btn-sm mr-2">
          Sửa
        </button>
        <button @click="handleDelete(product.id)" class="btn btn-danger btn-sm">
          Xóa
        </button>
      </td>
    </tr>
  </tbody>
</table>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Căn chỉnh tổng thể */
.container {
  margin: 0 auto;
  max-width: 1200px; /* Giới hạn độ rộng tối đa */
  padding: 20px;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
}

/* Tiêu đề */
h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Form thêm sản phẩm */
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
}

form input, 
form textarea, 
form select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

form input:focus, 
form textarea:focus, 
form select:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

form button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
}

form button:hover {
  background-color: #0056b3;
}

/* Bảng danh sách sản phẩm */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size: 14px;
}

table th, 
table td {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
}

table th {
  background-color: #f8f9fa;
  font-weight: bold;
}

table tr:nth-child(even) {
  background-color: #f9f9f9;
}

table tr:hover {
  background-color: #f1f1f1;
}

table img {
  border-radius: 5px;
  object-fit: cover;
}

/* Nút thao tác */
button {
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button.btn-info {
  background-color: #17a2b8;
  color: #fff;
}

button.btn-info:hover {
  background-color: #138496;
}

button.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

button.btn-danger:hover {
  background-color: #c82333;
}

/* Ô tìm kiếm */
input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 20px;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
