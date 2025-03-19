<template>
  <div class="register-container">
    <div class="register-box">
      <h2>Registro</h2>

      <input type="text" placeholder="Usuario" v-model="username" class="input-field" />
      <input type="password" placeholder="Contraseña" v-model="password" class="input-field" />
      <input type="text" placeholder="Nombre" v-model="name" class="input-field" />
      <input type="text" placeholder="Apellido" v-model="lastname" class="input-field" />
      <input type="email" placeholder="Correo electrónico" v-model="email" class="input-field" />
      <input type="text" placeholder="Teléfono" v-model="phone" class="input-field" />
      <input type="text" placeholder="Fecha de nacimiento (DD/MM/YYYY)" v-model="date" class="input-field" />
      
      <button @click="registerUser" class="register-button">Registrarse</button>
      <router-link to="/" class="login-link">Volver al login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';
import Swal from 'sweetalert2';
import { useRouter } from "vue-router"; // Importa useRouter

const router = useRouter();

const counterStore = useCounterStore();
const username = ref("");
const password = ref("");
const name = ref("");
const lastname = ref("");
const email = ref("");
const phone = ref("");
const date = ref("");


const registerUser = async () => {
  try {
    let response = await apiService.registerUser({
      username: username.value,
      password: password.value,
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      date: date.value
    });

    let data = await response.json();
    if (data.msg === "user created") {
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Usuario registrado correctamente",
        icon: "success",
        confirmButtonText: "OK"
      });

      if (data.access_token) {
        counterStore.setToken(data.access_token);
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Error al registrarse",
        icon: "error"
      });
    }
  } catch (error) {
    console.error("Error al registrarse:", error);
    Swal.fire({
      title: "Error",
      text: "Hubo un problema con el registro",
      icon: "error"
    });
  }
};
</script>