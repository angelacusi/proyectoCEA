import { reactive, ref } from "vue";
import { generarRude } from "../utils/generarRude";
import Swal from "sweetalert2";
import * as bootstrap from "bootstrap";

export function useRude() {
  const pasoActual = ref(1);

  const steps = [
    "Datos personales",
    "Condiciones especiales",
    "Dirección y contexto diverso",
    "Aspectos socioeconómicos",
    "Ocupación y vivienda",
    "Inscripción",
  ];

  // DATOS DEL FORMULARIO
  const form = reactive({
    // PASO 1 - Datos personales
    apPaterno: "",
    apMaterno: "",
    nombres: "",
    ci: "",
    complemento: "",
    expedido: "",
    fechaNacimiento: "",
    oficialia: "",
    libro: "",
    partida: "",
    folio: "",

    paisNacimiento: "",
    departamentoNacimiento: "",
    provinciaNacimiento: "",
    localidadNacimiento: "",

    sexo: "",
    numeroHijos: "",
    estadoCivil: "",

    // PASO 2 - Condiciones especiales
    tieneDiscapacidad: null,

    tipoRegistro: "",
    nDiscapacidad: "",

    tipoDiscapacidad: "",
    gradoDiscapacidad: "",
    origenDiscapacidad: "",

    tieneTEA: null,
    tipoTEA: "",

    esExtranjero: null,
    documentoExtranjero: "",
    codigoExtranjero: "",

    // PASO 3 - Dirección
    departamento: "",
    provincia: "",
    municipio: "",
    localidad: "",
    zona: "",
    calle: "",
    numeroVivienda: "",

    celular: "",
    telefono: "",

    // PASO 3 - Educación diversa
    esSoldado: null,
    unidadMilitar: "",

    contextoEncierro: null,
    centroPenitenciario: "",

    trabajadoraHogar: null,

    otroContexto: "",

    // PASO 4 - Aspectos socioeconómicos
    idiomaMaterno: "",

    idioma1: "",
    idioma2: "",
    idioma3: "",

    puebloIndigena: "",

    hayCentroSalud: null,

    atencionSalud: "",

    tieneSeguro: null,

    grupoSanguineo: "",

    // PASO 5 - Ocupación y vivienda
    ocupacion: "",
    ocupacionOtro: "",
    turnoTrabajo: [],

    frecuenciaTrabajo: "",

    accesoInternet: [],

    frecuenciaInternet: "",

    medioTransporte: "",

    tiempoHoras: "",
    tiempoMinutos: "",

    accesoComunicacion: [],

    aguaPotable: null,
    alcantarillado: null,
    energiaElectrica: null,

    tipoVivienda: "",

    // PASO 6 - Inscripción ETTP
    modalidadEstudio: "",

    semestre: "",

    nivel: "",

    turnoEstudio: "",

    carrera: "",
  });

  const irArriba = () => {
    const body = document.querySelector(".modal-body");
    if (body) {
      body.scrollTop = 0;
    }
  };

  // SIGUIENTE PASO
  const siguientePaso = () => {
    if (pasoActual.value < 6) {
      pasoActual.value++;
      irArriba();
    }
  };

  // PASO ANTERIOR
  const anteriorPaso = () => {
    if (pasoActual.value > 1) {
      pasoActual.value--;
      irArriba();
    }
  };

  // LIMPIAR FORMULARIO
  const limpiarFormulario = () => {
    Object.keys(form).forEach((key) => {
      if (Array.isArray(form[key])) {
        form[key] = [];
      } else if (typeof form[key] === "boolean") {
        form[key] = null;
      } else {
        form[key] = "";
      }
    });

    pasoActual.value = 1;
  };
  async function generarPDF() {
    await generarRude(form);

    const modalElement = document.getElementById("modalRude");
    const modal = bootstrap.Modal.getInstance(modalElement);
    document.activeElement?.blur();
    if (modal) {
      modal.hide();
    }

    // ESPERAR a que Bootstrap termine de cerrar el modal
    modalElement.addEventListener(
      "hidden.bs.modal",
      () => {
        const body = modalElement.querySelector(".modal-body");
        if (body) body.scrollTop = 0;

        limpiarFormulario();
        pasoActual.value = 1;

        // MUY IMPORTANTE: limpiar backdrop si quedó pegado (fallback)
        document
          .querySelectorAll(".modal-backdrop")
          .forEach((el) => el.remove());
        document.body.classList.remove("modal-open");
        document.body.style.removeProperty("padding-right");
      },
      { once: true },
    );
  }

  return {
    form,
    steps,
    pasoActual,
    siguientePaso,
    anteriorPaso,
    limpiarFormulario,
    generarPDF,
  };
}
