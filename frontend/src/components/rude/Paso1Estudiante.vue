<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <div>
    <h5 class="mb-3">Datos del estudiante</h5>

    <div class="row">
      <div class="col-md-4 mb-3">
        <label class="form-label">Apellido paterno</label>
        <input class="form-control" v-model="formulario.apPaterno" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Apellido materno</label>
        <input class="form-control" v-model="formulario.apMaterno" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Nombre(s)</label>
        <input class="form-control" v-model="formulario.nombres" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">CI</label>
        <input class="form-control" v-model="formulario.ci" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Complemento</label>
        <input class="form-control" v-model="formulario.complemento" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Expedido</label>

        <select class="form-select" v-model="formulario.expedido">
          <option value="">Seleccione</option>
          <option>LP</option>
          <option>CB</option>
          <option>SC</option>
          <option>OR</option>
          <option>PT</option>
          <option>CH</option>
          <option>TJ</option>
          <option>BN</option>
          <option>PD</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Fecha de nacimiento</label>

        <input
          type="date"
          class="form-control"
          v-model="formulario.fechaNacimiento"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Sexo</label>

        <select class="form-select" v-model="formulario.sexo">
          <option value="">Seleccione</option>
          <option>Masculino</option>
          <option>Femenino</option>
        </select>
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label">País</label>

        <input class="form-control" v-model="formulario.paisNacimiento" />
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label">Departamento</label>

        <input
          class="form-control"
          v-model="formulario.departamentoNacimiento"
        />
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label">Provincia</label>

        <input class="form-control" v-model="formulario.provinciaNacimiento" />
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label">Localidad</label>

        <input class="form-control" v-model="formulario.localidadNacimiento" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Número de hijos </label>

        <input
          type="number"
          class="form-control"
          v-model="formulario.numeroHijos"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Estado civil </label>

        <select class="form-select" v-model="formulario.estadoCivil">
          <option value="">Seleccione</option>
          <option>Soltero/a</option>
          <option>Casado/a</option>
          <option>Divorciado/a</option>
          <option>Viudo/a</option>
          <option>Conviviente</option>
        </select>
      </div>
    </div>
  </div>
</template>
