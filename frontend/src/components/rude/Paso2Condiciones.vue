<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <div>
    <h5 class="mb-4">Condiciones del estudiante</h5>

    <div class="mb-4">
      <label class="form-label fw-bold"> ¿Presenta alguna discapacidad? </label>

      <select class="form-select" v-model="formulario.tieneDiscapacidad">
        <option :value="null">Seleccione</option>

        <option :value="true">Sí</option>

        <option :value="false">No</option>
      </select>
    </div>

    <div v-if="formulario.tieneDiscapacidad" class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label"> Carnet de discapacidad </label>

        <input class="form-control" v-model="formulario.carnetDiscapacidad" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Tipo de discapacidad </label>

        <select class="form-select" v-model="formulario.tipoDiscapacidad">
          <option>Intelectual</option>
          <option>Física Motora</option>
          <option>Visual</option>
          <option>Auditiva</option>
          <option>Mental Psíquica</option>
          <option>Múltiple</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Grado </label>

        <select class="form-select" v-model="formulario.gradoDiscapacidad">
          <option>Leve</option>
          <option>Moderado</option>
          <option>Grave</option>
          <option>Muy Grave</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Origen </label>

        <select class="form-select" v-model="formulario.origenDiscapacidad">
          <option>De nacimiento</option>
          <option>Adquirida</option>
        </select>
      </div>
    </div>

    <hr class="my-4" />

    <div class="mb-4">
      <label class="form-label fw-bold"> ¿Tiene diagnóstico TEA? </label>

      <select class="form-select" v-model="formulario.tieneTEA">
        <option :value="null">Seleccione</option>

        <option :value="true">Sí</option>

        <option :value="false">No</option>
      </select>
    </div>

    <div v-if="formulario.tieneTEA">
      <label class="form-label"> Tipo de TEA </label>

      <select class="form-select" v-model="formulario.tipoTEA">
        <option>Tipo 1</option>
        <option>Tipo 2</option>
        <option>Tipo 3</option>
      </select>
    </div>

    <hr class="my-4" />

    <div class="mb-4">
      <label class="form-label fw-bold"> ¿Es estudiante extranjero? </label>

      <select class="form-select" v-model="formulario.esExtranjero">
        <option :value="null">Seleccione</option>

        <option :value="true">Sí</option>

        <option :value="false">No</option>
      </select>
    </div>

    <div v-if="formulario.esExtranjero">
      <label class="form-label"> Documento presentado </label>

      <select class="form-select" v-model="formulario.documentoExtranjero">
        <option>Carnet de Identidad de Extranjero</option>

        <option>Carnet Diplomático</option>

        <option>Certificado de Nacimiento</option>

        <option>DNI</option>

        <option>Pasaporte</option>

        <option>Declaración Jurada</option>
      </select>
    </div>
  </div>
</template>
