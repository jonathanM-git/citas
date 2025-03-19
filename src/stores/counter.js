import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', () => {
  const token = ref(localStorage.getItem('userToken') || '');  // Inicializa con el valor de localStorage si existe

  // Función para obtener el token (computed)
  const getToken = computed(() => token.value);

  // Función para establecer el token
  const setToken = (newToken) => {
    token.value = newToken;
    localStorage.setItem('userToken', newToken);  // Guardar en localStorage
  };

  // Función para eliminar el token
  const logout = () => {
    token.value = '';
    localStorage.removeItem('userToken');  // Eliminar del localStorage
  };

  return { getToken, setToken, logout };
});
