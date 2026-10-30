<script setup>
defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  titulo: {
    type: String,
    default: "Eliminar registro",
  },
  mensaje: {
    type: String,
    default: "¿Estás segura de que deseas eliminar este registro?",
  },
  nombre: {
    type: String,
    default: "",
  },
  eliminando: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["confirmar", "cancelar"]);
</script>

<template>
  <div v-if="visible" class="confirmar-fondo" @click.self="emit('cancelar')">
    <section class="confirmar-modal">
      <div class="confirmar-icono">
        <i class="bi bi-exclamation-triangle"></i>
      </div>

      <h2>{{ titulo }}</h2>

      <p>{{ mensaje }}</p>

      <strong v-if="nombre">{{ nombre }}</strong>

      <p v-if="error" class="confirmar-error" role="alert">
        {{ error }}
      </p>

      <div class="confirmar-acciones">
        <button
          type="button"
          class="btn-cancelar"
          @click="emit('cancelar')"
          :disabled="eliminando"
        >
          Cancelar
        </button>

        <button
          type="button"
          class="btn-eliminar"
          @click="emit('confirmar')"
          :disabled="eliminando"
        >
          {{ eliminando ? "Eliminando..." : "Sí, eliminar" }}
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.confirmar-fondo {
  position: fixed;
  inset: 0;
  z-index: 2100;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.confirmar-modal {
  background: white;
  width: 100%;
  max-width: 420px;
  padding: 28px;
  border-radius: 12px;
  text-align: center;
}

.confirmar-icono {
  font-size: 35px;
  color: #dc2626;
  margin-bottom: 10px;
}

.confirmar-modal h2 {
  font-size: 1.35rem;
}

.confirmar-modal p {
  color: #555;
  margin: 12px 0;
}

.confirmar-modal .confirmar-error {
  padding: 10px 12px;
  border-radius: 7px;
  background: #fef2f2;
  color: #991b1b;
  text-align: left;
}

.confirmar-modal strong {
  display: block;
  margin-bottom: 20px;
}

.confirmar-acciones {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.confirmar-acciones button {
  padding: 10px 15px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
}

.btn-cancelar {
  background: #e5e7eb;
}

.btn-eliminar {
  background: #dc2626;
  color: white;
}

.confirmar-acciones button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
