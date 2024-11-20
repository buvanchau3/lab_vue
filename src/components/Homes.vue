<script setup>
import { reactive, ref, onMounted } from "vue";
import axios from "axios";
import { API_URL } from "../const.js";

const categories = reactive([]); // Danh sách danh mục
const products = reactive([]);   // Danh sách sản phẩm

// Gọi API khi giao diện được tải
onMounted(async () => {
  await fetchCategories(); // Lấy danh mục
  await fetchProducts();   // Lấy sản phẩm
});

// Lấy danh mục từ API
const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`);
  if (response.status === 200) {
    categories.push(...response.data);
  }
};

// Lấy sản phẩm từ API
const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  if (response.status === 200) {
    products.push(...response.data);
  }
};
</script>



    <template>
  <div class="container py-5">
    <h2 class="mb-4">Danh mục sản phẩm</h2>

    <!-- Hiển thị danh mục -->
    <div class="row">
      <div
        class="col-md-4"
        v-for="category in categories"
        :key="category.id"
      >
        <div class="card mb-3">
          <img
            :src="category.img"
            class="card-img-top"
            alt="Hình ảnh danh mục"
          />
          <div class="card-body text-center">
            <h5 class="card-title">{{ category.name }}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
 

  <h2 class="mb-4 mt-5">Danh sách sản phẩm</h2>
    <div class="row">
      <div
        class="col-md-3 col-sm-6 col-12"
        v-for="product in products"
        :key="product.id"
      >
        <div class="card mb-3">
          <img
            class="card-img-top" 
            :src="product.img"
            alt="Hình ảnh sản phẩm"
            style="width: 300px; object-fit: cover;"
          />
          <div class="card-body text-center">
            <h4 class="card-title">{{ product.name }}</h4>
            <p class="card-text">Giá: {{ product.price }} VND</p>
            <button class="btn btn-primary">Mua</button>
          </div>
        </div>
      </div>
    </div>

 
</template>


<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 60px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 100%;
  max-width: 300px;
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 350px;
  object-fit: cover;
}

.card-body {
  background-color: #f8f9fa;
  padding: 20px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  color: #333;
  margin-bottom: 0;
}

</style>
