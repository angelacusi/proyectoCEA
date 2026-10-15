<template>
  <section class="publicaciones" id="publicaciones">
    <!-- Encabezado compacto -->
    <header class="encabezado-publicaciones">
      <p class="etiqueta-publicaciones">CEA BOLIVIANO ALEMÁN</p>
      <h2>{{ tituloSeccion }}</h2>
      <p class="subtitulo-publicaciones">
        {{ descripcionSeccion }}
      </p>
    </header>

    <!-- CONVOCATORIAS -->
    <template v-if="categoriaActual === 'convocatorias'">
      <div v-if="convocatorias.length" class="grid-publicaciones">
        <article
          v-for="item in convocatorias"
          :key="item.id"
          class="tarjeta-publicacion tarjeta-convocatoria"
        >
          <div class="publicacion-imagen">
            <img
              v-if="item.imagen"
              :src="item.imagen"
              :alt="item.titulo"
              loading="lazy"
            />
            <span class="etiqueta-tipo">Convocatoria</span>
          </div>

          <div class="publicacion-contenido">
            <p v-if="item.fecha" class="publicacion-fecha">
              <i class="bi bi-calendar3"></i>
              {{ item.fecha }}
            </p>

            <h3>{{ item.titulo }}</h3>
            <p class="publicacion-descripcion">
              {{ item.descripcion }}
            </p>

            <a
              v-if="item.archivo"
              :href="item.archivo"
              target="_blank"
              rel="noopener noreferrer"
              class="boton-publicacion"
            >
              Ver convocatoria
              <i class="bi bi-arrow-up-right"></i>
            </a>
            <span v-else class="archivo-pendiente">
              Documento próximamente disponible
            </span>
          </div>
        </article>
      </div>

      <p v-else class="estado-vacio">
        Todavía no hay convocatorias publicadas.
      </p>
    </template>

    <!-- BOLETINES -->
    <template v-else-if="categoriaActual === 'boletines'">
      <div v-if="boletines.length" class="grid-publicaciones">
        <article
          v-for="item in boletines"
          :key="item.id"
          class="tarjeta-publicacion tarjeta-horizontal"
        >
          <div class="publicacion-imagen">
            <img
              v-if="item.imagen"
              :src="item.imagen"
              :alt="item.titulo"
              loading="lazy"
            />
          </div>

          <div class="publicacion-contenido">
            <span class="texto-categoria">BOLETÍN</span>

            <p v-if="item.fecha" class="publicacion-fecha">
              <i class="bi bi-calendar3"></i>
              {{ item.fecha }}
            </p>

            <h3>{{ item.titulo }}</h3>
            <p class="publicacion-descripcion">
              {{ item.descripcion }}
            </p>

            <a
              v-if="item.archivo"
              :href="item.archivo"
              target="_blank"
              rel="noopener noreferrer"
              class="boton-publicacion"
            >
              Leer boletín
              <i class="bi bi-arrow-up-right"></i>
            </a>
            <span v-else class="archivo-pendiente">
              Documento próximamente disponible
            </span>
          </div>
        </article>
      </div>

      <p v-else class="estado-vacio">Todavía no hay boletines publicados.</p>
    </template>

    <!-- REVISTAS -->
    <template v-else-if="categoriaActual === 'revistas'">
      <div class="filtros-publicaciones" aria-label="Filtrar revistas">
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

      <div v-if="revistasFiltradas.length" class="grid-publicaciones">
        <article
          v-for="item in revistasFiltradas"
          :key="item.id"
          class="tarjeta-publicacion tarjeta-horizontal"
        >
          <div class="publicacion-imagen">
            <img
              v-if="item.imagen"
              :src="item.imagen"
              :alt="item.titulo"
              loading="lazy"
            />
          </div>

          <div class="publicacion-contenido">
            <span class="texto-categoria">{{ item.tipo }}</span>

            <p v-if="item.edicion" class="publicacion-fecha">
              <i class="bi bi-bookmark"></i>
              {{ item.edicion }}
            </p>

            <h3>{{ item.titulo }}</h3>
            <p class="publicacion-descripcion">
              {{ item.descripcion }}
            </p>

            <a
              v-if="item.archivo"
              :href="item.archivo"
              target="_blank"
              rel="noopener noreferrer"
              class="boton-publicacion"
            >
              Ver revista (PDF)
              <i class="bi bi-file-earmark-pdf"></i>
            </a>
            <span v-else class="archivo-pendiente">
              Documento próximamente disponible
            </span>
          </div>
        </article>
      </div>

      <p v-else class="estado-vacio">
        No hay revistas de este tipo por el momento.
      </p>
    </template>

    <!-- CATEGORÍA NO SELECCIONADA -->
    <p v-else class="estado-vacio">
      Selecciona Convocatorias, Boletines o Revistas desde el menú de
      Publicaciones.
    </p>
  </section>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import "../styles/publicaciones.css";

