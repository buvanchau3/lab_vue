<script setup>
import HelloWorld from './components/HelloWorld.vue';
import Login from './components/Login.vue';
import ProductList from './components/ProductList.vue';
import CategoryList from './components/CategoryList.vue';
import Products from './components/Products.vue';
import Register from './components/Register.vue';
</script>

<template>
  <nav class="navbar">
    <div class="navbar-container">
      <a class="navbar-brand" href="#">Beautiful</a>
      <div class="navbar-toggle" @click="toggleMenu">
        ☰
      </div>
      <ul class="navbar-menu" :class="{ 'show': isMenuOpen }">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/categories">Categories</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products">Products</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <router-view></router-view>
</template>

<script>
import { ref } from 'vue';
const isMenuOpen = ref(false);
function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<style>
.navbar {
  background-color: #f8f9fa;
  padding: 10px 20px;
  position: fixed;
  top: 0;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 100px;
}

.navbar-brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.navbar-menu {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin-left: 20px;
}

.nav-link {
  text-decoration: none;
  font-size: 1rem;
  color: #555;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #007bff;
}

.navbar-toggle {
  display: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.navbar-menu.show {
  display: flex;
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar-menu {
    display: none;
    flex-direction: column;
    background-color: #f8f9fa;
    position: absolute;
    top: 60px;
    right: 0;
    width: 200px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .navbar-toggle {
    display: block;
  }

  .nav-item {
    margin: 10px 0;
    text-align: center;
  }
}
</style>
