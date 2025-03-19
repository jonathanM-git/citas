<template>
  <div class="perfil-container">
    <h2>Perfil del Usuario</h2>

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
import { useCounterStore } from '../stores/counter';  // Importamos la tienda de Pinia

const user = ref(null);
const message = ref("");
const date = ref(""); // Fecha de nacimiento

// Acceder al store de Pinia para manejar el token
const counterStore = useCounterStore();
const token = counterStore.getToken;  // Obtener el token desde el store

const fetchUserProfile = async () => {
  if (!token) {
    alert("No estás autenticado");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/profile", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

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

  // Convertir la fecha al formato correcto (DD/MM/YYYY)
  const formattedDate = formatDate(date.value);

  try {
    const response = await fetch("http://127.0.0.1:5000/currentUser", {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user.value,
        date: formattedDate, // Usar la fecha formateada
      }),
    });

    const result = await response.json();
    if (response.ok) {
      message.value = "Perfil actualizado correctamente";
    } else {
      message.value = result.msg || "Error al actualizar el perfil";
    }
  } catch (error) {
    console.error("Error al actualizar:", error);
    message.value = "Error al actualizar el perfil";
  }
};

const formatDate = (inputDate) => {
  const [day, month, year] = inputDate.split('/'); // Se asume formato DD/MM/YYYY
  return `${day}/${month}/${year}`; // Devolver el formato DD/MM/YYYY
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
</style>
