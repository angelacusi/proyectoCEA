<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <!-- 3.1 Discapacidad -->
  <h6 class="fw-bold mt-3">
    3.1 ¿EL/LA ESTUDIANTE/PARTICIPANTE PRESENTA ALGUNA DISCAPACIDAD?
  </h6>

  <div class="mb-3">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        :value="true"
        v-model="formulario.tieneDiscapacidad"
      />
      <label class="form-check-label small"> Sí (Pase a 3.1.1) </label>
    </div>

    <div class="form-check form-check-inline ms-4">
      <input
        class="form-check-input"
        type="radio"
        :value="false"
        v-model="formulario.tieneDiscapacidad"
      />
      <label class="form-check-label small"> No (Pase a 3.2) </label>
    </div>
  </div>

  <div v-if="formulario.tieneDiscapacidad">
    <!-- 3.1.1 Carnet -->
    <h6 class="fw-bold mt-4">3.1.1 CARNET DE DISCAPACIDAD (**)</h6>

    <p class="small text-muted">
      Seleccione el registro presentado e introduzca el número correspondiente.
      Si no posee un Carnet de Discapacidad, no marque ninguna de las casillas y
      pase a la pregunta 3.2.
    </p>

    <div class="row mb-3">
      <div class="col-md-8">
        <label class="form-label small fw-bold"> Tipo de registro </label>

        <div>
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="radio"
              value="CODEPEDIS"
              v-model="formulario.tipoRegistroDiscapacidad"
            />
            <label class="form-check-label small"> CODEPEDIS </label>
          </div>

          <div class="form-check form-check-inline ms-4">
            <input
              class="form-check-input"
              type="radio"
              value="IBC"
              v-model="formulario.tipoRegistroDiscapacidad"
            />
            <label class="form-check-label small"> IBC </label>
          </div>
        </div>
      </div>
      <div class="mb-3 col-md-4">
        <label class="form-label small fw-bold"> N° de registro </label>

        <input
          class="form-control form-control-sm"
          v-model="formulario.numeroRegistroDiscapacidad"
        />
      </div>
    </div>

    <!-- 3.1.2 Tipo y grado -->
    <h6 class="fw-bold mt-4">3.1.2 TIPOS Y GRADOS DE DISCAPACIDAD (**)</h6>

    <p class="small text-muted">
      Identifique el tipo y el grado indicado en el carnet de discapacidad.
    </p>

    <div class="row">
      <!-- Tipo -->
      <div class="mb-3 col-md-6">
        <label class="form-label small fw-bold"> Tipo de discapacidad </label>

        <!-- Si es IBC se fija en visual -->
        <input
          v-if="formulario.tipoRegistroDiscapacidad === 'IBC'"
          class="form-control form-control-sm"
          value="Visual"
          disabled
        />

        <!-- Si es CODEPEDIS puede elegir -->
        <select
          v-else
          class="form-select form-select-sm"
          v-model="formulario.tipoDiscapacidad"
        >
          <option value="">Seleccione</option>

          <option value="Visual">Visual</option>

          <option value="Física-Motora">Física-Motora</option>

          <option value="Auditiva">Auditiva</option>

          <option value="Intelectual">Intelectual</option>

          <option value="Mental o Psíquica">Mental o Psíquica</option>

          <option value="Múltiple">Múltiple</option>
        </select>
      </div>

      <!-- Grado -->
      <div class="mb-3 col-md-6">
        <label class="form-label small fw-bold"> Grado de discapacidad </label>

        <!-- Visual -->
        <select
          v-if="
            formulario.tipoDiscapacidad === 'Visual' ||
            formulario.tipoRegistroDiscapacidad === 'IBC'
          "
          class="form-select form-select-sm"
          v-model="formulario.gradoDiscapacidad"
        >
          <option value="">Seleccione</option>

          <option value="Ceguera total">Ceguera total</option>

          <option value="Baja visión">Baja visión</option>
        </select>

        <!-- Resto -->
        <select
          v-else
          class="form-select form-select-sm"
          v-model="formulario.gradoDiscapacidad"
        >
          <option value="">Seleccione</option>

          <option value="Leve">Leve</option>

          <option value="Moderado">Moderado</option>

          <option value="Grave">Grave</option>

          <option value="Muy Grave">Muy Grave</option>
        </select>
      </div>
    </div>

    <!-- 3.1.3 Origen -->
    <h6 class="fw-bold mt-4">
      3.1.3 LA DISCAPACIDAD DEL ESTUDIANTE/PARTICIPANTE ES:
    </h6>

    <div class="mb-3">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          value="nacimiento"
          v-model="formulario.origenDiscapacidad"
        />

        <label class="form-check-label small"> De nacimiento </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          value="Adquirida"
          v-model="formulario.origenDiscapacidad"
        />

        <label class="form-check-label small"> Adquirida </label>
      </div>
    </div>
  </div>

  <hr class="my-4" />

  <h6 class="fw-bold">
    (**) 3.2 ¿EL/LA ESTUDIANTE/PARTICIPANTE TIENE DIAGNÓSTICO TEA EMITIDO POR UN
    PROFESIONAL DE SALUD AUTORIZADO?
  </h6>

  <div class="mb-3">
    <div class="form-check form-check-inline">
      <input
        class="form-check-input"
        type="radio"
        :value="true"
        v-model="formulario.tieneTEA"
      />
      <label class="form-check-label small"> Sí (Pase a 3.2.1) </label>
    </div>

    <div class="form-check form-check-inline ms-4">
      <input
        class="form-check-input"
        type="radio"
        :value="false"
        v-model="formulario.tieneTEA"
      />
      <label class="form-check-label small"> No (Pase a 4) </label>
    </div>
  </div>

  <div v-if="formulario.tieneTEA">
    <h6 class="fw-bold mt-4">3.2.1 TIPO DE TRASTORNO DEL ESPECTRO AUTISTA</h6>

    <div class="mb-3">
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          value="1"
          v-model="formulario.tipoTEA"
        />
        <label class="form-check-label small"> Tipo 1 </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          value="2"
          v-model="formulario.tipoTEA"
        />
        <label class="form-check-label small"> Tipo 2 </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          value="3"
          v-model="formulario.tipoTEA"
        />
        <label class="form-check-label small"> Tipo 3 </label>
      </div>
    </div>
  </div>

  <hr class="my-4" />

  <h6 class="fw-bold">4. ESTUDIANTES/PARTICIPANTES EXTRANJEROS</h6>
  <div class="mb-3">
    <label class="form-label fw-bold small">
      ¿El estudiante es extranjero?
    </label>

    <div>
      <div class="form-check form-check-inline">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.esExtranjero"
        />
        <label class="form-check-label"> Sí </label>
      </div>

      <div class="form-check form-check-inline ms-4">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.esExtranjero"
        />
        <label class="form-check-label"> No </label>
      </div>
    </div>
  </div>

  <div v-if="formulario.esExtranjero" class="row">
    <div class="col-md-6">
      <h6 class="fw-bold">4.1 TIPO DE DOCUMENTO PRESENTADO</h6>

      <select
        class="form-select form-select-sm mb-3"
        v-model="formulario.documentoExtranjero"
      >
        <option value="">Seleccione</option>

        <option value="Extranjero">Carnet de Identidad de Extranjero</option>

        <option value="Diplomatico">Carnet de Identidad Diplomático</option>

        <option value="Nacimiento">Certificado de Nacimiento</option>

        <option value="DNI">Documento Nacional de Identidad (DNI)</option>

        <option value="Pasaporte">Pasaporte</option>

        <option value="Declaracion">Declaración Jurada</option>
      </select>
    </div>

    <div class="mb-3 col-md-6">
      <label class="form-label small fw-bold">
        Código del documento presentado
      </label>

      <input
        class="form-control form-control-sm"
        v-model="formulario.codigoExtranjero"
      />
    </div>
  </div>
</template>
