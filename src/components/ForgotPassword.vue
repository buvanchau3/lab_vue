<template>
    <div>
      <form @submit.prevent="sendResetLink">
        <input v-model="email" type="email" placeholder="Enter your email" required />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        email: ''
      };
    },
    methods: {
      async sendResetLink() {
        try {
          await axios.post('/forgot-password', {
            email: this.email
          });
          alert('Password reset link sent!');
        } catch (error) {
          console.error('Failed to send reset link', error);
        }
      }
    }
  };
  </script>
  