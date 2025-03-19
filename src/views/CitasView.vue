<template>
  <div class="citas-container animate__animated animate__fadeIn">
    <h2>Gestión de Citas</h2>

    <div class="form-group">
      <label for="centro">Selecciona un Centro:</label>
      <select v-model="selectedCenter" id="centro" class="custom-select">
        <option v-for="centro in centros" :key="centro.name" :value="centro.name">
          {{ centro.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="fecha">Selecciona una Fecha:</label>
      <input type="date" v-model="selectedDate" id="fecha" class="custom-input" />
    </div>

    <div class="buttons">
      <button @click="crearCita" class="citas-button animate__animated animate__zoomIn">
        <img src="../assets/img/Centros.png" alt="Crear" class="icon" />
        Crear Cita
      </button>
      <button @click="obtenerCitas" class="citas-button animate__animated animate__zoomIn">
        <img src="../assets/img/Centros.png" alt="Actualizar" class="icon" />
        Actualizar Citas
      </button>
    </div>

    <p v-if="errorMessage" class="error-message animate__animated animate__shakeX">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message animate__animated animate__bounceIn">{{ successMessage }}</p>

    <div v-if="citas.length > 0" class="citas-grid">
      <div v-for="cita in citas" :key="cita.date" class="cita-card animate__animated animate__fadeInUp">
        <p><strong>Centro:</strong> {{ cita.center }}</p>
        <p><strong>Fecha:</strong> {{ cita.date }}</p>
        <button @click="cancelarCita(cita)" class="cancel-button">
          <img src="../assets/img/CancelarCita.webp" alt="Cancelar" class="icon" />
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';

const counterStore = useCounterStore();
const centros = ref([]);
const citas = ref([]);
const selectedCenter = ref('');
const selectedDate = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const obtenerCentros = async () => {
  try {
    let response = await apiService.getCenters(counterStore.getToken);
    centros.value = await response.json();
  } catch (error) {
    console.error("Error obteniendo centros", error);
  }
};

const obtenerCitas = async () => {
  try {
    let response = await apiService.getUserDates(counterStore.getToken);
    citas.value = await response.json();
  } catch (error) {
    console.error("Error obteniendo citas", error);
  }
};

const crearCita = async () => {
  if (!selectedCenter.value || !selectedDate.value) {
    errorMessage.value = "Debes seleccionar un centro y una fecha";
    return;
  }

  let formattedDate = selectedDate.value.split('-').reverse().join('/') + " 14:00:00";
  try {
    let response = await apiService.createDate(counterStore.getToken, selectedCenter.value, formattedDate);
    let result = await response.json();
    if (response.ok) {
      // Reemplazamos el mensaje original por uno más claro en español
      successMessage.value = "Cita creada con éxito";
      obtenerCitas();
    } else {
      // Si el mensaje indica que la fecha ya está ocupada, lo traducimos
      errorMessage.value = result.msg.includes("Date and hour already taken") 
        ? "Cita ocupada" 
        : result.msg;
    }
  } catch (error) {
    errorMessage.value = "Error al crear cita";
  }
};

const cancelarCita = async (cita) => {
  try {
    let response = await apiService.cancelDate(counterStore.getToken, cita.center, cita.date);
    let result = await response.json();
    if (response.ok) {
      successMessage.value = result.msg;
      obtenerCitas();
    } else {
      errorMessage.value = result.msg;
    }
  } catch (error) {
    errorMessage.value = "Error al cancelar cita";
  }
};

onMounted(() => {
  obtenerCentros();
  obtenerCitas();
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

h2 {
  font-size: 2.2rem;
  margin-bottom: 20px;
}

.form-group {
  width: 100%;
  max-width: 400px;
  margin: 10px 0;
  text-align: left;
}

label {
  font-size: 1.1rem;
  font-weight: bold;
}

.custom-select, .custom-input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.custom-select {
  background-color: white;
  color: #333;
}

.custom-input {
  background-color: #f9f9f9;
}

.buttons {
  display: flex;
  gap: 15px;
  margin: 20px 0;
}

.citas-button, .cancel-button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 220px;
  padding: 12px;
  background: #4b6cb7;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  margin: auto;
}

.citas-button:hover, .cancel-button:hover {
  background: #182848;
  transform: scale(1.05);
}

.icon {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  flex-shrink: 0;
}

.cancel-button {
  background-color: #ff6961;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-message {
  color: #ff6961;
  font-size: 1.2rem;
  margin-top: 10px;
}

.success-message {
  color: #4CAF50;
  font-size: 1.2rem;
  margin-top: 10px;
}
</style>
