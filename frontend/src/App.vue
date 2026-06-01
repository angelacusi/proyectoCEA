<script setup>
import navbar from "./components/navbar.vue";
import footerP from "./components/footerP.vue";
</script>

<template>
  <navbar />

  <router-view />

  <footerP />
</template>
