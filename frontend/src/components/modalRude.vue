<script setup>
import Stepper from "./stepper.vue";

import Paso1Estudiante from "./rude/Paso1Estudiante.vue";
import Paso2Condiciones from "./rude/Paso2Condiciones.vue";
import Paso3Direccion from "./rude/Paso3Direccion.vue";
import Paso4Socioeconomico from "./rude/Paso4Socioeconomico.vue";
import Paso5Ocupacion from "./rude/Paso5Ocupacion.vue";
import Paso6Inscripcion from "./rude/Paso6Inscripcion.vue";

import { useRude } from "../composables/useRude.js";

const { form, steps, pasoActual, siguientePaso, anteriorPaso, generarPDF } =
  useRude();
</script>
<style scoped>
.rude-modal {
  background-color: var(--card);
}
</style>
<template>
  <div
    class="modal fade"
    id="modalRude"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
    >
      <div class="modal-content rude-modal">
        <div class="modal-header">
          <h4 class="modal-title">Formulario RUDEAL</h4>

          <button type="button" class="btn-close" data-bs-dismiss="modal" />
        </div>
        <div>
          <Stepper :currentStep="pasoActual" :steps="steps" />
          <hr />
        </div>

        <div class="modal-body">
          <Paso1Estudiante v-if="pasoActual === 1" :formulario="form" />

          <Paso2Condiciones v-if="pasoActual === 2" :formulario="form" />

          <Paso3Direccion v-if="pasoActual === 3" :formulario="form" />

          <Paso4Socioeconomico v-if="pasoActual === 4" :formulario="form" />

          <Paso5Ocupacion v-if="pasoActual === 5" :formulario="form" />

          <Paso6Inscripcion v-if="pasoActual === 6" :formulario="form" />
        </div>

        <div class="modal-footer">
          <button
            v-if="pasoActual > 1"
            type="button"
            class="btn btn-secondary"
            @click="anteriorPaso"
          >
            Anterior
          </button>

          <button
            v-if="pasoActual < 6"
            type="button"
            class="btn btn-primary"
            @click="siguientePaso"
          >
            Siguiente
          </button>

          <button
            v-if="pasoActual === 6"
            type="button"
            class="btn btn-success"
            @click="generarPDF"
          >
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