const route = useRoute();

const categoriasPermitidas = ["convocatorias", "boletines", "revistas"];

const obtenerCategoria = (valor) =>
  categoriasPermitidas.includes(valor) ? valor : "";

const categoriaActual = ref(obtenerCategoria(route.query.tipo));

watch(
  () => route.query.tipo,
  (nuevoTipo) => {
    categoriaActual.value = obtenerCategoria(nuevoTipo);
  },
);

const tipoRevistaSeleccionado = ref("Todos");

const tiposRevista = [
  "Todos",
  "Institucional",
  "Educativa",
  "Cultural",
  "Especial",
];

const tituloSeccion = computed(() => {
  const titulos = {
    convocatorias: "Convocatorias",
    boletines: "Boletines",
    revistas: "Revistas",
  };

  return titulos[categoriaActual.value] || "Publicaciones";
});

const descripcionSeccion = computed(() => {
  const descripciones = {
    convocatorias:
      "Consulta los avisos y las oportunidades del CEA Boliviano Alemán.",
    boletines:
      "Conoce las noticias y novedades de nuestra comunidad educativa.",
    revistas: "Explora nuestras publicaciones, ediciones y contenidos.",
  };

  return (
    descripciones[categoriaActual.value] ||
    "Información y materiales del CEA Boliviano Alemán."
  );
});

/*
  DATOS DE EJEMPLO PARA DESARROLLO.

  Cuando se implemente el backend, estos arreglos se reemplazarán
  por los datos recibidos de la API.

  Estructura sugerida:
  id, titulo, descripcion, fecha, imagen, archivo.

  Las revistas también incluyen tipo y edicion.
  Las rutas de imagen y archivo deben ser URLs o rutas públicas válidas.
*/

const convocatorias = ref([
  {
    id: 1,
    titulo: "Convocatoria de inscripciones 2026",
    descripcion:
      "Información sobre las inscripciones a las carreras técnicas del CEA Boliviano Alemán.",
    fecha: "Gestión 2026",
    imagen: "/publicaciones/pub1.jpg",
    archivo: "",
  },
]);

const boletines = ref([
  {
    id: 1,
    titulo: "Boletín institucional",
    descripcion:
      "Un resumen de las noticias, actividades y novedades de nuestra comunidad educativa.",
    fecha: "Ejemplo de publicación",
    imagen: "/publicaciones/pub4.jpg",
    archivo: "",
  },
]);

const revistas = ref([
  {
    id: 1,
    titulo: "Revista institucional",
    tipo: "Institucional",
    edicion: "Edición de ejemplo",
    descripcion:
      "Proyectos, experiencias y actividades que forman parte de la vida institucional.",
    imagen: "/publicaciones/pub2.jpg",
    archivo: "",
  },
  {
    id: 2,
    titulo: "Revista educativa",
    tipo: "Educativa",
    edicion: "Edición de ejemplo",
    descripcion:
      "Experiencias, recursos y contenidos relacionados con la formación técnica.",
    imagen: "/publicaciones/pub3.jpg",
    archivo: "",
  },
]);

const revistasFiltradas = computed(() => {
  if (tipoRevistaSeleccionado.value === "Todos") {
    return revistas.value;
  }

  return revistas.value.filter(
    (item) => item.tipo === tipoRevistaSeleccionado.value,
  );
});

watch(categoriaActual, () => {
  tipoRevistaSeleccionado.value = "Todos";
});
</script>
