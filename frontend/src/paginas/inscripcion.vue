<template>
  <div class="container py-5">
    <h4 class="text-center mb-2">Formulario RUDEAL</h4>

    <Stepper :currentStep="pasoActual" :steps="steps" />

    <form>
      <!-- PASO 1 -->

      <div v-if="pasoActual === 1">
        <h5 class="mb-2">Datos personales</h5>

        <div class="row">
          <div class="col-md-4 mb-3">
            <label class="form-label"> Apellido paterno </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.apPaterno"
            />
          </div>

          <div class="col-md-4 mb-3">
            <label class="form-label"> Apellido materno </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.apMaterno"
            />
          </div>

          <div class="col-md-4 mb-3">
            <label class="form-label"> Nombres </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.nombres"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> CI </label>

            <input type="text" class="form-control" v-model="formulario.ci" />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> Fecha de nacimiento </label>

            <input
              type="date"
              class="form-control"
              v-model="formulario.fechaNacimiento"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> Sexo </label>

            <select class="form-select" v-model="formulario.sexo">
              <option value="">Seleccione</option>

              <option>Masculino</option>

              <option>Femenino</option>
            </select>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> Estado civil </label>

            <select class="form-select" v-model="formulario.estadoCivil">
              <option value="">Seleccione</option>

              <option>Soltero/a</option>

              <option>Casado/a</option>

              <option>Divorciado/a</option>

              <option>Viudo/a</option>
            </select>
          </div>
        </div>
      </div>

      <!-- PASO 2 -->

      <div v-if="pasoActual === 2">
        <h5 class="mb-2">Dirección</h5>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label"> Departamento </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.departamento"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> Provincia </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.provincia"
            />
          </div>

          <div class="col-md-12 mb-3">
            <label class="form-label"> Dirección </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.direccion"
            />
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> Celular </label>

            <input
              type="text"
              class="form-control"
              v-model="formulario.celular"
            />
          </div>
        </div>
      </div>

      <!-- PASO 3 -->

      <div v-if="pasoActual === 3">
        <h5 class="mb-2">Salud y discapacidad</h5>

        <div class="mb-3">
          <label class="form-label"> ¿Tiene discapacidad? </label>

          <select class="form-select" v-model="formulario.discapacidad">
            <option value="">Seleccione</option>

            <option>Sí</option>

            <option>No</option>
          </select>
        </div>

        <div v-if="formulario.discapacidad === 'Sí'" class="mb-3">
          <label class="form-label"> Tipo de discapacidad </label>

          <input
            type="text"
            class="form-control"
            v-model="formulario.tipoDiscapacidad"
          />
        </div>
      </div>

      <!-- PASO 4 -->

      <div v-if="pasoActual === 4">
        <h5 class="mb-2">Datos de inscripción</h5>

        <div class="row">
          <div class="col-md-6 mb-3">
            <label class="form-label"> Carrera </label>

            <select class="form-select" v-model="formulario.carrera">
              <option value="">Seleccione</option>

              <option>Sistemas</option>

              <option>Contabilidad</option>

              <option>Secretariado</option>
            </select>
          </div>

          <div class="col-md-6 mb-3">
            <label class="form-label"> Turno </label>

            <select class="form-select" v-model="formulario.turno">
              <option value="">Seleccione</option>

              <option>Mañana</option>

              <option>Tarde</option>

              <option>Noche</option>
            </select>
          </div>
        </div>
      </div>

      <!-- BOTONES -->

      <div class="d-flex justify-content-between mt-2">
        <button
          type="button"
          class="btn btn-secondary"
          @click="anteriorPaso"
          v-if="pasoActual > 1"
        >
          Anterior
        </button>

        <button
          type="button"
          class="btn btn-primary ms-auto"
          @click="siguientePaso"
          v-if="pasoActual < 4"
        >
          Siguiente
        </button>

        <button
          type="button"
          class="btn btn-success"
          @click="generarPDF"
          v-if="pasoActual === 4"
        >
          Descargar PDF
        </button>
      </div>
    </form>
  </div>

  <!-- HTML DEL PDF (oculto en la página) -->

  <div id="pdf" class="pdf-container">
    <h1>FORMULARIO RUDEAL</h1>

    <hr />

    <h3>Datos personales</h3>

    <p>
      <strong>Nombre:</strong>
      {{ formulario.nombres }}
      {{ formulario.apPaterno }}
      {{ formulario.apMaterno }}
    </p>

    <p>
      <strong>CI:</strong>
      {{ formulario.ci }}
    </p>

    <p>
      <strong>Sexo:</strong>
      {{ formulario.sexo }}
    </p>

    <p>
      <strong>Fecha nacimiento:</strong>
      {{ formulario.fechaNacimiento }}
    </p>

    <hr />

    <h3>Dirección</h3>

    <p>
      <strong>Departamento:</strong>
      {{ formulario.departamento }}
    </p>

    <p>
      <strong>Provincia:</strong>
      {{ formulario.provincia }}
    </p>

    <p>
      <strong>Dirección:</strong>
      {{ formulario.direccion }}
    </p>

    <hr />

    <h3>Inscripción</h3>

    <p>
      <strong>Carrera:</strong>
      {{ formulario.carrera }}
    </p>

    <p>
      <strong>Turno:</strong>
      {{ formulario.turno }}
    </p>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";
import Stepper from "../components/Stepper.vue";

const pasoActual = ref(1);

const steps = ["Personal", "Dirección", "Salud", "Inscripción"];

const formulario = reactive({
  apPaterno: "",
  apMaterno: "",
  nombres: "",
  ci: "",
  fechaNacimiento: "",
  sexo: "",
  estadoCivil: "",

  departamento: "",
  provincia: "",
  direccion: "",
  celular: "",

  discapacidad: "",
  tipoDiscapacidad: "",

  carrera: "",
  turno: "",
});

const siguientePaso = () => {
  if (pasoActual.value < 4) {
    pasoActual.value++;
  }
};

const anteriorPaso = () => {
  if (pasoActual.value > 1) {
    pasoActual.value--;
  }
};

const generarPDF = async () => {
  const elemento = document.getElementById("pdf");

  await new Promise((resolve) => setTimeout(resolve, 500));

  const opciones = {
    margin: 0.5,

    filename: `RUDEAL_${formulario.nombres}.pdf`,

    image: {
      type: "jpeg",
      quality: 1,
    },

    html2canvas: {
      scale: 2,
      logging: true,
      useCORS: true,
    },

    jsPDF: {
      unit: "in",
      format: "letter",
      orientation: "portrait",
    },
  };

  html2pdf().set(opciones).from(elemento).save();
};
</script>

<style scoped>
.pdf-container {
  width: 800px;
  padding: 40px;
  background: white;
  color: black;
  opacity: 0;
  z-index: -1;

  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;

  font-family: Arial, sans-serif;
}

.encabezado {
  text-align: center;
  margin-bottom: 20px;
}

.encabezado h2 {
  margin-bottom: 5px;
}

.encabezado h4 {
  margin-bottom: 5px;
}

.pdf-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
}

.pdf-grid p {
  margin: 0;
}

.firma-container {
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
}

.firma {
  text-align: center;
}
</style>
