<template>
    <div class="citas-container">
      <h2>Mis Citas</h2>
  
      <button @click="getCitas" class="citas-button">Actualizar Citas</button>
  
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  
      <div v-if="citas.length > 0" class="citas-grid">
        <div v-for="cita in citas" :key="cita.date" class="cita-card">
          <h3>{{ cita.center }}</h3>
          <p><strong>Fecha:</strong> {{ cita.date }}</p>
        </div>
      </div>
      <p v-else class="empty-message">No tienes citas programadas.</p>
  
      <!-- Formulario para crear cita -->
      <div class="crear-cita">
        <h3>Crear Nueva Cita</h3>
        <input type="text" v-model="nuevoCentro" placeholder="Nombre del Centro" />
        <input type="text" v-model="nuevaFecha" placeholder="DD/MM/YYYY HH:00:00" />
        <button @click="crearNuevaCita" class="citas-button">Agendar Cita</button>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // Variables reactivas
  const citas = ref([]);
  const errorMessage = ref("");
  const successMessage = ref("");
  const nuevoCentro = ref("");
  const nuevaFecha = ref("");
  const token = ref(localStorage.getItem('userToken') || '');
  
  // Obtener citas del usuario autenticado
  const getCitas = async () => {
    try {
      let response = await fetch("http://127.0.0.1:5000/date/getByUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        }
      });
  
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
  
      citas.value = await response.json(); // Guardamos las citas en la variable
      errorMessage.value = "";
  
    } catch (error) {
      errorMessage.value = "Error al obtener citas";
      console.error("Error:", error);
    }
  };
  
  // Crear una nueva cita
  const crearNuevaCita = async () => {
    try {
      let response = await fetch("http://127.0.0.1:5000/date/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token.value
        },
        body: JSON.stringify({ center: nuevoCentro.value, date: nuevaFecha.value })
      });
  
      let data = await response.json();
      if (!response.ok) {
        throw new Error(data.msg || "Error al crear cita");
      }
  
      successMessage.value = "Cita creada correctamente";
      nuevoCentro.value = "";
      nuevaFecha.value = "";
  
      // Refrescar citas después de crear una nueva
      await getCitas();
  
    } catch (error) {
      successMessage.value = error.message;
    }
  };
  
  // Cargar citas al montar el componente
  onMounted(() => {
    getCitas();
  });
  </script>
  
  <style scoped>
  .citas-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background: linear-gradient(to right, #4b6cb7, #182848);
    color: white;
    padding: 20px;
  }
  
  h2, h3 {
    margin-bottom: 15px;
  }
  
  .citas-button {
    width: 200px;
    padding: 10px;
    margin: 10px;
    background: #4b6cb7;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.3s;
  }
  
  .citas-button:hover {
    background: #182848;
  }
  
  .error-message {
    color: #ff6961;
    font-size: 1.2rem;
    margin-top: 10px;
  }
  
  .success-message {
    color: #5cd85c;
    font-size: 1.2rem;
    margin-top: 10px;
  }
  
  .empty-message {
    margin-top: 20px;
    font-size: 1.2rem;
    color: #ddd;
  }
  
  .citas-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    width: 100%;
    max-width: 800px;
    margin-top: 20px;
  }
  
  .cita-card {
    background: white;
    color: #333;
    padding: 15px;
    border-radius: 10px;
    text-align: center;
  }
  </style>
  