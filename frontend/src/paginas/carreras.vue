<template>
  <div class="carreras">
    <div class="principio">
      <div class="titulo">
        <h1>Nuestras Carreras</h1>
        <p>Conoce nuestras 8 opciones de formación técnica</p>
      </div>

      <div class="botones">
        <a href="/carreras/programas.pdf" target="_blank" class="btn-c">
          Ver Planes y Programas
        </a>

        <a href="/carreras/docentes.pdf" target="_blank" class="btn-c">
          Ver Plantel Docente
        </a>
      </div>

      <div v-if="esAdministrador" class="administracion-carreras">
        <button
          type="button"
          class="btn-administrar-carreras"
          @click="abrirCrear"
        >
          <i class="bi bi-plus-circle"></i>
          Agregar carrera
        </button>
      </div>
    </div>

    <p v-if="cargando">Cargando carreras...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else-if="carreras.length === 0">No hay carreras registradas.</p>

    <div v-else class="cards-container">
      <div class="card-carrera" v-for="carrera in carreras" :key="carrera.id">
        <div class="imagen">
          <img
            :src="
              carrera.imagen ? archivoUrl(carrera.imagen) : imagenPredeterminada
            "
            :alt="carrera.nombre"
            @error="usarImagenPredeterminada"
          />
        </div>

        <div class="info">
          <h3>{{ carrera.nombre }}</h3>
          <p>{{ carrera.descripcion }}</p>
        </div>

        <div class="datos">
          <span>🎓 {{ carrera.alcance }}</span>
          <span>⏱ {{ carrera.duracion }}</span>

          <a
            v-if="carrera.malla"
            :href="archivoUrl(carrera.malla)"
            target="_blank"
            rel="noopener noreferrer"
            class="ver-mas"
          >
            Ver malla curricular
          </a>

          <a
            v-if="carrera.contenido"
            :href="archivoUrl(carrera.contenido)"
            target="_blank"
            rel="noopener noreferrer"
            class="ver-mas"
          >
            Ver contenido (PDF)
          </a>
        </div>

        <div v-if="esAdministrador" class="acciones-carrera">
          <button
            type="button"
            class="btn-editar-carrera"
            @click="abrirEditar(carrera)"
          >
            <i class="bi bi-pencil-square"></i>
            Editar
          </button>

          <button
            type="button"
            class="btn-eliminar-carrera"
            @click="abrirEliminar(carrera)"
          >
            <i class="bi bi-trash"></i>
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <formCrearEditar
      :visible="mostrarFormulario"
      :modo="carreraSeleccionada ? 'editar' : 'crear'"
      titulo="carrera"
      :campos="camposCarrera"
      :datos="carreraSeleccionada || {}"
      :guardando="guardando"
      @guardar="guardarCarrera"
      @cerrar="cerrarFormulario"
    />

    <modalEliminar
      :visible="mostrarEliminar"
      titulo="Eliminar carrera"
      mensaje="¿Estás segura de que deseas eliminar esta carrera?"
      :nombre="carreraSeleccionada?.nombre || ''"
      :eliminando="eliminando"
      @confirmar="eliminarCarrera"
      @cancelar="cerrarEliminar"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import "../styles/carreras.css";

import { carrerasService } from "../services/carrerasService";
import { archivoUrl } from "../services/api";
import imagenPredeterminada from "../assets/carrera-default.jpg";
import { authService } from "../services/authService";

import formCrearEditar from "../components/formCrearEditar.vue";
import modalEliminar from "../components/modalEliminar.vue";

// Imagen genérica importada desde src/assets.

// Comprobar si el usuario es administrador.
const esAdministrador = computed(() => {
  return authService.usuarioActual.value?.rol === "administrador";
});

// Datos de las carreras.
const carreras = ref([]);
const cargando = ref(true);
const error = ref("");

// Estados de los componentes reutilizables.
const mostrarFormulario = ref(false);
const mostrarEliminar = ref(false);

const guardando = ref(false);
const eliminando = ref(false);

const carreraSeleccionada = ref(null);

