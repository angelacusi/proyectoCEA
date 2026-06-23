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

const niveles = ["Técnico Básico", "Técnico Auxiliar", "Técnico Medio"];

const semestres = ["Primer semestre", "Segundo semestre"];
</script>

<template>
  <div>
    <h6 class="fw-bold mb-4">
      8. DATOS DE INSCRIPCIÓN DE LA GESTIÓN ACTUAL DEL ESTUDIANTE/PARTICIPANTE
    </h6>

    <!-- 8.1 Modalidad -->
    <div class="mb-4">
      <div class="form-label small text-start fw-bold">
        8.1 Modalidad de estudio
      </div>
      <div class="mt-2">
        <div
          class="form-check-inline col-md-3"
          v-for="modalidad in modalidades"
          :key="modalidad"
        >
          <input
            class="form-check-input"
            type="radio"
            :value="modalidad"
            v-model="formulario.modalidadEstudio"
          />

          <label class="form-check-label ms-3 small">
            {{ modalidad }}
          </label>
        </div>
      </div>
    </div>

    <hr />

    <!-- 8.3 ETTP -->
    <div class="mb-4">
      <div class="text-start small fw-bold">
        8.3 Educación Técnica, Tecnológica y Productiva (ETTP)
      </div>

      <!-- Semestre -->
      <label class="form-label small fw-bold mt-3">
        Semestre de inscripción
      </label>

      <div>
        <div
          class="form-check form-check-inline"
          v-for="semestre in semestres"
          :key="semestre"
        >
          <input
            class="form-check-input"
            type="radio"
            :value="semestre"
            v-model="formulario.semestre"
          />

          <label class="form-check-label small">
            {{ semestre }}
          </label>
        </div>
      </div>

      <!-- Nivel -->
      <label class="form-label small fw-bold mt-3"> Nivel técnico </label>

      <div>
        <div
          class="form-check form-check-inline"
          v-for="nivel in niveles"
          :key="nivel"
        >
          <input
            class="form-check-input"
            type="radio"
            :value="nivel"
            v-model="formulario.nivel"
          />

          <label class="form-check-label small">
            {{ nivel }}
          </label>
        </div>
      </div>

      <div class="mt-3 row">
        <!-- Carrera -->
        <div class="col-md-6">
          <label class="form-label small fw-bold"> Carrera </label>

          <select
            class="form-select form-select-sm"
            v-model="formulario.carrera"
          >
            <option value="">Seleccione la carrera</option>

            <option v-for="carrera in carreras" :key="carrera" :value="carrera">
              {{ carrera }}
            </option>
          </select>
        </div>

        <!-- 8.5 Turno -->
        <div class="col-md-6">
          <label class="form-label small fw-bold"> 8.5 Turno </label>

          <div class="mt-2">
            <div
              class="form-check ms-4 form-check-inline"
              v-for="turno in turnos"
              :key="turno"
            >
              <input
                class="form-check-input"
                type="radio"
                :value="turno"
                v-model="formulario.turnoEstudio"
              />

              <label class="form-check-label small">
                {{ turno }}
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
