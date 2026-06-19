<script setup>
defineProps({
  formulario: Object,
});
</script>

<template>
  <div>
    <div class="row">
      <!-- 2.1 Apellidos y nombres -->
      <h6 class="fw-bold mb-2">2.1. APELLIDO(S) Y NOMBRE(S) (**)</h6>

      <div class="col-md-4 mb-2 text-start">
        <label class="form-label small">Apellido paterno</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.apPaterno"
        />
      </div>

      <div class="col-md-4 mb-2 text-start">
        <label class="form-label small">Apellido materno</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.apMaterno"
        />
      </div>

      <div class="col-md-4 mb-2 text-start">
        <label class="form-label small">Nombre(s)</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.nombres"
        />
      </div>

      <!-- 2.2 Documento de identidad -->
      <h6 class="fw-bold mt-3 mb-2">2.2. DOCUMENTO DE IDENTIFICACIÓN</h6>

      <div class="col-md-4 mb-2 text-start">
        <label class="form-label small">Cédula de identidad</label>
        <input class="form-control form-control-sm" v-model="formulario.ci" />
      </div>

      <div class="col-md-4 mb-2 text-start">
        <label class="form-label small">Complemento</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.complemento"
        />
      </div>

      <div class="col-md-4 mb-2 text-start">
        <label class="form-label small">Expedido</label>
        <select
          class="form-select form-select-sm"
          v-model="formulario.expedido"
        >
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

      <!-- 2.3 Lugar de nacimiento -->
      <h6 class="fw-bold mt-3 mb-2">2.3. LUGAR DE NACIMIENTO</h6>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">País</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.paisNacimiento"
        />
      </div>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Departamento</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.departamentoNacimiento"
        />
      </div>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Provincia</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.provinciaNacimiento"
        />
      </div>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Localidad</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.localidadNacimiento"
        />
      </div>

      <!-- 2.4 Certificado de nacimiento -->
      <h6 class="fw-bold mt-3 mb-2">2.4. CERTIFICADO DE NACIMIENTO</h6>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Oficialía Nº</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.oficialia"
        />
      </div>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Libro Nº</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.libro"
        />
      </div>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Partida Nº</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.partida"
        />
      </div>

      <div class="col-md-3 mb-2 text-start">
        <label class="form-label small">Folio Nº</label>
        <input
          class="form-control form-control-sm"
          v-model="formulario.folio"
        />
      </div>

      <!-- 2.5 Fecha de nacimiento -->

      <div class="col-md-6 mb-2">
        <h6 class="fw-bold mt-3 mb-2">2.5. FECHA DE NACIMIENTO</h6>

        <input
          type="date"
          class="form-control form-control-sm"
          v-model="formulario.fechaNacimiento"
        />
      </div>

      <!-- 2.6 Sexo -->

      <div class="col-md-6 mb-2">
        <h6 class="fw-bold mt-3 mb-2">2.6. SEXO</h6>

        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            value="Masculino"
            v-model="formulario.sexo"
          />
          <label class="form-check-label small"> Masculino </label>
        </div>

        <div class="form-check form-check-inline ms-4">
          <input
            class="form-check-input"
            type="radio"
            value="Femenino"
            v-model="formulario.sexo"
          />
          <label class="form-check-label small"> Femenino </label>
        </div>
      </div>

      <!-- 2.7 y 2.8 -->
      <h6 class="fw-bold mt-3 mb-2">2.7. Nº DE HIJOS / 2.8. ESTADO CIVIL</h6>

      <div class="col-md-6 mb-2 text-start">
        <label class="form-label small">Número de hijos</label>
        <input
          type="number"
          class="form-control form-control-sm"
          v-model="formulario.numeroHijos"
        />
      </div>

      <div class="col-md-6 mb-2 text-start">
        <label class="form-label small">Estado civil</label>
        <select
          class="form-select form-select-sm"
          v-model="formulario.estadoCivil"
        >
          <option value="">Seleccione</option>
          <option value="Soltera/o">Soltero/a</option>
          <option value="Casada/o">Casado/a</option>
          <option value="Divorciada/o">Divorciado/a</option>
          <option value="Viuda/o">Viudo/a</option>
          <option value="COnviviente">Conviviente</option>
        </select>
      </div>
    </div>
  </div>
</template>
