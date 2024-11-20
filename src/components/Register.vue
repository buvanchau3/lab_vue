<template>
  <div>
    <form @submit.prevent="register">
      <input v-model="name" type="text" placeholder="Name" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await axios.post('/register', {
          name: this.name,
          email: this.email,
          password: this.password
        });
        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Registration failed', error);
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;  /* Căn giữa theo chiều ngang */
  align-items: center;      /* Căn giữa theo chiều dọc */
  height: 100vh;            /* Chiều cao toàn màn hình */
  flex-direction: column;   /* Để các phần tử trong container xếp theo chiều dọc */
}

form {
  width: 100%;
  max-width: 400px;         /* Giới hạn chiều rộng của form */
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1rem;
}

button {
  width: 100%;
}
</style>
