<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { onMounted } from "vue";

const fetchData = async () => {
  try {
    const response = await fetch("http://127.0.0.1:5000/migracion", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <RouterView />
</template>

<style>
  @import "./assets/scss/styles.scss";
</style>
