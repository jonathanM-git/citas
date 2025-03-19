<template>
  <div class="perfil-container">
    <h2>Perfil del Usuario</h2>
            <!-- Botón Volver Atrás -->
            <button @click="volverAtras" class="back-button">Volver</button>
    <div v-if="user">
      <label>Usuario:</label>
      <p>{{ user.username }}</p>

      <label>Nombre:</label>
      <input v-model="user.name" type="text" />

      <label>Apellido:</label>
      <input v-model="user.lastname" type="text" />

      <label>Email:</label>
      <input v-model="user.email" type="email" />

      <label>Teléfono:</label>
      <input v-model="user.phone" type="text" />

      <label>Fecha de nacimiento:</label>
      <input type="text" placeholder="Fecha de nacimiento (DD/MM/YYYY)" v-model="date" class="input-field" />

      <button @click="updateProfile">Actualizar</button>

      <p v-if="message" class="message">{{ message }}</p>
    </div>

    <p v-else class="loading">Cargando perfil...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCounterStore } from '../stores/counter';
import apiService from '../services/apiService';
import { useRouter } from "vue-router"; // Importa useRouter

const router = useRouter();
const user = ref(null);
const message = ref("");
const date = ref("");
const counterStore = useCounterStore();
const token = counterStore.getToken;

const volverAtras = () => {
  router.push('/menu');
};


const fetchUserProfile = async () => {
  if (!token) {
    alert("No estás autenticado");
    return;
  }

  try {
    const response = await apiService.getUserProfile(token);
    if (response.ok) {
      user.value = await response.json();
    } else {
      alert("Error al obtener el perfil");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateProfile = async () => {
  if (!user.value) return;

  const formattedDate = formatDate(date.value);

  try {
    const response = await apiService.updateUserProfile(token, { ...user.value, date: formattedDate });
    const result = await response.json();
    message.value = response.ok ? "Perfil actualizado correctamente" : result.msg || "Error al actualizar el perfil";
  } catch (error) {
    console.error("Error al actualizar:", error);
    message.value = "Error al actualizar el perfil";
  }
};

const formatDate = (inputDate) => {
  const [day, month, year] = inputDate.split('/');
  return `${day}/${month}/${year}`;
};

onMounted(() => {
  fetchUserProfile();
});
</script>


<style scoped>
.perfil-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #4b6cb7, #182848);
  color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  margin-top: 10px;
}

input {
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: none;
  width: 100%;
}

button {
  background: #28a745;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background: #218838;
}

.message {
  margin-top: 10px;
  font-weight: bold;
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
