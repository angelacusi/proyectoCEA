<script setup>
import { ref, reactive } from "vue";
import Stepper from "./stepper.vue";

import { jsPDF } from "jspdf";
import Paso1Estudiante from "./rude/Paso1Estudiante.vue";
import Paso2Condiciones from "./rude/Paso2Condiciones.vue";
import Paso3Direccion from "./rude/Paso3Direccion.vue";
import Paso4Socioeconomico from "./rude/Paso4Socioeconomico.vue";
import Paso5Ocupacion from "./rude/Paso5Ocupacion.vue";
import Paso6Inscripcion from "./rude/Paso6Inscripcion.vue";

const pasoActual = ref(1);

const steps = [
  "Estudiante",
  "Complemento",
  "Dirección",
  "Socioeconómico",
  "Ocupación",
  "Inscripción",
];

// OBTENER IMAGEN
async function loadImage(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}

const fecha = new Date();

const dia = fecha.getDate().toString().padStart(2, "0");
const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
const anio = fecha.getFullYear().toString();

// CREAR PDF
const generarPDF = async () => {
  const image = await loadImage("/rudeimage.jpg");
  console.log(form);
  const pdf = new jsPDF("p", "mm", "legal");
  pdf.addImage(image, "JPEG", 0, 0, 216, 356);

  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(0, 0, 150);

  // poner datos
  pdf.text("Boliviano Áleman", 23.4, 58.76);
  pdf.setCharSpace(2.05);
  pdf.text(form.apPaterno.toUpperCase(), 42.05, 69);
  pdf.text(form.apMaterno.toUpperCase(), 42.05, 72.97);
  pdf.text(form.nombres.toUpperCase(), 42.05, 76.92);
  pdf.text(form.ci, 45.39, 84.75);
  pdf.text(form.complemento, 84.97, 84.75);
  pdf.text(form.expedido, 101.55, 84.75);

  pdf.text(form.paisNacimiento.toUpperCase(), 32.06, 93.06);

  pdf.text(form.departamentoNacimiento.toUpperCase(), 75.24, 92.96);
  pdf.text(form.provinciaNacimiento.toUpperCase(), 32.06, 96.52);
  pdf.text(form.localidadNacimiento.toUpperCase(), 75.24, 96.52);

  pdf.setCharSpace(0, 5);

  const [anio, mes, dia] = form.fechaNacimiento.split("-");

  pdf.text(dia, 158.4, 69.38);
  pdf.text(mes, 168.84, 69.38);
  pdf.text(anio, 178.92, 69.38);

  pdf.text(form.oficialia, 114.84, 69.51);
  pdf.text(form.libro, 124.55, 69.51);
  pdf.text(form.partida, 134.64, 69.51);
  pdf.text(form.folio, 144.0, 69.51);

  if (form.sexo === "Femenino") {
    pdf.ellipse(128.18, 84.85, 1, 0.5, "f");
  } else if (form.sexo === "Masculino") {
    pdf.ellipse(128.18, 87.09, 1, 0.5, "f");
  }
  pdf.text(form.numeroHijos.toString(), 143.28, 87.02);

  if (form.estadoCivil === "Soltera/o") {
    pdf.text("x", 162.58, 89);
  } else if (form.estadoCivil === "Conviviente") {
    pdf.text("x", 169.42, 89);
  } else if (form.estadoCivil === "Casada/o") {
    pdf.text("x", 175.9, 89);
  } else if (form.estadoCivil === "Viuda/o") {
    pdf.text("x", 182.52, 89);
  } else if (form.estadoCivil === "Divorciada/o") {
    pdf.text("x", 189.0, 89);
  }

  // PASO 2
  if (form.tieneDiscapacidad) {
    pdf.text("X", 111.24, 105.24);
    if (form.tipoRegistro === "CODEPEDIS") {
      pdf.text("x", 72.0, 107.91);
    } else if (form.tipoRegistro === "IBC") {
      pdf.text("x", 84.96, 107.54);
    }
    pdf.setCharSpace(2.05);
    pdf.text(form.nDiscapacidad.toString(), 98.28, 108.03);
    switch (form.tipoDiscapacidad) {
      case "Visual":
        pdf.text("x", 68.76, 118.37);
        switch (form.gradoDiscapacidad) {
          case "Ceguera total":
            pdf.text("x", 71.28, 123.05);
            break;
          case "Baja visión":
            pdf.text("x", 71.28, 125.94);
            break;
        }
        break;

      case "Física-Motora":
        pdf.text("x", 131.76, 118.01);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 127.44, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 127.44, 123.27);
            break;

          case "Grave":
            pdf.text("x", 127.44, 125.79);
            break;

          case "Muy Grave":
            pdf.text("x", 127.44, 128.68);
            break;
        }
        break;

      case "Auditiva":
        pdf.text("x", 39.96, 118.28);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 41.4, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 41.4, 123.27);
            break;

          case "Grave":
            pdf.text("x", 41.4, 126.15);
            break;

          case "Muy Grave":
            pdf.text("x", 41.4, 128.68);
            break;
        }
        break;

      case "Intelectual":
        pdf.text("x", 101.16, 118.3);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 97.92, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 97.56, 123.27);
            break;

          case "Grave":
            pdf.text("x", 97.56, 125.79);
            break;

          case "Muy Grave":
            pdf.text("x", 97.56, 128.68);
            break;
        }
        break;

      case "Mental o Psíquica":
        pdf.text("x", 163.44, 118.37);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 156.96, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 156.96, 123.27);
            break;

          case "Grave":
            pdf.text("x", 156.96, 125.79);
            break;

          case "Muy Grave":
            pdf.text("x", 156.96, 128.68);
            break;
        }
        break;

      case "Múltiple":
        pdf.text("X", 185.4, 118.37);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 186.84, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 186.84, 123.27);
            break;

          case "Grave":
            pdf.text("x", 186.84, 126.15);
            break;

          case "Muy Grave":
            pdf.text("x", 186.84, 128.68);
            break;
        }
        break;
    }

    if (form.origenDiscapacidad === "nacimiento") {
      pdf.text("x", 86.76, 132.64);
    } else if (form.origenDiscapacidad === "Adquirida") {
      pdf.text("x", 98.28, 132.64);
    }
  } else {
    pdf.text("X", 137.88, 105.24);
  }

  if (form.tieneTEA) {
    pdf.text("x", 51.12, 139.28);
    switch (form.tipoTEA) {
      case "1":
        pdf.text("x", 84.96, 141.7);
        break;
      case "2":
        pdf.text("x", 94.32, 141.7);
        break;
      case "3":
        pdf.text("x", 103.32, 141.7);
        break;
    }
  } else {
    pdf.text("x", 67.68, 138.92);
  }

  if (form.esExtranjero) {
    switch (form.documentoExtranjero) {
      case "Extranjero":
        pdf.text("X", 61.92, 153.24);
        break;
      case "DNI":
        pdf.text("X", 61.56, 158.29);
        break;
      case "Diplomatico":
        pdf.text("X", 101.52, 153.24);
        break;
      case "Pasaporte":
        pdf.text("X", 101.16, 158.29);
        break;
      case "Nacimiento":
        pdf.text("X", 137.52, 153.24);
        break;
      case "Declaracion":
        pdf.text("X", 137.52, 157.92);
        break;
    }
    pdf.text(form.codigoExtranjero, 147.6, 157.92);
  }

  // PASO 3
  pdf.setCharSpace(0);

  pdf.text(form.departamento, 41.5, 166.07);
  pdf.text(form.provincia, 41.5, 170.36);
  pdf.text(form.municipio, 41.5, 174.32);
  pdf.text(form.localidad, 41.5, 178.29);
  pdf.text(form.zona, 41.5, 181.89);
  pdf.text(form.calle, 41.4, 185.86);
  pdf.text(form.numeroVivienda, 41.5, 189.83);
  pdf.text(form.celular, 84.6, 185.86);
  pdf.text(form.telefono, 84.6, 189.83);

  if (form.esSoldado) {
    pdf.text("X", 152.64, 170.47);
    pdf.text(form.unidadMilitar.toUpperCase(), 140.76, 174.44);
  } else {
    pdf.text("X", 172.44, 170.47);
  }

  if (form.contextoEncierro) {
    pdf.text("X", 152.28, 178.4);
    pdf.text(form.centroPenitenciario.toUpperCase(), 153.72, 182.37);
  } else {
    pdf.text("X", 172.44, 178.4);
  }

  if (form.trabajadoraHogar) {
    pdf.text("X", 152.64, 185.98);
  } else {
    pdf.text("X", 172.44, 186.34);
  }

  pdf.text(form.otroContexto.toUpperCase(), 120.96, 189.94);

  // // PASO 4
  pdf.text(form.idiomaMaterno.toUpperCase(), 21.96, 211.93);

  pdf.text(form.idioma1.toUpperCase(), 21.6, 227.44);
  pdf.text(form.idioma2.toUpperCase(), 21.6, 230.68);
  pdf.text(form.idioma3.toUpperCase(), 21.96, 233.93);

  switch (form.puebloIndigena) {
    case "Ninguno":
      pdf.text("X", 61.56, 204.06);
      break;

    case "Chiman":
      pdf.text("X", 84.96, 204.56);
      break;

    case "Mojeño-Ignaciano":
      pdf.text("X", 104.76, 204.56);
      break;

    case "Tapiete":
      pdf.text("X", 121.32, 204.2);
      break;

    case "Afroboliviano":
      pdf.text("X", 121.32, 204.2);
      break;

    case "EseEjja":
      pdf.text("X", 121.32, 204.2);
      break;

    case "Mojeño-Trinitario":
      pdf.text("X", 104.76, 207.45);
      break;

    case "Toromona":
      pdf.text("X", 121.32, 207.81);
      break;

    case "Araona":
      pdf.text("X", 62.28, 211.05);
      break;

    case "Guaraní":
      pdf.text("X", 85.32, 211.05);
      break;

    case "Moré":
      pdf.text("X", 104.76, 211.05);
      break;

    case "Uru-Chipaya":
      pdf.text("X", 121.32, 211.05);
      break;

    case "Aymara":
      pdf.text("X", 61.92, 214.3);
      break;

    case "Guarasuawe":
      pdf.text("X", 85.32, 214.3);
      break;

    case "Mosetén":
      pdf.text("X", 104.76, 214.3);
      break;

    case "Weenhayek":
      pdf.text("X", 121.32, 214.3);
      break;

    case "Baure":
      pdf.text("X", 61.92, 217.54);
      break;

    case "Guarayo":
      pdf.text("X", 85.32, 217.54);
      break;

    case "Movima":
      pdf.text("X", 104.76, 217.54);
      break;

    case "Yaminawa":
      pdf.text("X", 121.32, 217.18);
      break;

    case "Bésiro":
      pdf.text("X", 62.28, 220.79);
      break;

    case "Itonoma":
      pdf.text("X", 84.96, 220.79);
      break;

    case "Tacawara":
      pdf.text("X", 104.76, 220.79);
      break;

    case "Yuki":
      pdf.text("X", 121.32, 220.79);
      break;

    case "Canichana":
      pdf.text("X", 61.92, 224.03);
      break;

    case "Leco":
      pdf.text("X", 84.96, 224.03);
      break;

    case "Puquina":
      pdf.text("X", 104.76, 224.03);
      break;

    case "Yuracaré":
      pdf.text("X", 121.32, 224.03);
      break;

    case "Cavineño":
      pdf.text("X", 61.92, 227.28);
      break;

    case "Machajuyai-Kallawaya":
      pdf.text("X", 85.32, 227.64);
      break;

    case "Quechua":
      pdf.text("X", 104.76, 227.28);
      break;

    case "Zamuco":
      pdf.text("X", 121.32, 227.28);
      break;

    case "Cayubaba":
      pdf.text("X", 61.92, 230.71);
      break;

    case "Machineri":
      pdf.text("X", 85.32, 230.71);
      break;

    case "Sirionó":
      pdf.text("X", 104.76, 230.71);
      break;

    case "Chachacobo":
      pdf.text("X", 61.92, 233.96);
      break;

    case "Maropa":
      pdf.text("X", 84.96, 233.96);
      break;

    case "Tacana":
      pdf.text("X", 104.76, 233.96);
      break;
  }

  if (form.hayCentroSalud) {
    pdf.text("x", 190.8, 200.04);
  } else {
    pdf.text("x", 190.8, 202.56);
  }

  switch (form.atencionSalud) {
    case "seguro":
      pdf.text("X", 160.92, 210.85);
      break;
    case "publica":
      pdf.text("X", 160.92, 214.1);
      break;
    case "privada":
      pdf.text("X", 160.92, 217.34);
      break;
    case "farmacia":
      pdf.text("X", 190.8, 217.7);
      break;
    case "vivienda":
      pdf.text("X", 190.8, 210.85);
      break;
    case "tradicional":
      pdf.text("X", 190.8, 214.1);
      break;
  }

  if (form.tieneSeguro) {
    pdf.text("X", 171.0, 224.19);
  } else {
    pdf.text("X", 183.96, 224.19);
  }

  pdf.text(form.grupoSanguineo, 173.88, 230.68);

  // PASO 5

  switch (form.ocupacion) {
    case "Agricultura":
      pdf.text("X", 38.88, 244.6);
      break;

    case "Obrero":
      pdf.text("X", 61.92, 244.96);
      break;

    case "Empleado":
      pdf.text("X", 61.92, 248.2);
      break;

    case "Gremial":
      pdf.text("X", 38.88, 248.2);
      break;

    case "Trabajadora de hogar":
      pdf.text("X", 38.88, 251.09);
      break;

    case "Emprendedor":
      pdf.text("X", 61.92, 251.45);
      break;

    case "Otro":
      pdf.text("X", 38.88, 255.42);
      pdf.text(form.ocupacionOtro, 48.24, 255.42);
      break;
  }

  if (form.turnoTrabajo.includes("Mañana")) {
    pdf.text("X", 104.76, 245.14);
  }

  if (form.turnoTrabajo.includes("Tarde")) {
    pdf.text("X", 114.84, 245.14);
  }

  if (form.turnoTrabajo.includes("Noche")) {
    pdf.text("X", 124.92, 245.14);
  }

  switch (form.frecuenciaTrabajo) {
    case "Todos los días":
      pdf.ellipse(88.56, 251.09, 1, 0.5, "F");
      break;

    case "Días hábiles":
      pdf.ellipse(88.56, 254.69, 2.5, 1.5, "F");
      break;

    case "Fines de semana":
      pdf.ellipse(105.12, 250.73, 2.5, 1.5, "F");
      break;

    case "Días festivos":
      pdf.ellipse(128.16, 250.73, 2.5, 1.5, "F");
      break;

    case "Eventual / esporádico":
      pdf.ellipse(105.48, 255.06, 2.5, 1.5, "F");
      break;
    case "En vacaciones":
      pdf.ellipse(128.16, 254.69, 2.5, 1.5, "F");
      break;
  }

  if (form.accesoInternet.includes("Teléfono celular")) {
    pdf.text("X", 157.68, 244.6);
  }

  if (form.accesoInternet.includes("Su vivienda")) {
    pdf.text("X", 170.64, 244.96);
  }

  if (form.accesoInternet.includes("Lugares públicos")) {
    pdf.text("X", 190.8, 244.6);
  }

  if (form.accesoInternet.includes("Centro de Educación Alternativa")) {
    pdf.text("X", 170.64, 248.2);
  }

  if (form.accesoInternet.includes("No accede a internet")) {
    pdf.text("X", 190.8, 247.84);
  }

  switch (form.frecuenciaInternet) {
    case "Diariamente":
      pdf.text("X", 164.52, 253.61);
      break;

    case "Más de una vez a la semana":
      pdf.text("X", 190.8, 253.25);
      break;

    case "Una vez a la semana":
      pdf.text("X", 164.16, 257.58);
      break;

    case "Una vez al mes":
      pdf.text("X", 190.8, 257.58);
      break;
  }

  switch (form.medioTransporte) {
    case "A pie":
      pdf.text("X", 38.88, 268.4);
      break;

    case "Minibús":
      pdf.text("X", 58.68, 268.4);
      break;

    case "Microbús":
      pdf.text("X", 38.88, 272.0);
      break;

    case "Taxi / Trufi":
      pdf.text("X", 58.68, 271.64);
      break;

    case "Camión":
      pdf.text("X", 78.48, 268.4);
      break;

    case "Bicicleta":
      pdf.text("X", 98.28, 268.4);
      break;

    case "Motocicleta":
      pdf.text("X", 78.48, 272.0);
      break;

    case "Transporte fluvial":
      pdf.text("X", 98.28, 271.64);
      break;
  }
  pdf.setCharSpace(2.1);
  pdf.text(form.tiempoHoras.toString(), 95.04, 275);
  pdf.text(form.tiempoMinutos.toString(), 94.68, 278.7);

  if (form.accesoRadio) {
    pdf.text("X", 124.92, 268.76);
  }

  if (form.accesoTelevision) {
    pdf.text("X", 124.56, 271.64);
  }

  if (form.accesoCelular) {
    pdf.text("X", 147.6, 271.64);
  }

  if (form.accesoComputadora) {
    pdf.text("X", 147.6, 275.25);
  }

  if (form.accesoInternetHogar) {
    pdf.text("X", 147.6, 268.76);
  }

  if (form.aguaPotable) {
    pdf.ellipse(184.32, 264.07, 1, 0.5, "F");
  } else {
    pdf.ellipse(190.8, 263.71, 1, 0.5, "F");
  }

  if (form.alcantarillado) {
    pdf.ellipse(184.32, 268.03, 1, 0.5, "F");
  } else {
    pdf.ellipse(190.8, 268.03, 1, 0.5, "F");
  }

  if (form.energiaElectrica) {
    pdf.ellipse(184.32, 271.28, 1, 0.5, "F");
  } else {
    pdf.ellipse(190.8, 271.28, 1, 0.5, "F");
  }

  switch (form.tipoVivienda) {
    case "Propia":
      pdf.ellipse(159.48, 277.41, 1, 0.5, "F");
      break;

    case "Alquilada":
      pdf.ellipse(171.36, 277.41, 1, 0.5, "F");
      break;

    case "Anticrético":
      pdf.ellipse(182.16, 277.41, 1, 0.5, "F");
      break;

    case "Otro":
      pdf.ellipse(191.16, 277.41, 1, 0.5, "F");
      break;
  }

  // // PASO 6

  switch (form.modalidadEstudio) {
    case "Presencial":
      pdf.text("X", 39.24, 288.08);
      break;

    case "Semipresencial":
      pdf.text("X", 39.6, 290.72);
      break;

    case "A distancia":
      pdf.text("X", 39.24, 293.87);
      break;
  }

  switch (form.turnoEstudio) {
    case "Mañana":
      pdf.text("X", 55.44, 303.05);
      break;

    case "Tarde":
      pdf.text("X", 55.44, 305.94);
      break;

    case "Noche":
      pdf.text("X", 55.44, 308.46);
      break;
  }

  // Semestre
  if (form.semestre === "Primer semestre") {
    switch (form.nivelETTP) {
      case "Técnico Básico":
        pdf.ellipse(157.68, 287.55, 1, 0.5, "F");

        break;

      case "Técnico Auxiliar":
        pdf.ellipse(173.52, 287.55, 1, 0.5, "F");
        break;

      case "Técnico Medio":
        pdf.ellipse(188.64, 287.55, 1, 0.5, "F");
        break;
    }
    pdf.setCharSpace(0);

    pdf.text(form.carrera.toUpperCase(), 148.32, 290.86);
  } else if (form.semestre === "Segundo semestre") {
    switch (form.nivelETTP) {
      case "Técnico Básico":
        pdf.ellipse(157.68, 293.32, 1, 0.5, "F");
        break;

      case "Técnico Auxiliar":
        pdf.ellipse(173.52, 293.39, 1, 0.5, "F");
        break;

      case "Técnico Medio":
        pdf.ellipse(189.0, 293.39, 1, 0.5, "F");
        break;
    }

    pdf.text(form.carrera.toUpperCase(), 147.96, 296.63);
  }
  pdf.setCharSpace(0);

  pdf.text(dia, 142.56, 314.2);
  pdf.text(mes, 159.84, 313.87);
  pdf.text(anio, 181.08, 313.7);
  pdf.save("rude.pdf");

  // LIMPIADO
  const modal = bootstrap.Modal.getInstance(
    document.getElementById("modalRude"),
  );

  modal.hide();

  limpiarFormulario();

  mostrarAlerta = true;
};
function limpiarFormulario() {
  Object.assign(form, formularioInicial);
}
const formularioInicial = {
  apPaterno: "",
  apMaterno: "",
  // todos tus campos...
};

