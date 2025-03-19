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
  import { useCounterStore } from '../stores/counter';  // Importamos la tienda de Pinia
  const router = useRouter();

  // Usamos la tienda de Pinia
  const counterStore = useCounterStore();

  const username = ref("");
  const password = ref("");
  const message = ref("");
  const isSuccess = ref(false);

  const login = async () => {
    let response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value
      }),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });

    return await response.json();
  };

  const getCenters = async () => {
    let response = await fetch("http://127.0.0.1:5000/centers", {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + counterStore.getToken // Usamos el token de Pinia
      }
    });

    let data = await response.json();
    return data;
  };

  const sendLogin = async () => {
    let response = await login();

    if (response["access_token"]) {
      counterStore.setToken(response["access_token"]); // Guardamos el token usando Pinia
      message.value = "Acceso exitoso";
      isSuccess.value = true;

      // Mostrar el token en la consola
      console.log("Token recibido:", response["access_token"]);

      // Obtener y mostrar los centros en la consola
      let centers = await getCenters();
      console.log("Centros recibidos:", centers);

      // Redirigir a la página "Citas"
      setTimeout(() => {
        router.push('/menu');
      }, 1000);

    } else {
      message.value = "Usuario o contraseña incorrectos";
      isSuccess.value = false;
    }
  };

</script>
