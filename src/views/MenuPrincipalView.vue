<template>
  <div class="citas-container">
    <h2>Gestión de Citas</h2>

    <button @click="accederPerfil" class="citas-button">Acceder al Perfil</button>
    <button @click="obtenerCentros" class="citas-button">Obtener Todos los Centros</button>
    <button @click="crearCita" class="citas-button">Crear una Cita</button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <div v-if="centros.length > 0" class="centros-grid">
      <div v-for="centro in centros" :key="centro.name" class="centro-card">
        <h3>{{ centro.name }}</h3>
        <p>{{ centro.address }}</p>
      </div>
    </div>

    <p v-else class="empty-message">No hay centros disponibles.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';

const router = useRouter();
const counterStore = useCounterStore();

const errorMessage = ref("");
const centros = ref([]);

const accederPerfil = () => {
  router.push('/perfil');
};

const crearCita = () => {
  router.push('/citas');
};

const obtenerCentros = async () => {
  try {
    let response = await fetch("http://127.0.0.1:5000/centers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + counterStore.getToken
      }
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud: " + response.status);
    }

    let data = await response.json();
    centros.value = data; // Guardamos los centros en la lista
    errorMessage.value = "";

  } catch (error) {
    errorMessage.value = "Error al obtener centros";
    console.error("Error:", error);
  }
};
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

h2 {
  margin-bottom: 20px;
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

.empty-message {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #ddd;
}

.centros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
}

.centro-card {
  background: white;
  color: #333;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.centro-card h3 {
  font-size: 1.2rem;
  font-weight: bold;
}

.centro-card p {
  font-size: 1rem;
  color: gray;
}
</style>
