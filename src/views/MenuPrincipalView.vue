<template>
  <div class="citas-container">
                <!-- Botón Volver Atrás -->
                <button @click="volverAtras" class="back-button">Volver</button>
    <h2>Gestión de Citas</h2>

    <button @click="accederPerfil" class="citas-button animate__animated animate__zoomIn">
      <img src="../assets/img/perfil.png" alt="Perfil" class="icon" />
      Acceder al Perfil
    </button>

    <button @click="obtenerCentros" class="citas-button animate__animated animate__zoomIn">
      <img src="../assets/img/Centros.png" alt="Centros" class="icon" />
      Obtener Todos los Centros
    </button>

    <button @click="crearCita" class="citas-button animate__animated animate__zoomIn">
      <img src="../assets/img/CrearCita.png" alt="Citas" class="icon" />
      Crear una Cita
    </button>

    <p v-if="errorMessage" class="error-message animate__animated animate__shakeX">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import 'animate.css';

const router = useRouter();
const counterStore = useCounterStore();


const volverAtras = () => {
  router.push('/');
};

const errorMessage = ref("");
const centros = ref([]);

const accederPerfil = () => {
  router.push('/perfil');
};

const crearCita = () => {
  router.push('/citas');
};

const obtenerCentros = async () => {
  router.push('/centers');
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
  font-size: 2rem;
  margin-bottom: 20px;
}

.citas-button {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Alinea el contenido a la izquierda */
  width: 250px;
  padding: 15px;
  margin: 15px;
  background: #4b6cb7;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s, transform 0.2s;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.citas-button:hover {
  background: #182848;
  transform: scale(1.05);
}

.icon {
  width: 40px;
  height: 40px;
  margin-right: 15px;
  flex-shrink: 0; /* Evita que la imagen se reduzca */
}

.error-message {
  color: #ff6961;
  font-size: 1.2rem;
  margin-top: 10px;
}
/* Estilos del botón Volver Atrás */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #ff4b5c;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #c0392b;
}
</style>