<script setup>
defineProps({
  formulario: Object,
});

const carreras = [
  "Mecánica Industrial",
  "Electricidad Industrial",
  "Electromecánica",
  "Inglés",
  "Secretariado Ejecutivo",
  "Sistemas Informáticos",
];

const modalidades = ["Presencial", "Semipresencial", "A distancia"];

const turnos = ["Mañana", "Tarde", "Noche"];
</script>

<template>
  <div>
    <h5 class="mb-4">Datos de inscripción</h5>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label"> Modalidad de estudio </label>

        <select class="form-select" v-model="formulario.modalidadEstudio">
          <option value="">Seleccione</option>

          <option v-for="modalidad in modalidades" :key="modalidad">
            {{ modalidad }}
          </option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Turno </label>

        <select class="form-select" v-model="formulario.turnoEstudio">
          <option value="">Seleccione</option>

          <option v-for="turno in turnos" :key="turno">
            {{ turno }}
          </option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Carrera </label>

        <select class="form-select" v-model="formulario.carrera">
          <option value="">Seleccione</option>

          <option v-for="carrera in carreras" :key="carrera">
            {{ carrera }}
          </option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label class="form-label"> Fecha de inscripción </label>

        <input
          type="date"
          class="form-control"
          v-model="formulario.fechaInscripcion"
        />
      </div>
    </div>

    <hr class="my-4" />

    <div class="alert alert-info">
      <h6 class="mb-2">Resumen de inscripción</h6>

      <p class="mb-1">
        <strong>Estudiante:</strong>
        {{ formulario.nombres }}
        {{ formulario.apPaterno }}
        {{ formulario.apMaterno }}
      </p>

      <p class="mb-1">
        <strong>Carrera:</strong>
        {{ formulario.carrera }}
      </p>

      <p class="mb-1">
        <strong>Modalidad:</strong>
        {{ formulario.modalidadEstudio }}
      </p>

      <p class="mb-1">
        <strong>Turno:</strong>
        {{ formulario.turnoEstudio }}
      </p>
    </div>
  </div>
</template>