// DATOS DEL FORMULARIO
const form = reactive({
  // PASO 1
  apPaterno: "Aasjaksjcsa",
  apMaterno: "Bcdcdscsc",
  nombres: "Ccdscsc dcsd csd",
  ci: "123456",
  complemento: "1A",
  expedido: "LP",
  fechaNacimiento: "2000-01-01",
  oficialia: "3233",
  libro: "3233",
  partida: "3233",
  folio: "3233",
  paisNacimiento: "BOLIVIA",
  departamentoNacimiento: "COCHABAMBA",
  provinciaNacimiento: "MURILLO",
  localidadNacimiento: "LP",
  sexo: "Femenino",
  numeroHijos: "10",
  estadoCivil: "soltera/o",

  // PASO 2
  tieneDiscapacidad: true,
  tipoRegistro: "IBC",
  nDiscapacidad: "123",
  tipoDiscapacidad: "Visual",
  gradoDiscapacidad: "Baja visión",
  origenDiscapacidad: "nacimiento",

  tieneTEA: true,
  tipoTEA: "1",

  esExtranjero: true,
  documentoExtranjero: "Pasaporte",
  codigoExtranjero: "ABC123",

  // PASO 3
  departamento: "LP",
  provincia: "MURILLO",
  municipio: "LP",
  localidad: "CENTRO",
  zona: "SOPnanina",
  calle: "severo aparicio",
  numeroVivienda: "160",

  celular: "77777777",
  telefono: "2222222",

  esSoldado: true,
  unidadMilitar: "R1",

  contextoEncierro: true,
  centroPenitenciario: "CP",

  trabajadoraHogar: true,

  otroContexto: "OTuiuiRO",

  // PASO 4
  idiomaMaterno: "ESP",

  idioma1: "ESP",
  idioma2: "AYM",
  idioma3: "ING",

  puebloIndigena: "Aymara",

  hayCentroSalud: true,

  atencionSalud: "publica",

  tieneSeguro: true,

  grupoSanguineo: "O+",

  // PASO 5
  ocupacion: "Empleado",

  turnoTrabajo: ["Mañana", "Tarde"],

  frecuenciaTrabajo: "Todos los días",

  accesoInternet: ["Teléfono celular", "Su vivienda"],

  frecuenciaInternet: "Diariamente",

  medioTransporte: "Minibús",

  tiempoHoras: "01",
  tiempoMinutos: "30",

  accesoComunicacion: ["Radio", "Internet", "Celular"],

  aguaPotable: true,
  alcantarillado: true,
  energiaElectrica: true,

  tipoVivienda: "Propia",

  // PASO 6
  modalidadEstudio: "Presencial",
  semestre: "Primer semestre",

  nivelTecnico: "Técnico Medio",

  turnoEstudio: "Noche",

  carrera: "Sistemas Informáticos",
});