// Campos del formulario.
const camposCarrera = [
  {
    nombre: "nombre",
    etiqueta: "Nombre de la carrera",
    tipo: "text",
    requerido: true,
  },
  {
    nombre: "descripcion",
    etiqueta: "Descripción",
    tipo: "textarea",
    requerido: true,
    filas: 4,
  },
  {
    nombre: "alcance",
    etiqueta: "Nivel técnico",
    tipo: "select",
    requerido: true,
    opciones: [
      { valor: "Técnico Básico", texto: "Técnico Básico" },
      { valor: "Técnico Auxiliar", texto: "Técnico Auxiliar" },
      { valor: "Técnico Medio", texto: "Técnico Medio" },
    ],
  },
  {
    nombre: "duracion",
    etiqueta: "Duración",
    tipo: "text",
    requerido: true,
    placeholder: "Ej. 2 años",
  },
  {
    nombre: "imagen",
    etiqueta: "Imagen de la carrera",
    tipo: "file",
    accept: "image/jpeg,image/png,image/webp",
    requerido: false,
    ayuda: "Formatos permitidos: JPG, PNG y WEBP.",
  },
  {
    nombre: "malla",
    etiqueta: "Malla curricular (imagen)",
    tipo: "file",
    accept: "image/jpeg,image/png,image/webp",
    requerido: false,
    ayuda: "Selecciona la imagen de la malla curricular.",
  },
  {
    nombre: "contenido",
    etiqueta: "Contenido de la carrera (PDF)",
    tipo: "file",
    accept: "application/pdf",
    requerido: false,
    ayuda: "Selecciona el documento PDF del contenido.",
  },
];

// Consultar carreras desde el backend.
async function cargarCarreras() {
  try {
    cargando.value = true;
    error.value = "";

    const respuesta = await carrerasService.obtenerTodas();

    carreras.value = respuesta.carreras || [];
  } catch (e) {
    error.value = e.message || "No se pudieron cargar las carreras.";
  } finally {
    cargando.value = false;
  }
}

// Si una imagen no carga, utilizar la predeterminada.
function usarImagenPredeterminada(evento) {
  evento.target.onerror = null;
  evento.target.src = imagenPredeterminada;
}

// Abrir formulario para crear.
function abrirCrear() {
  carreraSeleccionada.value = null;
  mostrarFormulario.value = true;
}

// Abrir formulario para editar.
function abrirEditar(carrera) {
  carreraSeleccionada.value = { ...carrera };
  mostrarFormulario.value = true;
}

// Cerrar formulario.
function cerrarFormulario() {
  mostrarFormulario.value = false;
  carreraSeleccionada.value = null;
}

// Preparar datos y archivos para enviar.
function prepararFormulario(datos) {
  const formData = new FormData();

  Object.entries(datos).forEach(([clave, valor]) => {
    if (valor instanceof File) {
      if (valor) {
        formData.append(clave, valor);
      }
    } else if (valor !== undefined && valor !== null) {
      formData.append(clave, String(valor));
    }
  });

  return formData;
}

// Guardar carrera nueva o actualizar una existente.
async function guardarCarrera(datos) {
  try {
    guardando.value = true;

    const formData = prepararFormulario(datos);

    if (carreraSeleccionada.value) {
      await carrerasService.actualizar(carreraSeleccionada.value.id, formData);
    } else {
      await carrerasService.crear(formData);
    }

    await cargarCarreras();
    cerrarFormulario();
  } catch (e) {
    alert(e.message || "No se pudo guardar la carrera.");
  } finally {
    guardando.value = false;
  }
}

// Abrir confirmación de eliminación.
function abrirEliminar(carrera) {
  carreraSeleccionada.value = carrera;
  mostrarEliminar.value = true;
}

// Cerrar confirmación.
function cerrarEliminar() {
  mostrarEliminar.value = false;
  carreraSeleccionada.value = null;
}

// Eliminar carrera.
async function eliminarCarrera() {
  try {
    eliminando.value = true;

    await carrerasService.eliminar(carreraSeleccionada.value.id);

    await cargarCarreras();
    cerrarEliminar();
  } catch (e) {
    alert(e.message || "No se pudo eliminar la carrera.");
  } finally {
    eliminando.value = false;
  }
}

onMounted(cargarCarreras);
</script>
