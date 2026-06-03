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
    <h5 class="mb-4">Aspectos socioeconómicos</h5>

    <!-- IDIOMAS -->

    <h6 class="mb-3">Idiomas</h6>

    <div class="row">
      <div class="col-md-3 mb-3">
        <label class="form-label small">
          Idioma que aprendió a hablar en su niñez
        </label>

        <input class="form-control" v-model="formulario.idiomaMaterno" />
      </div>

      <div class="col-md-9 mb-3">
        <label class="form-label small">
          ¿Qué idioma(s) habla frecuentemente?
        </label>

        <div class="row">
          <div class="col-4">
            <input
              class="form-control"
              placeholder="Idioma 1"
              v-model="formulario.idioma1"
            />
          </div>

          <div class="col-4">
            <input
              class="form-control"
              placeholder="Idioma 2"
              v-model="formulario.idioma2"
            />
          </div>

          <div class="col-4">
            <input
              class="form-control"
              placeholder="Idioma 3"
              v-model="formulario.idioma3"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- PUEBLO INDÍGENA -->

    <div class="mb-4">
      <label class="form-label">
        ¿Pertenece a una nación, pueblo indígena originario campesino o
        afroboliviano?
      </label>

      <select class="form-select" v-model="formulario.puebloIndigena">
        <option v-for="pueblo in pueblos" :key="pueblo" :value="pueblo">
          {{ pueblo }}
        </option>
      </select>
    </div>

    <hr />

    <!-- SALUD -->

    <h6 class="mb-3">Salud</h6>

    <div class="row">
      <div class="col-md-6 mb-3">
        <label class="form-label">
          ¿Existe algún Centro de Salud, Posta u Hospital en su comunidad,
          barrio o zona?
        </label>

        <select class="form-select" v-model="formulario.hayCentroSalud">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> ¿Tiene seguro de salud? </label>

        <select class="form-select" v-model="formulario.tieneSeguro">
          <option :value="true">Sí</option>
          <option :value="false">No</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label">
          ¿Dónde acude en caso de enfermedad o accidente?
        </label>

        <select class="form-select" v-model="formulario.atencionSalud">
          <option value="">Seleccione</option>

          <option>Caja o seguro de salud</option>

          <option>Establecimiento de salud pública</option>

          <option>Establecimiento de salud privada</option>

          <option>Medicina tradicional</option>

          <option>Farmacia sin receta médica</option>

          <option>En su vivienda</option>
        </select>
      </div>

      <div class="col-md-6 mb-3">
        <label class="form-label"> Grupo sanguíneo </label>

        <select class="form-select" v-model="formulario.grupoSanguineo">
          <option value="">Seleccione</option>

          <option v-for="grupo in gruposSanguineos" :key="grupo" :value="grupo">
            {{ grupo }}
          </option>
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
