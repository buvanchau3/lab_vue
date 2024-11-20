<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";

const categories = reactive([]);
const name = ref("aaa");
const selectId = ref(null);
const searchQuery = ref(""); // Thêm search query để lưu trữ từ khóa tìm kiếm
const img = ref(""); // Trường lưu trữ URL hình ảnh



// call khi ui render
onMounted(async () => {
  const reponse = await axios.get(`${API_URL}/categories`);
  if (reponse.status === 200) {
    console.log(reponse.data);
    categories.push(...reponse.data);
  }
});

// Hàm tìm kiếm
const search = () => {
  return categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
};

const handleSubmit = async () => {
  if (name.value !== "") {
    const data = {
      name: name.value,
      img: img.value
    };

    if (selectId.value) {
      const response = await axios.put(`${API_URL}/categories/${selectId.value}`, data);
      if (response.status === 200) {
        alert("Cập nhật thành công");
        console.log(response.data);
        // Cập nhật lại danh mục trong danh sách
        const index = categories.findIndex(item => item.id === selectId.value);
        if (index !== -1) {
          categories[index] = response.data;
        }
        name.value = "";
        img.value = "";
        selectId.value = null;
        resetForm();
      } 
    } else {
      const response = await axios.post(`${API_URL}/categories`, data);
      if (response.status === 201) {
        alert("Thêm thành công");
        console.log(response.data);
        categories.push(response?.data?.data);
        name.value = "";
        img.value = "";
        resetForm();
      }
    }
  }
};

const handleDelete = async (id) => {
  if (confirm("Bạn có muốn xoá không?") == true) {
    const reponse = await axios.delete(`${API_URL}/categories/${id}`);
    if (reponse.status === 200) {
      alert("Xoá thành công");
      console.log(reponse.data);
      const newCategory = categories.filter((item) => item.id !== id);
      categories.splice(0, categories.length, ...newCategory);
    }
  }
};

const handleEdit = async (item) => {
  name.value = item.name;
  img.value = item.img;
  selectId.value = item.id;
};

const resetForm = () => {
  name.value = "";
  selectId.value = null;
};
</script>

<template>
  <div class="container mt-5">
    <br>
  <div class="row">
    <!-- Phần Thêm Danh mục -->
    <div class="col-md-4 mb-4">
  <h2>Thêm Danh mục</h2>
  <form @submit.prevent="handleSubmit" class="d-flex">
    <input
      :class="{ 'is-invalid': !name }"
      type="text"
      class="form-control"
      name="name"
      v-model="name"
      placeholder="Tên danh mục"
    />
    <input
      type="text"
      class="form-control ml-3"
      name="img"
      v-model="img"
      placeholder="URL hình ảnh"
    />
    <button type="submit" class="btn btn-primary ml-3">Lưu</button>
  </form>
</div>


    <!-- Phần Danh mục Sản phẩm -->
    <div class="col-md-8">
  <h2>Danh mục sản phẩm</h2>

  <!-- Ô tìm kiếm -->
  <input 
    v-model="searchQuery"
    type="text"
    class="form-control mb-3"
    placeholder="Tìm kiếm danh mục..."
  />

  <!-- Bảng danh mục sản phẩm -->
  <table class="table table-bordered">
    <thead>
      <tr>
        <th>Tên danh mục</th>
        <th>Hình ảnh</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in search()" :key="item.id">
        <td>{{ item.name }}</td>
        <td>
          <img :src="item.img" :alt="item.name" class="img-thumbnail" width="50" height="50" v-if="item.img" />
        </td>
        <td>
          <button @click="handleDelete(item.id)" class="btn btn-danger btn-sm ml-3">
            Xoá
          </button>
          <button @click="handleEdit(item)" class="btn btn-info btn-sm ml-3">
            Sửa
          </button>
          <router-link :to="`/categories/${item.id}`"> Hiển thị </router-link>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  </div>
</div>

</template>

<style scoped>
/* Toàn bộ bố cục */
.container {
  margin: 0 auto;
  padding: 20px;
  max-width: 800px;
  font-family: Arial, Helvetica, sans-serif;
  color: #333;
}

img {
  max-width: 50px;
  max-height: 50px;
  object-fit: cover;
  margin-left: 10px;
}


/* Tiêu đề */
h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* Form thêm danh mục */
form {
  display: flex;
  gap: 10px;
}

form input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

form input:focus {
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  outline: none;
}

form button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-size: 14px;
  cursor: pointer;
}

form button:hover {
  background-color: #0056b3;
}

/* Phần danh mục sản phẩm */
ul.list-group {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
}

.list-group-item:hover {
  background-color: #f1f1f1;
}

.list-group-item span {
  font-size: 16px;
}

.list-group-item button {
  padding: 5px 10px;
  font-size: 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.list-group-item button.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

.list-group-item button.btn-danger:hover {
  background-color: #c82333;
}

.list-group-item button.btn-info {
  background-color: #17a2b8;
  color: #fff;
}

.list-group-item button.btn-info:hover {
  background-color: #138496;
}

/* Input tìm kiếm */
input[type="text"] {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 15px;
}

input[type="text"]:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Khoảng cách giữa các nút */
.ml-3 {
  margin-left: 10px;
}
</style>
