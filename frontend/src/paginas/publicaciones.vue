<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import formCrearEditar from "../components/formCrearEditar.vue";
import modalEliminar from "../components/modalEliminar.vue";
import { archivoUrl } from "../services/api";
import { authService } from "../services/authService";
import { publicacionesService } from "../services/publicacionesService";
import "../styles/publicaciones.css";

const route = useRoute();
const categorias = [
  { slug: "convocatorias", valor: "convocatoria", texto: "Convocatoria" },
  { slug: "boletines", valor: "boletin", texto: "Boletín" },
  { slug: "revistas", valor: "revista", texto: "Revista" },
  { slug: "proyectos", valor: "proyecto", texto: "Proyecto" },
];
const categoriaSlug = computed(() =>
  categorias.some((categoria) => categoria.slug === route.query.tipo)
    ? route.query.tipo
    : "",
);
const categoriaActual = computed(
  () =>
    categorias.find((categoria) => categoria.slug === categoriaSlug.value)
      ?.valor || "",
);
const usuarioActual = authService.usuarioActual;
const puedeGestionar = computed(() => Boolean(usuarioActual.value));
const publicaciones = ref([]);
const cargando = ref(true);
const error = ref("");
const mensaje = ref("");
const guardando = ref(false);
const eliminando = ref(false);
const mostrarFormulario = ref(false);
const mostrarEliminar = ref(false);
const publicacionSeleccionada = ref(null);
const datosFormulario = ref({});
const tipoRevistaSeleccionado = ref("Todos");

const tituloSeccion = computed(() => {
  const titulos = {
    convocatoria: "Convocatorias",
    boletin: "Boletines",
    revista: "Revistas",
    proyecto: "Proyectos institucionales",
  };
  return titulos[categoriaActual.value] || "Publicaciones";
});

const nombreCategoriaActual = computed(
  () =>
    categorias
      .find((categoria) => categoria.valor === categoriaActual.value)
      ?.texto.toLocaleLowerCase("es-BO") || "publicación",
);

const descripcionSeccion = computed(() => {
  const descripciones = {
    convocatoria:
      "Consulta los avisos y las oportunidades del CEA Boliviano Alemán.",
    boletin: "Conoce las noticias y novedades de nuestra comunidad educativa.",
    revista: "Explora nuestras publicaciones, ediciones y contenidos.",
    proyecto:
      "Descubre los proyectos e iniciativas de nuestra comunidad educativa.",
  };
  return (
    descripciones[categoriaActual.value] ||
    "Información y materiales del CEA Boliviano Alemán."
  );
});

const camposPublicacion = computed(() => {
  const campos = {
    imagen: {
      nombre: "imagen",
      etiqueta: "Imagen",
      tipo: "file",
      accept: "image/jpeg,image/png,image/webp",
      requerido: false,
      ayuda: "Formatos JPG, PNG o WEBP. Máximo 5 MB.",
    },
    gestion: {
      nombre: "gestion",
      etiqueta: "Gestión",
      tipo: "text",
      requerido: true,
      maxlength: 10,
      placeholder: "Ej. 2026",
    },
    titulo: {
      nombre: "titulo",
      etiqueta: "Título",
      tipo: "text",
      requerido: true,
      maxlength: 200,
      seccion: "Información de la publicación",
      iconoSeccion: "bi bi-journal-richtext",
    },
    descripcion: {
      nombre: "descripcion",
      etiqueta: "Descripción",
      tipo: "textarea",
      requerido: true,
      filas: 4,
    },
    documento: {
      nombre: "documento",
      etiqueta: "Documento PDF (opcional)",
      tipo: "file",
      accept: "application/pdf",
      requerido: false,
      ayuda: "PDF de hasta 10 MB.",
    },
  };

  const camposPorCategoria = {
    convocatoria: [
      campos.imagen,
      campos.gestion,
      campos.titulo,
      campos.descripcion,
      campos.documento,
      {
        nombre: "estado",
        etiqueta: "Estado de la convocatoria",
        tipo: "select",
        requerido: true,
        opciones: [
          { valor: "Vigente", texto: "Vigente" },
          { valor: "Terminado", texto: "Terminado" },
        ],
      },
    ],
    boletin: [
      campos.imagen,
      campos.gestion,
      campos.titulo,
      campos.descripcion,
      campos.documento,
    ],
    revista: [
      campos.imagen,
      campos.gestion,
      campos.titulo,
      campos.descripcion,
      campos.documento,
      {
        nombre: "tipo",
        etiqueta: "Tipo de revista",
        tipo: "text",
        requerido: true,
        maxlength: 100,
        placeholder: "Ej. Institucional",
      },
    ],
    proyecto: [
      campos.imagen,
      campos.titulo,
      campos.descripcion,
      campos.documento,
      {
        nombre: "estado",
        etiqueta: "Estado del proyecto",
        tipo: "text",
        requerido: true,
        maxlength: 50,
        placeholder: "Ej. En desarrollo",
      },
      campos.gestion,
      {
        nombre: "area",
        etiqueta: "Área",
        tipo: "text",
        requerido: true,
        maxlength: 100,
      },
    ],
  };

  return camposPorCategoria[categoriaActual.value] || [];
});

