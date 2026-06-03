<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <div>
    <h5 class="mb-3">Dirección actual</h5>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label">Departamento</label>
        <input class="form-control" v-model="formulario.departamento" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Provincia</label>
        <input class="form-control" v-model="formulario.provincia" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Municipio</label>
        <input class="form-control" v-model="formulario.municipio" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Localidad</label>
        <input class="form-control" v-model="formulario.localidad" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Zona / Villa</label>
        <input class="form-control" v-model="formulario.zona" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">Avenida / Calle</label>
        <input class="form-control" v-model="formulario.calle" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">N° Vivienda</label>
        <input class="form-control" v-model="formulario.numeroVivienda" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Celular</label>
        <input class="form-control" v-model="formulario.celular" />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label">Teléfono</label>
        <input class="form-control" v-model="formulario.telefono" />
      </div>
    </div>

    <hr />

    <h5 class="mb-3">Educación diversa</h5>

    <p class="mb-4">
      Registre si el/la estudiante/participante pertenece a algún contexto
      diverso:
    </p>

    <!-- SOLDADO -->

    <div class="row align-items-center mb-3">
      <div class="col-md-5">
        <label class="form-label mb-0"> Soldados y Marineros </label>
      </div>

      <div class="col-md-2">
        <select class="form-select" v-model="formulario.esSoldado">
          <option :value="false">No</option>
          <option :value="true">Sí</option>
        </select>
      </div>

      <div class="col-md-5">
        <input
          class="form-control"
          placeholder="Nombre de la unidad militar"
          v-model="formulario.unidadMilitar"
          :disabled="!formulario.esSoldado"
        />
      </div>
    </div>

    <!-- CONTEXTO DE ENCIERRO -->

    <div class="row align-items-center mb-3">
      <div class="col-md-5">
        <label class="form-label mb-0"> Contexto de encierro </label>
      </div>

      <div class="col-md-2">
        <select class="form-select" v-model="formulario.contextoEncierro">
          <option :value="false">No</option>
          <option :value="true">Sí</option>
        </select>
      </div>

      <div class="col-md-5">
        <input
          class="form-control"
          placeholder="Centro penitenciario o rehabilitación"
          v-model="formulario.centroPenitenciario"
          :disabled="!formulario.contextoEncierro"
        />
      </div>
    </div>

    <!-- TRABAJADORA DEL HOGAR -->

    <div class="row align-items-center mb-3">
      <div class="col-md-5">
        <label class="form-label mb-0">
          Trabajadora asalariada del hogar
        </label>
      </div>

      <div class="col-md-2">
        <select class="form-select" v-model="formulario.trabajadoraHogar">
          <option :value="false">No</option>
          <option :value="true">Sí</option>
        </select>
      </div>

      <div class="col-md-5"></div>
    </div>

    <!-- OTRO -->

    <div class="row align-items-center">
      <div class="col-md-5">
        <label class="form-label mb-0"> Otro contexto </label>
      </div>

      <div class="col-md-7">
        <input
          class="form-control"
          placeholder="Especifique"
          v-model="formulario.otroContexto"
        />
      </div>
    </div>
  </div>
</template>
