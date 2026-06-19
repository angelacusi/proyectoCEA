<script setup>
import { ref, watch } from "vue";

const { formulario } = defineProps({
  formulario: Object,
});

const ocupacionSeleccionada = ref(formulario.ocupacion || "");

watch(ocupacionSeleccionada, (valor) => {
  if (valor !== "Otro") {
    formulario.ocupacion = valor;
  } else {
    formulario.ocupacionOtro = "";
  }
});
</script>

<template>
  <div>
    <!-- 7.3 OCUPACIÓN -->
    <h6 class="fw-bold mb-3">7.3. OCUPACIÓN</h6>

    <!-- 7.3.1 -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.3.1 ¿Cuál es la ocupación de la o el estudiante/participante?
      </label>

      <div class="row">
        <div
          class="col-md-4"
          v-for="ocupacion in [
            'Agricultura',
            'Obrero',
            'Empleado',
            'Gremial',
            'Trabajadora de hogar',
            'Emprendedor',
            'Otro',
          ]"
          :key="ocupacion"
        >
          <div class="form-check form-check-inline mb-2">
            <input
              class="form-check-input"
              type="radio"
              :value="ocupacion"
              v-model="ocupacionSeleccionada"
            />

            <label class="form-check-label small">
              {{ ocupacion }}
            </label>
          </div>
        </div>

        <div v-if="ocupacionSeleccionada === 'Otro'" class="mt-2 col-md-8">
          <input
            class="form-control form-control-sm"
            placeholder="Especifique la ocupación"
            v-model="formulario.ocupacionOtro"
          />
        </div>
      </div>
    </div>

    <!-- 7.3.2 TURNO -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.3.2 ¿En qué turno trabaja la o el estudiante/participante?
      </label>

      <div class="row">
        <div class="col-md-4">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Mañana"
              v-model="formulario.turnoTrabajo"
            />
            <label class="form-check-label small"> Mañana </label>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Tarde"
              v-model="formulario.turnoTrabajo"
            />
            <label class="form-check-label small"> Tarde </label>
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-check form-check-inline">
            <input
              class="form-check-input"
              type="checkbox"
              value="Noche"
              v-model="formulario.turnoTrabajo"
            />
            <label class="form-check-label small"> Noche </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 7.3.3 FRECUENCIA -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.3.3 ¿Con qué frecuencia trabaja?
      </label>

      <div class="row">
        <div
          class="col-md-4"
          v-for="frecuencia in [
            'Todos los días',
            'Días hábiles',
            'Fines de semana',
            'Días festivos',
            'Eventual / esporádico',
            'En vacaciones',
          ]"
          :key="frecuencia"
        >
          <div class="form-check form-check-inline ms-4 mb-2">
            <input
              class="form-check-input"
              type="radio"
              :value="frecuencia"
              v-model="formulario.frecuenciaTrabajo"
            />

            <label class="form-check-label small">
              {{ frecuencia }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <!-- 7.4 INTERNET -->
    <h6 class="fw-bold mb-3">7.4 ACCESO A INTERNET</h6>

    <!-- 7.4.1 -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.4.1 La o el estudiante/participante accede a internet en:
      </label>

      <div class="row">
        <div
          class="col-md-4"
          v-for="lugar in [
            'Teléfono celular',
            'Su vivienda',
            'Lugares públicos',
            'Centro de Educación Alternativa',
            'No accede a internet',
          ]"
          :key="lugar"
        >
          <div class="form-check form-check-inline mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              :value="lugar"
              v-model="formulario.accesoInternet"
            />

            <label class="form-check-label small">
              {{ lugar }}
            </label>
          </div>
        </div>
      </div>
    </div>
    <!-- 7.4.2 FRECUENCIA DE USO DE INTERNET -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.4.2 ¿Con qué frecuencia usa internet?
      </label>

      <div class="row">
        <div
          class="col-md-4"
          v-for="frecuencia in [
            'Diariamente',
            'Más de una vez a la semana',
            'Una vez a la semana',
            'Una vez al mes',
          ]"
          :key="frecuencia"
        >
          <div class="form-check form-check-inline mb-2">
            <input
              class="form-check-input"
              type="radio"
              :value="frecuencia"
              v-model="formulario.frecuenciaInternet"
            />

            <label class="form-check-label small">
              {{ frecuencia }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <!-- 7.5 MEDIO DE COMUNICACIÓN Y TRANSPORTE -->
    <h6 class="fw-bold mb-3">7.5 MEDIO DE COMUNICACIÓN Y TRANSPORTE</h6>

    <!-- 7.5.1 MEDIO DE TRANSPORTE -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.5.1 ¿Qué medio de transporte utiliza frecuentemente para trasladarse
        al Centro de Educación Alternativa?
      </label>

      <div class="row">
        <div
          class="col-md-3"
          v-for="medio in [
            'A pie',
            'Minibús',
            'Microbús',
            'Taxi / Trufi',
            'Camión',
            'Bicicleta',
            'Motocicleta',
            'Transporte fluvial',
          ]"
          :key="medio"
        >
          <div class="form-check form-check-inline mb-2">
            <input
              class="form-check-input"
              type="radio"
              :value="medio"
              v-model="formulario.medioTransporte"
            />

            <label class="form-check-label small">
              {{ medio }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- 7.5.2 TIEMPO DE TRASLADO -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.5.2 ¿Cuánto tiempo demora en llegar al Centro de Educación
        Alternativa?
      </label>

      <div class="row">
        <div class="col-md-6">
          <label class="form-label small"> Horas </label>

          <input
            type="number"
            min="0"
            class="form-control form-control-sm"
            v-model="formulario.tiempoHoras"
          />
        </div>

        <div class="col-md-6">
          <label class="form-label small"> Minutos </label>

          <input
            type="number"
            min="0"
            max="59"
            class="form-control form-control-sm"
            v-model="formulario.tiempoMinutos"
          />
        </div>
      </div>
    </div>

    <!-- 7.5.3 MEDIOS DE COMUNICACIÓN -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        7.5.3 La o el estudiante/participante tiene acceso a:
      </label>

      <div class="row">
        <div
          class="col-md-2"
          v-for="medio in [
            'Radio',
            'Internet',
            'Televisión',
            'Celular',
            'Computadora',
          ]"
          :key="medio"
        >
          <div class="form-check form-check-inline mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              :value="medio"
              v-model="formulario.mediosComunicacion"
            />

            <label class="form-check-label small">
              {{ medio }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <!-- 7.6 SERVICIOS BÁSICOS -->
    <h6 class="fw-bold mb-3">7.6 SERVICIOS BÁSICOS</h6>

    <!-- Agua potable -->
    <div class="mb-3 row">
      <label class="form-label small fw-bold col-md-6">
        7.6.1 ¿Tiene agua potable?
      </label>

      <div class="form-check-inline col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.aguaPotable"
        />
        <label class="form-check-label small ms-4"> Sí </label>
      </div>

      <div class="form-check-inline col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.aguaPotable"
        />
        <label class="form-check-label small ms-4"> No </label>
      </div>
    </div>

    <!-- Alcantarillado -->
    <div class="mb-3 row">
      <label class="form-label small fw-bold col-md-6">
        7.6.2 ¿Cuenta con alcantarillado?
      </label>

      <div class="form-check-inline col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.alcantarillado"
        />
        <label class="form-check-label small ms-4"> Sí </label>
      </div>

      <div class="form-check-inline col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.alcantarillado"
        />
        <label class="form-check-label small ms-4"> No </label>
      </div>
    </div>

    <!-- Energía eléctrica -->
    <div class="mb-3 row">
      <label class="form-label small fw-bold col-md-6">
        7.6.3 ¿Tiene energía eléctrica?
      </label>

      <div class="form-check-inline col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :value="true"
          v-model="formulario.energiaElectrica"
        />
        <label class="form-check-label small ms-4"> Sí </label>
      </div>

      <div class="form-check-inline col-md-2">
        <input
          class="form-check-input"
          type="radio"
          :value="false"
          v-model="formulario.energiaElectrica"
        />
        <label class="form-check-label small ms-4"> No </label>
      </div>
    </div>

    <!-- Tipo de vivienda -->
    <div class="mb-3">
      <label class="form-label small fw-bold">
        7.6.4 La vivienda que ocupa es:
      </label>

      <div class="row">
        <div
          class="col-md-3"
          v-for="tipo in ['Propia', 'Alquilada', 'Anticrético', 'Otro']"
          :key="tipo"
        >
          <div class="form-check form-check-inline mb-2">
            <input
              class="form-check-input"
              type="radio"
              :value="tipo"
              v-model="formulario.tipoVivienda"
            />

            <label class="form-check-label small">
              {{ tipo }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
