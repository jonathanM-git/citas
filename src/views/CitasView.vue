<template>
  <div class="citas-container">
    <h2>Gestión de Citas</h2>
    
    <label for="centro">Selecciona un Centro:</label>
    <select v-model="selectedCenter" id="centro">
      <option v-for="centro in centros" :key="centro.name" :value="centro.name">
        {{ centro.name }}
      </option>
    </select>

    <label for="fecha">Selecciona una Fecha:</label>
    <input type="date" v-model="selectedDate" id="fecha" />
    
    <button @click="crearCita" class="citas-button">Crear Cita</button>
    <button @click="obtenerCitas" class="citas-button">Actualizar Citas</button>
    
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <div v-if="citas.length > 0" class="citas-grid">
      <div v-for="cita in citas" :key="cita.date" class="cita-card">
        <p><strong>Centro:</strong> {{ cita.center }}</p>
        <p><strong>Fecha:</strong> {{ cita.date }}</p>
        <button @click="cancelarCita(cita)" class="cancel-button">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '../stores/counter';

const counterStore = useCounterStore();
const centros = ref([]);
const citas = ref([]);
const selectedCenter = ref('');
const selectedDate = ref('');
const errorMessage = ref('');
const successMessage = ref('');

const obtenerCentros = async () => {
  try {
    let response = await fetch("http://127.0.0.1:5000/centers", {
      headers: {
        "Authorization": "Bearer " + counterStore.getToken
      }
    });
    centros.value = await response.json();
  } catch (error) {
    console.error("Error obteniendo centros", error);
  }
};

const crearCita = async () => {
  if (!selectedCenter.value || !selectedDate.value) {
    errorMessage.value = "Debes seleccionar un centro y una fecha";
    return;
  }

  let formattedDate = selectedDate.value.split('-').reverse().join('/') + " 14:00:00";
  try {
    let response = await fetch("http://127.0.0.1:5000/date/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + counterStore.getToken
      },
      body: JSON.stringify({
        center: selectedCenter.value,
        date: formattedDate
      })
    });
    let result = await response.json();
    if (response.ok) {
      successMessage.value = result.msg;
      obtenerCitas();
    } else {
      errorMessage.value = result.msg;
    }
  } catch (error) {
    errorMessage.value = "Error al crear cita";
  }
};

const obtenerCitas = async () => {
  try {
    let response = await fetch("http://127.0.0.1:5000/date/getByUser", {
      headers: {
        "Authorization": "Bearer " + counterStore.getToken
      }
    });
    citas.value = await response.json();
  } catch (error) {
    console.error("Error obteniendo citas", error);
  }
};

const cancelarCita = async (cita) => {
  try {
    let response = await fetch("http://127.0.0.1:5000/date/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + counterStore.getToken
      },
      body: JSON.stringify({
        center: cita.center,
        date: cita.date
      })
    });
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
  max-width: 600px;
  margin: auto;
  text-align: center;
}
.citas-button, .cancel-button {
  margin: 10px;
  padding: 10px;
  cursor: pointer;
}
.cancel-button {
  background-color: red;
  color: white;
  border: none;
}
.error-message {
  color: red;
}
.success-message {
  color: green;
}
</style>
