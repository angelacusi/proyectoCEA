<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <div>
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
