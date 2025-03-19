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
      <p v-if="message" :class="{'success': isSuccess, 'error': !isSuccess}">
        {{ message }}
      </p>

      <router-link to="/" class="login-link">Volver al login</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useCounterStore } from '../stores/counter';  // Importamos la tienda de Pinia

const counterStore = useCounterStore(); // Usamos la tienda de Pinia para gestionar el token

const username = ref("");
const password = ref("");
const name = ref("");
const lastname = ref("");
const email = ref("");
const phone = ref("");
const date = ref("");
const message = ref("");
const isSuccess = ref(false);

const registerUser = async () => {
  let response = await fetch("http://127.0.0.1:5000/register", {
    method: "POST",
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      name: name.value,
      lastname: lastname.value,
      email: email.value,
      phone: phone.value,
      date: date.value
    }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  let data = await response.json();

  if (data.msg === "user created") {
    message.value = "Usuario registrado con éxito";
    isSuccess.value = true;

    // En este caso, puedes registrar el token en Pinia si se devuelve al registrar
    if (data.access_token) {
      counterStore.setToken(data.access_token); // Guardamos el token en la tienda
      console.log("Token guardado:", data.access_token);
    }
  } else {
    message.value = "Error al registrarse";
    isSuccess.value = false;
  }
};
</script>
