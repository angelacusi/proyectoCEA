<script setup>
import { ref, watch } from "vue";

const { formulario } = defineProps({
  formulario: Object,
});

const ocupacionSeleccionada = ref("");

watch(ocupacionSeleccionada, (valor) => {
  formulario.ocupacion = valor === "Otro" ? "" : valor;
});
</script>

<template>
  <div>
    <h5 class="mb-4">Ocupación y vivienda</h5>

    <!-- OCUPACIÓN -->

    <div class="row mb-4 text-start">
      <div class="col-md-6">
        <label class="form-label small">
          ¿Cuál es la ocupación de la o el estudiante?
        </label>

        <select class="form-select" v-model="ocupacionSeleccionada">
          <option value="">Seleccione</option>
          <option>Agricultura</option>
          <option>Obrero</option>
          <option>Empleado</option>
          <option>Gremial</option>
          <option>Trabajadora de hogar</option>
          <option>Emprendedor</option>
          <option>Otro</option>
        </select>
      </div>

      <div v-if="ocupacionSeleccionada === 'Otro'" class="col-md-6">
        <label class="form-label small"> Especifique </label>

        <input
          class="form-control"
          placeholder="Especifique la ocupación"
          v-model="formulario.ocupacion"
        />
      </div>
    </div>
    <!-- TRABAJO -->

    <div class="row mb-4 text-start">
      <!-- TURNO -->

      <div class="col-md-4">
        <label class="form-label small fw-bold"> ¿En qué turno trabaja? </label>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Mañana"
            v-model="formulario.turnoTrabajo"
          />
          <label class="form-check-label"> Mañana </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Tarde"
            v-model="formulario.turnoTrabajo"
          />
          <label class="form-check-label"> Tarde </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Noche"
            v-model="formulario.turnoTrabajo"
          />
          <label class="form-check-label"> Noche </label>
        </div>
      </div>

      <!-- FRECUENCIA -->

      <div class="col-md-4">
        <label class="form-label small fw-bold">
          ¿Con qué frecuencia trabaja?
        </label>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="frecuenciaTrabajo"
            value="Todos los días"
            v-model="formulario.frecuenciaTrabajo"
          />
          <label class="form-check-label"> Todos los días </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="frecuenciaTrabajo"
            value="Días hábiles"
            v-model="formulario.frecuenciaTrabajo"
          />
          <label class="form-check-label"> Días hábiles </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="frecuenciaTrabajo"
            value="Fines de semana"
            v-model="formulario.frecuenciaTrabajo"
          />
          <label class="form-check-label"> Fines de semana </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="frecuenciaTrabajo"
            value="Eventual"
            v-model="formulario.frecuenciaTrabajo"
          />
          <label class="form-check-label"> Eventual </label>
        </div>
      </div>

      <!-- INTERNET -->

      <div class="col-md-4">
        <label class="form-label small fw-bold"> Acceso a internet </label>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Teléfono celular"
            v-model="formulario.accesoInternet"
          />
          <label class="form-check-label"> Teléfono celular </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Su vivienda"
            v-model="formulario.accesoInternet"
          />
          <label class="form-check-label"> Su vivienda </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="Lugares públicos"
            v-model="formulario.accesoInternet"
          />
          <label class="form-check-label"> Lugares públicos </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="CEA"
            v-model="formulario.accesoInternet"
          />
          <label class="form-check-label"> CEA </label>
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value="no accede a internet"
            v-model="formulario.accesoInternet"
          />
          <label class="form-check-label"> No accede a internet </label>
        </div>
      </div>
    </div>

    <!-- TRANSPORTE -->

    <div class="row text-start">
      <div class="col-md-6 mb-3">
        <label class="form-label small">
          ¿Qué medio de transporte utiliza frecuentemente?
        </label>

        <select class="form-select" v-model="formulario.medioTransporte">
          <option value="">Seleccione</option>
          <option>A pie</option>
          <option>Minibús</option>
          <option>Microbús</option>
          <option>Taxi / Trufi</option>
          <option>Camión</option>
          <option>Bicicleta</option>
          <option>Motocicleta</option>
          <option>Transporte fluvial</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small">
          Tiempo que demora en llegar al instituto
        </label>

        <div class="row">
          <div class="col-6">
            <input
              type="number"
              class="form-control"
              placeholder="Horas"
              v-model="formulario.tiempoHoras"
            />
          </div>

          <div class="col-6">
            <input
              type="number"
              class="form-control"
              placeholder="Minutos"
              v-model="formulario.tiempoMinutos"
            />
          </div>
        </div>
      </div>
    </div>

    <hr />

    <!-- ACCESO A -->

    <h6 class="mb-3">Tiene acceso a</h6>

    <div class="row text-start">
      <div class="col-md-4 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="formulario.radio"
        />
        <label class="form-check-label">Radio</label>
      </div>

      <div class="col-md-4 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="formulario.internet"
        />
        <label class="form-check-label">Internet</label>
      </div>

      <div class="col-md-4 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="formulario.television"
        />
        <label class="form-check-label">Televisión</label>
      </div>

      <div class="col-md-4 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="formulario.celularPropio"
        />
        <label class="form-check-label">Celular</label>
      </div>

      <div class="col-md-4 form-check">
        <input
          class="form-check-input"
          type="checkbox"
          v-model="formulario.computadora"
        />
        <label class="form-check-label">Computadora</label>
      </div>
    </div>

    <hr />

    <!-- SERVICIOS -->

    <div class="row text-start">
      <div class="col-md-3 mb-3">
        <label class="form-label small"> Agua potable </label>

        <select class="form-select" v-model="formulario.aguaPotable">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label small"> Alcantarillado </label>

        <select class="form-select" v-model="formulario.alcantarillado">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label small"> Energía eléctrica </label>

        <select class="form-select" v-model="formulario.energiaElectrica">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>
      </div>

      <div class="col-md-3 mb-3">
        <label class="form-label small"> Vivienda que ocupa </label>

        <select class="form-select" v-model="formulario.tipoVivienda">
          <option value="">Seleccione</option>
          <option>Propia</option>
          <option>Alquilada</option>
          <option>Anticrético</option>
          <option>Otro</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label {
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
