<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      
      <input type="text" placeholder="Usuario" v-model="username" class="input-field" />
      <input type="password" placeholder="Contraseña" v-model="password" class="input-field" />

      <button @click="sendLogin" class="login-button">Acceder</button>
      <router-link to="/registro" class="register-link">Regístrate aquí</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';
import Swal from 'sweetalert2';

const router = useRouter();
const counterStore = useCounterStore();
const username = ref("");
const password = ref("");

const sendLogin = async () => {
  try {
    let response = await apiService.loginUser({
      username: username.value,
      password: password.value
    });

    let data = await response.json();

    if (data["access_token"]) {
      counterStore.setToken(data["access_token"]);
      Swal.fire({
        title: "¡Acceso exitoso!",
        text: "Redirigiendo...",
        icon: "success",
        timer: 1500,
        showConfirmButton: false
      });

      setTimeout(() => {
        router.push('/menu');
      }, 1500);
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error"
      });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al iniciar sesión",
      icon: "error"
    });
  }
};
</script>
