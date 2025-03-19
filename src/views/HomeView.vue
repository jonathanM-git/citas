<template>
  <div class="login-container">
    <div class="login-box">
      <h2>Iniciar Sesión</h2>
      
      <input type="text" placeholder="Usuario" v-model="username" class="input-field" />
      <input type="password" placeholder="Contraseña" v-model="password" class="input-field" />

      <button @click="sendLogin" class="login-button">Acceder</button>
      <p v-if="message" :class="{'success': isSuccess, 'error': !isSuccess}">
        {{ message }}
      </p>

      <router-link to="/registro" class="register-link">Regístrate aquí</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';

const router = useRouter();
const counterStore = useCounterStore();
const username = ref("");
const password = ref("");
const message = ref("");
const isSuccess = ref(false);

const sendLogin = async () => {
  try {
    let response = await apiService.loginUser({
      username: username.value,
      password: password.value
    });

    let data = await response.json();

    if (data["access_token"]) {
      counterStore.setToken(data["access_token"]);
      message.value = "Acceso exitoso";
      isSuccess.value = true;

      console.log("Token recibido:", data["access_token"]);

      setTimeout(() => {
        router.push('/menu');
      }, 1000);
    } else {
      message.value = "Usuario o contraseña incorrectos";
      isSuccess.value = false;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    message.value = "Error al iniciar sesión";
    isSuccess.value = false;
  }
};
</script>


