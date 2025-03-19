<template>
    <div class="centros-container">
      <h2>Lista de Centros</h2>
      
      <div v-if="centros.length > 0" class="centros-grid">
        <div v-for="centro in centros" :key="centro.name" class="centro-card">
          <h3>{{ centro.name }}</h3>
          <p>{{ centro.address }}</p>
          <button @click="obtenerCitasCentro(centro.name)" class="citas-button">Ver Citas</button>
        </div>
      </div>
      
      <p v-else class="empty-message">No hay centros disponibles.</p>
      
      <div v-if="citasCentro.length > 0" class="citas-list"> 
        <h3>Citas en {{ centroSeleccionado }}</h3>
        <ul>
  <li v-for="(cita, index) in citasCentro" :key="index">
    <strong>Paciente:</strong> {{ cita.username || 'No disponible' }} - 
    <strong>Fecha:</strong> {{ cita.date || 'No disponible' }} 
  </li>
</ul>

      </div>
    </div>
  </template>
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';

const counterStore = useCounterStore();
const centros = ref([]);
const citasCentro = ref([]);
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
    citasCentro.value = data.filter(cita => cita.center === centro);
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

  