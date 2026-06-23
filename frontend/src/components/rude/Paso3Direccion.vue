<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <div>
    <!-- 5. DIRECCIÓN ACTUAL -->
    <h6 class="fw-bold mb-3">
      5. DIRECCIÓN ACTUAL DEL ESTUDIANTE/PARTICIPANTE
    </h6>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">Departamento</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.departamento"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">Provincia</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.provincia"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">Sección/Municipio</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.municipio"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">Localidad/Comunidad</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.localidad"
        />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">Zona/Villa</label>
        <input class="form-control form-control-sm" v-model="formulario.zona" />
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">Avenida/Calle</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.calle"
        />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label small fw-bold">Nº de vivienda</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.numeroVivienda"
        />
      </div>

      <div class="col-md-4 mb-3">
        <label class="form-label small fw-bold">Celular de contacto</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.celular"
        />
      </div>

      <div class="col-md-4 mb-4">
        <label class="form-label small fw-bold">Teléfono fijo</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.telefono"
        />
      </div>
    </div>

    <hr class="my-4" />

    <h6 class="fw-bold mb-4">6. EDUCACIÓN DIVERSA</h6>

    <p class="small text-muted mb-4">
      Registre si el/la estudiante/participante pertenece a algún contexto
      diverso.
    </p>

    <!-- 6.1 SOLDADOS Y MARINEROS -->
    <h6 class="fw-bold mt-3">6.1. SOLDADOS Y MARINEROS</h6>

    <div class="mb-3">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.esSoldado"
        />
        <label class="form-check-label small"> Sí </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.esSoldado"
        />
        <label class="form-check-label small"> No </label>
      </div>
    </div>

    <div v-if="formulario.esSoldado" class="mb-4">
      <label class="form-label small fw-bold">
        Nombre de la Región/Unidad Militar
      </label>

      <input
        class="form-control form-control-sm"
        v-model="formulario.unidadMilitar"
      />
    </div>

    <!-- 6.2 CONTEXTO DE ENCIERRO -->
    <h6 class="fw-bold mt-3">6.2. CONTEXTO DE ENCIERRO</h6>

    <div class="mb-3">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.contextoEncierro"
        />
        <label class="form-check-label small"> Sí </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.contextoEncierro"
        />
        <label class="form-check-label small"> No </label>
      </div>
    </div>

    <div v-if="formulario.contextoEncierro" class="mb-4">
      <label class="form-label small fw-bold">
        Nombre del Centro Penitenciario/Centro de Rehabilitación
      </label>

      <input
        class="form-control form-control-sm"
        v-model="formulario.centroPenitenciario"
      />
    </div>

    <!-- 6.3 TRABAJADORAS ASALARIADAS DEL HOGAR -->
    <h6 class="fw-bold mt-3">6.3. TRABAJADORAS ASALARIADAS DEL HOGAR</h6>

    <div class="mb-4">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.trabajadoraHogar"
        />
        <label class="form-check-label small"> Sí </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.trabajadoraHogar"
        />
        <label class="form-check-label small"> No </label>
      </div>
    </div>

    <!-- 6.4 OTROS -->
    <h6 class="fw-bold mt-3">6.4. OTROS</h6>

    <div class="mb-3">
      <label class="form-label small fw-bold"> Especifique </label>

      <input
        class="form-control form-control-sm"
        v-model="formulario.otroContexto"
      />
    </div>
  </div>
</template>
