<script setup>
import navbar from "./components/navbar.vue";
import footerP from "./components/footerP.vue";
import NotificacionGlobal from "./components/notificacionGlobal.vue";
import { onMounted } from "vue";
import { authService } from "./services/authService";
onMounted(async () => {
  await authService.comprobarSesion();
});
</script>

<template>
  <template v-if="$route.path === '/login'">
    <router-view />
  </template>

  <template v-else>
    <navbar />
    <router-view />
    <footerP />
  </template>
  <NotificacionGlobal />
</template>