const siguientePaso = () => {
  if (pasoActual.value < 6) {
    pasoActual.value++;
  }
};

const anteriorPaso = () => {
  if (pasoActual.value > 1) {
    pasoActual.value--;
  }
};
</script>
<style scoped>
.rude-modal {
  background-color: var(--card);
}
</style>
<template>
  <div
    class="modal fade"
    id="modalRude"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-lg modal-dialog-scrollable modal-dialog-centered"
    >
      <div class="modal-content rude-modal">
        <div class="modal-header">
          <h4 class="modal-title">Formulario RUDEAL</h4>

          <button type="button" class="btn-close" data-bs-dismiss="modal" />
        </div>
        <div>
          <Stepper :currentStep="pasoActual" :steps="steps" />
          <hr />
        </div>

        <div class="modal-body">
          <Paso1Estudiante v-if="pasoActual === 1" :formulario="form" />

          <Paso2Condiciones v-if="pasoActual === 2" :formulario="form" />

          <Paso3Direccion v-if="pasoActual === 3" :formulario="form" />

          <Paso4Socioeconomico v-if="pasoActual === 4" :formulario="form" />

          <Paso5Ocupacion v-if="pasoActual === 5" :formulario="form" />

          <Paso6Inscripcion v-if="pasoActual === 6" :formulario="form" />
        </div>

        <div class="modal-footer">
          <button
            v-if="pasoActual > 1"
            type="button"
            class="btn btn-secondary"
            @click="anteriorPaso"
          >
            Anterior
          </button>

          <button
            v-if="pasoActual < 6"
            type="button"
            class="btn btn-primary"
            @click="siguientePaso"
          >
            Siguiente
          </button>

          <button
            v-if="pasoActual === 6"
            type="button"
            class="btn btn-success"
            @click="generarPDF"
          >
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