const tiposRevista = computed(() => [
  "Todos",
  ...new Set(
    publicaciones.value
      .filter((item) => item.categoria === "revista" && item.tipo)
      .map((item) => item.tipo),
  ),
]);

const publicacionesCategoria = computed(() => {
  const lista = publicaciones.value.filter(
    (item) => item.categoria === categoriaActual.value,
  );

  if (
    categoriaActual.value === "revista" &&
    tipoRevistaSeleccionado.value !== "Todos"
  ) {
    return lista.filter((item) => item.tipo === tipoRevistaSeleccionado.value);
  }

  return lista;
});

function nombreCategoria(valor) {
  return (
    categorias.find((categoria) => categoria.valor === valor)?.texto || valor
  );
}

function mostrarFecha(fecha) {
  if (!fecha) return "—";
  const valor = new Date(String(fecha).replace(" ", "T"));
  return Number.isNaN(valor.getTime())
    ? "—"
    : new Intl.DateTimeFormat("es-BO", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(valor);
}

async function cargarPublicaciones() {
  cargando.value = true;
  error.value = "";

  try {
    const respuesta = await publicacionesService.obtenerTodas();
    publicaciones.value = respuesta.publicaciones;
  } catch (e) {
    error.value = e.message || "No se pudieron cargar las publicaciones.";
  } finally {
    cargando.value = false;
  }
}

function abrirCrear() {
  error.value = "";
  mensaje.value = "";
  publicacionSeleccionada.value = null;
  datosFormulario.value = { categoria: categoriaActual.value };
  mostrarFormulario.value = true;
}

function abrirEditar(publicacion) {
  error.value = "";
  mensaje.value = "";
  publicacionSeleccionada.value = { ...publicacion };
  datosFormulario.value = publicacionSeleccionada.value;
  mostrarFormulario.value = true;
}

function cerrarFormulario() {
  mostrarFormulario.value = false;
  publicacionSeleccionada.value = null;
  datosFormulario.value = {};
}

function prepararFormulario(datos) {
  const formData = new FormData();
  formData.append(
    "categoria",
    publicacionSeleccionada.value?.categoria || categoriaActual.value,
  );
  Object.entries(datos).forEach(([clave, valor]) => {
    if (valor instanceof File) {
      formData.append(clave, valor);
    } else if (valor !== undefined && valor !== null) {
      formData.append(clave, String(valor));
    }
  });
  return formData;
}

async function guardarPublicacion(datos) {
  guardando.value = true;
  error.value = "";
  mensaje.value = "";

  try {
    const id = publicacionSeleccionada.value?.id;
    const formData = prepararFormulario(datos);
    if (id) {
      await publicacionesService.actualizar(id, formData);
    } else {
      await publicacionesService.crear(formData);
    }

    cerrarFormulario();
    await cargarPublicaciones();
    mensaje.value = id
      ? "Publicación actualizada correctamente."
      : "Publicación creada correctamente.";
  } catch (e) {
    error.value = e.message || "No se pudo guardar la publicación.";
  } finally {
    guardando.value = false;
  }
}

function abrirEliminar(publicacion) {
  error.value = "";
  mensaje.value = "";
  publicacionSeleccionada.value = publicacion;
  mostrarEliminar.value = true;
}

function cerrarEliminar() {
  mostrarEliminar.value = false;
  publicacionSeleccionada.value = null;
}

async function eliminarPublicacion() {
  if (!publicacionSeleccionada.value) return;

  eliminando.value = true;
  error.value = "";
  mensaje.value = "";

  try {
    await publicacionesService.eliminar(publicacionSeleccionada.value.id);
    cerrarEliminar();
    await cargarPublicaciones();
    mensaje.value = "Publicación eliminada correctamente.";
  } catch (e) {
    error.value = e.message || "No se pudo eliminar la publicación.";
  } finally {
    eliminando.value = false;
  }
}

watch(categoriaActual, () => {
  tipoRevistaSeleccionado.value = "Todos";
});

onMounted(cargarPublicaciones);
</script>

<template>
  <section class="publicaciones" id="publicaciones">
    <header class="encabezado-publicaciones">
      <p class="etiqueta-publicaciones">CEA BOLIVIANO ALEMÁN</p>
      <div class="encabezado-publicaciones-fila">
        <div>
          <h2>{{ tituloSeccion }}</h2>
          <p class="subtitulo-publicaciones">{{ descripcionSeccion }}</p>
        </div>
        <button
          v-if="puedeGestionar && categoriaActual"
          type="button"
          class="boton-crear-publicacion"
          @click="abrirCrear"
        >
          <i class="bi bi-plus-circle"></i>
          Agregar {{ nombreCategoriaActual }}
        </button>
      </div>
    </header>

    <p
      v-if="error && !mostrarFormulario && !mostrarEliminar"
      class="estado-error-publicaciones"
      role="alert"
    >
      {{ error }}
    </p>
    <p v-if="mensaje" class="estado-exito-publicaciones" role="status">
      {{ mensaje }}
    </p>
    <p v-if="cargando" class="estado-vacio">Cargando publicaciones...</p>
    <p v-else-if="error && publicaciones.length === 0" class="estado-vacio">
      No se pudieron mostrar las publicaciones.
    </p>

    <template v-else-if="categoriaActual">
      <div
        v-if="categoriaActual === 'revista' && publicacionesCategoria.length"
        class="filtros-publicaciones"
        aria-label="Filtrar revistas"
      >
        <button
          v-for="tipo in tiposRevista"
          :key="tipo"
          type="button"
          class="boton-filtro"
          :class="{ activo: tipoRevistaSeleccionado === tipo }"
          :aria-pressed="tipoRevistaSeleccionado === tipo"
          @click="tipoRevistaSeleccionado = tipo"
        >
          {{ tipo }}
        </button>
      </div>

      <div
        v-if="publicacionesCategoria.length"
        class="grid-publicaciones"
        :class="{
          'grid-convocatorias': categoriaActual === 'convocatoria',
          'grid-proyectos': categoriaActual === 'proyecto',
        }"
      >
        <article
          v-for="item in publicacionesCategoria"
          :key="item.id"
          class="tarjeta-publicacion"
          :class="{
            'tarjeta-convocatoria': item.categoria === 'convocatoria',
            'tarjeta-horizontal':
              item.categoria === 'boletin' || item.categoria === 'revista',
            'tarjeta-proyecto': item.categoria === 'proyecto',
          }"
        >
          <div
            class="publicacion-imagen"
            :class="{ 'imagen-proyecto': item.categoria === 'proyecto' }"
          >
            <img
              v-if="item.imagen"
              :src="archivoUrl(item.imagen)"
              :alt="item.titulo"
              loading="lazy"
            />
            <div
              v-else
              class="publicacion-sin-imagen"
              role="img"
              :aria-label="`Sin imagen para ${item.titulo}`"
            >
              <i class="bi bi-image"></i>
              <span>Sin imagen</span>
            </div>
            <span class="etiqueta-tipo">
              {{ nombreCategoria(item.categoria) }}
            </span>
          </div>

          <div class="publicacion-contenido">
            <p v-if="item.categoria !== 'proyecto'" class="publicacion-fecha">
              <i class="bi bi-calendar3"></i>
              Gestión {{ item.gestion }}
            </p>

            <h3>{{ item.titulo }}</h3>
            <p class="publicacion-descripcion">{{ item.descripcion }}</p>

            <p
              v-if="item.categoria === 'revista' && item.tipo"
              class="texto-categoria"
            >
              Tipo: {{ item.tipo }}
            </p>

            <a
              v-if="item.documento"
              :href="archivoUrl(item.documento)"
              target="_blank"
              rel="noopener noreferrer"
              class="boton-publicacion"
            >
              {{
                item.categoria === "convocatoria"
                  ? "Ver convocatoria"
                  : item.categoria === "boletin"
                    ? "Leer boletín"
                    : item.categoria === "revista"
                      ? "Ver revista (PDF)"
                      : "Ver documento"
              }}
              <i class="bi bi-file-earmark-pdf"></i>
            </a>
            <span v-else class="archivo-pendiente">
              Sin documento adjunto.
            </span>

            <div v-if="item.categoria === 'proyecto'" class="datos-proyecto">
              <span v-if="item.estado" class="estado-proyecto">
                {{ item.estado }}
              </span>
              <span class="texto-categoria">GESTIÓN {{ item.gestion }}</span>
              <span v-if="item.area" class="texto-categoria">
                ÁREA: {{ item.area }}
              </span>
            </div>

            <div
              v-if="item.categoria === 'convocatoria' && item.estado"
              class="estado-convocatoria"
              :class="
                item.estado === 'Vigente'
                  ? 'convocatoria-vigente'
                  : 'convocatoria-terminada'
              "
            >
              <i
                :class="
                  item.estado === 'Vigente'
                    ? 'bi bi-check-circle-fill'
                    : 'bi bi-clock-history'
                "
              ></i>
              {{ item.estado }}
            </div>

            <div v-if="puedeGestionar" class="fechas-publicacion">
              <span>
                <i class="bi bi-calendar-plus"></i>
                Creada: {{ mostrarFecha(item.fecha_creacion) }}
              </span>
              <span>
                <i class="bi bi-pencil-square"></i>
                Actualizada: {{ mostrarFecha(item.fecha_actualizacion) }}
              </span>
            </div>

            <div v-if="puedeGestionar" class="acciones-publicacion">
              <button
                type="button"
                class="accion-publicacion accion-editar-publicacion"
                @click="abrirEditar(item)"
              >
                <i class="bi bi-pencil-square"></i>
                Editar
              </button>
              <button
                type="button"
                class="accion-publicacion accion-eliminar-publicacion"
                @click="abrirEliminar(item)"
              >
                <i class="bi bi-trash"></i>
                Eliminar
              </button>
            </div>
          </div>
        </article>
      </div>

      <p v-else-if="!cargando" class="estado-vacio">
        Aún no hay publicaciones en esta categoría.
      </p>
    </template>

    <p v-else class="estado-vacio">
      Selecciona Convocatorias, Boletines, Revistas o Proyectos desde el menú de
      Publicaciones.
    </p>

    <formCrearEditar
      :visible="mostrarFormulario"
      :modo="publicacionSeleccionada ? 'editar' : 'crear'"
      :titulo="nombreCategoriaActual"
      :campos="camposPublicacion"
      :datos="datosFormulario"
      :guardando="guardando"
      :error="error"
      @guardar="guardarPublicacion"
      @cerrar="cerrarFormulario"
    />

    <modalEliminar
      :visible="mostrarEliminar"
      titulo="Eliminar publicación"
      mensaje="Esta acción eliminará la publicación y sus archivos."
      :nombre="publicacionSeleccionada?.titulo || ''"
      :eliminando="eliminando"
      :error="mostrarEliminar ? error : ''"
      @confirmar="eliminarPublicacion"
      @cancelar="cerrarEliminar"
    />
  </section>
</template>
