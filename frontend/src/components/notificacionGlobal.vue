<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const visible = ref(false);
const mensaje = ref("");
let temporizador = null;

function mostrarNotificacion(evento) {
  mensaje.value = evento.detail?.mensaje || "Ocurrió un error.";
  visible.value = true;

  clearTimeout(temporizador);

  temporizador = setTimeout(() => {
    visible.value = false;
  }, 6000);
}

function cerrarNotificacion() {
  visible.value = false;
  clearTimeout(temporizador);
}

onMounted(() => {
  window.addEventListener("api-error", mostrarNotificacion);
});

onUnmounted(() => {
  window.removeEventListener("api-error", mostrarNotificacion);
  clearTimeout(temporizador);
});
</script>

<template>
  <Transition name="notificacion">
    <div v-if="visible" class="notificacion-error">
      <div class="icono-error">
        <i class="bi bi-cloud-slash"></i>
      </div>

      <div class="contenido-error">
        <strong>No se pudo conectar</strong>
        <p>{{ mensaje }}</p>
      </div>

      <button
        class="cerrar-error"
        type="button"
        @click="cerrarNotificacion"
        aria-label="Cerrar notificación"
      >
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.notificacion-error {
  position: fixed;
  top: 95px;
  right: 25px;
  z-index: 9999;
  width: min(390px, calc(100vw - 30px));
  display: flex;
  align-items: flex-start;
  gap: 13px;
  padding: 17px;
  background: #fff;
  border: 1px solid #fecaca;
  border-left: 5px solid #dc2626;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.13);
}

.icono-error {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 50%;
  font-size: 20px;
}

.contenido-error {
  flex: 1;
}

.contenido-error strong {
  display: block;
  color: #991b1b;
  font-size: 15px;
  margin-bottom: 5px;
}

.contenido-error p {
  margin: 0;
  color: #575757;
  font-size: 13px;
  line-height: 1.5;
}

.cerrar-error {
  border: none;
  background: transparent;
  color: #777;
  cursor: pointer;
  padding: 3px;
}

.cerrar-error:hover {
  color: #dc2626;
}

.notificacion-enter-active,
.notificacion-leave-active {
  transition: all 0.3s ease;
}

.notificacion-enter-from,
.notificacion-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@media (max-width: 576px) {
  .notificacion-error {
    top: 80px;
    right: 15px;
  }
}
</style>
