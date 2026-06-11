<script setup>
import { ref, reactive } from "vue";

import Stepper from "./stepper.vue";

import Paso1Estudiante from "./rude/Paso1Estudiante.vue";
import Paso2Condiciones from "./rude/Paso2Condiciones.vue";
import Paso3Direccion from "./rude/Paso3Direccion.vue";
import Paso4Socioeconomico from "./rude/Paso4Socioeconomico.vue";
import Paso5Ocupacion from "./rude/Paso5Ocupacion.vue";
import Paso6Inscripcion from "./rude/Paso6Inscripcion.vue";

const pasoActual = ref(1);

const steps = [
  "Estudiante",
  "Condiciones",
  "Dirección",
  "Socioeconómico",
  "Ocupación",
  "Inscripción",
];

const generarPDF = () => {
  console.log("Datos del formulario:");
  console.log(formulario);
};

const formulario = reactive({
  // PASO 1
  apPaterno: "",
  apMaterno: "",
  nombres: "",

  ci: "",
  complemento: "",
  expedido: "",

  fechaNacimiento: "",

  paisNacimiento: "",
  departamentoNacimiento: "",
  provinciaNacimiento: "",
  localidadNacimiento: "",

  sexo: "",
  numeroHijos: "",
  estadoCivil: "",

  esExtranjero: false,
  documentoExtranjero: "",

  // PASO 2
  tieneDiscapacidad: false,
  carnetDiscapacidad: "",
  tipoDiscapacidad: "",
  gradoDiscapacidad: "",
  origenDiscapacidad: "",

  tieneTEA: false,
  tipoTEA: "",

  // PASO 3
  departamento: "",
  provincia: "",
  municipio: "",
  localidad: "",
  zona: "",
  calle: "",
  numeroVivienda: "",

  celular: "",
  telefono: "",

  esSoldado: false,
  unidadMilitar: "",

  contextoEncierro: false,
  centroPenitenciario: "",

  trabajadoraHogar: false,

  otroContexto: "",

  // PASO 4
  idiomaMaterno: "",

  idioma1: "",
  idioma2: "",
  idioma3: "",

  puebloIndigena: "",

  hayCentroSalud: false,

  atencionSalud: "",

  tieneSeguro: false,

  grupoSanguineo: "",

  // PASO 5
  ocupacion: "",
  turnoTrabajo: [],
  frecuenciaTrabajo: "",
  accesoInternet: [],
  frecuenciaInternet: "",
  medioTransporte: "",
  tiempoHoras: "",
  tiempoMinutos: "",
  radio: false,
  internet: false,
  television: false,
  celularPropio: false,
  computadora: false,
  aguaPotable: false,
  alcantarillado: false,
  energiaElectrica: false,
  tipoVivienda: "",

  // PASO 6
  modalidadEstudio: "",
  turnoEstudio: "",
  carrera: "",

  gestion: new Date().getFullYear(),

  fechaInscripcion: new Date().toISOString().split("T")[0],
});

const siguientePaso = () => {
  if (pasoActual.value < 6) {
    pasoActual.value++;
  }
};

const anteriorPaso = () => {
  if (pasoActual.value > 1) {
    pasoActual.value--;
  }
};
</script>

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
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Formulario RUDEAL</h4>

          <button type="button" class="btn-close" data-bs-dismiss="modal" />
        </div>

        <div class="modal-body">
          <Stepper :currentStep="pasoActual" :steps="steps" />

          <Paso1Estudiante v-if="pasoActual === 1" :formulario="formulario" />

          <Paso2Condiciones v-if="pasoActual === 2" :formulario="formulario" />

          <Paso3Direccion v-if="pasoActual === 3" :formulario="formulario" />

          <Paso4Socioeconomico
            v-if="pasoActual === 4"
            :formulario="formulario"
          />

          <Paso5Ocupacion v-if="pasoActual === 5" :formulario="formulario" />

          <Paso6Inscripcion v-if="pasoActual === 6" :formulario="formulario" />
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
