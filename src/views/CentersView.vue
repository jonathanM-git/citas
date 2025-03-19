<template>
  <div class="centros-container">
    <h2>Lista de Centros</h2>

    <div v-if="centros.length > 0" class="centros-grid">
      <div v-for="centro in centros" :key="centro.name" class="centro-card">
        <h3>{{ centro.name }}</h3>
        <p>{{ centro.address }}</p>
        <button @click="obtenerCitasCentro(centro.name)" class="citas-button">
          Ver Citas
        </button>
      </div>
    </div>

    <p v-else class="empty-message">No hay centros disponibles.</p>

    <div v-if="citasCentro.length > 0" class="citas-list">
      <h3>Citas en {{ centroSeleccionado }}</h3>
      <ul>
        <li v-for="(cita, index) in citasCentro" :key="index">
          <strong>Paciente:</strong> {{ cita.username || "No disponible" }} - 
          <strong>Fecha:</strong> {{ cita.date || "No disponible" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCounterStore } from "../stores/counter";
import apiService from "../services/apiService";

const counterStore = useCounterStore();
const centros = ref([]);
const citasCentro = ref([]);//lista las citas del centro seleccionado
const centroSeleccionado = ref("");

const obtenerCentros = async () => {
  try {
    let response = await apiService.getCenters(counterStore.getToken);
    centros.value = await response.json();
  } catch (error) {
    console.error("Error obteniendo centros", error);
  }
};

const obtenerCitasCentro = async (centro) => {
  try {
    let response = await apiService.getDates(counterStore.getToken);
    if (!response.ok) throw new Error("Error obteniendo citas");

    let data = await response.json();
    citasCentro.value = data.filter((cita) => cita.center === centro);
    centroSeleccionado.value = centro;
  } catch (error) {
    console.error("Error obteniendo citas", error);
    citasCentro.value = [];
  }
};

onMounted(() => {
  obtenerCentros();
});
</script>

<style scoped>
.centros-container {
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
  font-size: 2rem;
  margin-bottom: 20px;
  text-align: center;
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
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.centro-card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1rem;
  color: gray;
}

.citas-button {
  width: 180px;
  padding: 10px;
  margin-top: 15px;
  background: #4b6cb7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s ease, transform 0.2s ease;
}

.citas-button:hover {
  background: #182848;
  transform: translateY(-2px);
}

.empty-message {
  margin-top: 20px;
  font-size: 1.2rem;
  color: #ddd;
  text-align: center;
}

.citas-list {
  margin-top: 30px;
  background: white;
  color: #333;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  max-width: 600px;
  width: 100%;
}

.citas-list h3 {
  text-align: center;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.citas-list ul {
  list-style: none;
  padding: 0;
}

.citas-list li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.citas-list li:last-child {
  border-bottom: none;
}
</style>
