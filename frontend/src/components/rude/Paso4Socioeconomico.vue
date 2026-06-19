<script setup>
defineProps({
  formulario: Object,
});

const gruposSanguineos = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const pueblos = [
  "Ninguno",
  "Chiman",
  "Mojeño-Ignaciano",
  "Tapiete",
  "Afroboliviano",
  "Ese Ejja",
  "Mojeño-Trinitario",
  "Toromona",
  "Araona",
  "Guaraní",
  "Moré",
  "Uru-Chipaya",
  "Aymara",
  "Guarasuawe",
  "Mosetén",
  "Weenhayek",
  "Baure",
  "Guarayo",
  "Movima",
  "Yaminawa",
  "Bésiro",
  "Itonoma",
  "Tacawara",
  "Yuki",
  "Canichana",
  "Leco",
  "Puquina",
  "Yuracaré",
  "Cavineño",
  "Machajuyai-Kallawaya",
  "Quechua",
  "Zamuco",
  "Cayubaba",
  "Machineri",
  "Sirionó",
  "Chachacobo",
  "Maropa",
  "Tacana",
];
</script>

<template>
  <div>
    <h6 class="fw-bold mb-4">7. ASPECTOS SOCIOECONOMICOS</h6>

    <!-- 7.1 IDIOMAS -->
    <h6 class="fw-bold mb-3">7.1 IDIOMA Y PERTENENCIA CULTURAL</h6>

    <div class="row">
      <div class="col-md-4 mb-3">
        <label class="form-label small fw-bold">
          Idioma que aprendió a hablar en su niñez
        </label>

        <input
          class="form-control form-control-sm"
          v-model="formulario.idiomaMaterno"
        />
      </div>

      <div class="col-md-8 mb-3">
        <label class="form-label small fw-bold">
          Idiomas que habla frecuentemente
        </label>

        <div class="row">
          <div class="col-md-4 mb-2">
            <input
              class="form-control form-control-sm"
              placeholder="Idioma 1"
              v-model="formulario.idioma1"
            />
          </div>

          <div class="col-md-4 mb-2">
            <input
              class="form-control form-control-sm"
              placeholder="Idioma 2"
              v-model="formulario.idioma2"
            />
          </div>

          <div class="col-md-4 mb-2">
            <input
              class="form-control form-control-sm"
              placeholder="Idioma 3"
              v-model="formulario.idioma3"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Pueblo indígena -->
    <div class="mb-4">
      <label class="form-label small fw-bold">
        ¿Pertenece a una nación o pueblo indígena originario campesino o
        afroboliviano?
      </label>

      <select
        class="form-select form-select-sm"
        v-model="formulario.puebloIndigena"
      >
        <option v-for="pueblo in pueblos" :key="pueblo" :value="pueblo">
          {{ pueblo }}
        </option>
      </select>
    </div>

    <hr class="my-4" />

    <!-- SALUD -->
    <h6 class="fw-bold mb-3">7.2 SALUD</h6>

    <!-- Centro de salud -->
    <div class="mb-3">
      <label class="form-label small fw-bold">
        ¿Existe algún Centro de Salud, Posta u Hospital en su comunidad, barrio
        o zona?
      </label>

      <div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            :value="true"
            v-model="formulario.hayCentroSalud"
          />
          <label class="form-check-label small"> Sí </label>
        </div>

        <div class="form-check form-check-inline ms-4">
          <input
            class="form-check-input"
            type="radio"
            :value="false"
            v-model="formulario.hayCentroSalud"
          />
          <label class="form-check-label small"> No </label>
        </div>
      </div>
    </div>

    <!-- Seguro de salud -->
    <div class="mb-4">
      <label class="form-label small fw-bold"> ¿Tiene seguro de salud? </label>

      <div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            :value="true"
            v-model="formulario.tieneSeguro"
          />
          <label class="form-check-label small"> Sí </label>
        </div>

        <div class="form-check form-check-inline ms-4">
          <input
            class="form-check-input"
            type="radio"
            :value="false"
            v-model="formulario.tieneSeguro"
          />
          <label class="form-check-label small"> No </label>
        </div>
      </div>
    </div>

    <!-- Atención de salud y grupo sanguíneo -->
    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold">
          ¿Dónde acude en caso de enfermedad o accidente?
        </label>

        <select
          class="form-select form-select-sm"
          v-model="formulario.atencionSalud"
        >
          <option value="">Seleccione</option>

          <option value="seguro">Caja o seguro de salud</option>

          <option value="publica">Establecimiento de salud pública</option>

          <option value="privada">Establecimiento de salud privada</option>

          <option value="tradicional">Medicina tradicional</option>

          <option value="farmacia">Farmacia sin receta médica</option>

          <option value="vivienda">En su vivienda</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label small fw-bold"> Grupo sanguíneo </label>

        <select
          class="form-select form-select-sm"
          v-model="formulario.grupoSanguineo"
        >
          <option value="">Seleccione</option>

          <option v-for="grupo in gruposSanguineos" :key="grupo" :value="grupo">
            {{ grupo }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
