
<script setup>
import { reactive, ref } from 'vue';

// Khởi tạo đối tượng user
const user = reactive({
  name: '',
  password: ''
});


const isLogin = ref(false);
const isSubmit = ref(false);


const handleSubmit = () => {
  isSubmit.value = true; 
  if (user.name === 'admin' && user.password === '123456') {
    isLogin.value = true; 
  } else {
    
  
    isLogin.value = false; // Đăng nhập thất bại
  }
}
</script>

<template setup>
  
   
  <div id="info" style="display: flex; margin-top: 100px;">
    
    
   
    <div class="img">
      <img style="width: 200px; height: 200px; margin-top: 40px; padding: 20px;" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="avatar">
    </div>
    <form @submit.prevent="handleSubmit">
      <h1>LOGIN</h1>
      <input type="text" v-model="user.name" placeholder="Enter name" required>
      <input type="password" v-model="user.password" placeholder="Enter password" required>
      <button type="submit">Submit</button>
    </form>

    <span class="control-susess" v-if="isLogin" :key="isLogin">Đăng nhập thành công</span>
    <span class="control-changer" v-if="!isLogin && isSubmit" :key="isSubmit">Đăng nhập thất bại</span>

  </div>
</template>


<style scoped>
#info {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #cce7ff; /* Xanh nhạt */

}

h1 {
  text-align: center;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 105%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
.control-susess {
  color: green;
  font-weight: bold;
}

.control-changer {
  color: red;
  font-weight: bold;
}

.control-primary{
  color: yellow;
}



</style>
