<script setup>
import { ref } from "vue";

const x = ref(0);
const y = ref(0);

const anchoOficio = 216;
const altoOficio = 356;

function obtenerPosicion(event) {
  const rect = event.target.getBoundingClientRect();

  const pxX = event.clientX - rect.left;
  const pxY = event.clientY - rect.top;

  x.value = (pxX * anchoOficio) / rect.width;
  y.value = (pxY * altoOficio) / rect.height;
}
</script>

<template>
  <div>
    <h3>Calibrador RUDE</h3>

    <p>{{ x.toFixed(2) }}, {{ y.toFixed(2) }}</p>

    <img
      src="/rudeimage.jpg"
      alt="RUDE"
      @click="obtenerPosicion"
      style="width: 600px; border: 1px solid black; cursor: crosshair"
    />
  </div>
</template>
