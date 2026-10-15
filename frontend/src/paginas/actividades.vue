<template>
  <section class="actividades" id="actividades">
    <!-- ENCABEZADO -->
    <header class="encabezado-actividades">
      <p class="etiqueta-actividades">CEA BOLIVIANO ALEMÁN</p>
      <h2>Actividades</h2>
      <p class="subtitulo-actividades">
        Conoce los eventos, experiencias y momentos de nuestra comunidad
        educativa.
      </p>
    </header>

    <!-- FILTROS -->
    <nav class="filtros-actividades" aria-label="Filtrar actividades">
      <button
        v-for="categoria in categorias"
        :key="categoria"
        type="button"
        class="boton-filtro-actividad"
        :class="{ activo: categoriaSeleccionada === categoria }"
        :aria-pressed="categoriaSeleccionada === categoria"
        @click="categoriaSeleccionada = categoria"
      >
        {{ categoria }}
      </button>
    </nav>

    <!-- LISTADO DE ACTIVIDADES -->
    <div v-if="actividadesFiltradas.length" class="grid-actividades">
      <article
        v-for="actividad in actividadesFiltradas"
        :key="actividad.id"
        class="tarjeta-actividad"
      >
        <!-- CARRUSEL MULTIMEDIA -->
        <div
          class="carrusel-actividad"
          :aria-label="'Multimedia de ' + actividad.titulo"
        >
          <template v-if="actividad.multimedia?.length">
            <!-- Imagen -->
            <img
              v-if="elementoActual(actividad)?.tipo === 'imagen'"
              class="medio-actividad"
              :src="elementoActual(actividad).url"
              :alt="elementoActual(actividad).alt || actividad.titulo"
              loading="lazy"
            />

            <!-- Video -->
            <video
              v-else-if="elementoActual(actividad)?.tipo === 'video'"
              class="medio-actividad"
              :src="elementoActual(actividad).url"
              :poster="elementoActual(actividad).poster || undefined"
              controls
              preload="metadata"
              playsinline
              :aria-label="'Video: ' + actividad.titulo"
            >
              Tu navegador no puede reproducir este video.
            </video>

            <!-- Controles del carrusel -->
            <template v-if="actividad.multimedia.length > 1">
              <button
                type="button"
                class="control-carrusel anterior"
                :aria-label="'Elemento anterior de ' + actividad.titulo"
                @click="cambiarElemento(actividad, -1)"
              >
                <i class="bi bi-chevron-left"></i>
              </button>

              <button
                type="button"
                class="control-carrusel siguiente"
                :aria-label="'Elemento siguiente de ' + actividad.titulo"
                @click="cambiarElemento(actividad, 1)"
              >
                <i class="bi bi-chevron-right"></i>
              </button>

              <div class="indicadores-carrusel">
                <button
                  v-for="(medio, indice) in actividad.multimedia"
                  :key="medio.id || medio.url"
                  type="button"
                  class="indicador-carrusel"
                  :class="{
                    activo: indice === indiceActual(actividad),
                  }"
                  :aria-label="'Ver elemento ' + (indice + 1)"
                  :aria-current="
                    indice === indiceActual(actividad) ? 'true' : undefined
                  "
                  @click="seleccionarElemento(actividad, indice)"
                ></button>
              </div>
            </template>

            <!-- Tipo de contenido -->
            <span class="tipo-medio">
              <i
                :class="
                  elementoActual(actividad)?.tipo === 'video'
                    ? 'bi bi-play-circle'
                    : 'bi bi-camera'
                "
              ></i>
              {{
                elementoActual(actividad)?.tipo === "video" ? "Video" : "Foto"
              }}
            </span>
          </template>

          <!-- Sin multimedia -->
          <div v-else class="multimedia-vacia">
            <i class="bi bi-images"></i>
            <p>Fotografías y videos próximamente</p>
          </div>
        </div>

        <!-- INFORMACIÓN -->
        <div class="contenido-actividad">
          <div class="metadatos-actividad">
            <span class="categoria-actividad">
              {{ actividad.categoria }}
            </span>

            <span v-if="actividad.fecha" class="fecha-actividad">
              <i class="bi bi-calendar3"></i>
              {{ actividad.fecha }}
            </span>
          </div>

          <h3>{{ actividad.titulo }}</h3>

          <p class="descripcion-actividad">
            {{ actividad.descripcion }}
          </p>

          <p v-if="actividad.lugar" class="lugar-actividad">
            <i class="bi bi-geo-alt"></i>
            {{ actividad.lugar }}
          </p>
        </div>
      </article>
    </div>

    <!-- ESTADO VACÍO -->
    <p v-else class="estado-vacio-actividades">
      No hay actividades en esta categoría por el momento.
    </p>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import "../styles/actividades.css";

const categorias = [
  "Todas",
  "Académicas",
  "Culturales",
  "Cívicas",
  "Deportivas",
  "Institucionales",
];

const categoriaSeleccionada = ref("Todas");

/*
  Estado visual de los carruseles.
  Se mantiene separado de los datos de las actividades para facilitar
  la futura conexión con una API.
*/
const posicionesCarrusel = ref({});

const indiceActual = (actividad) => posicionesCarrusel.value[actividad.id] ?? 0;

const elementoActual = (actividad) => {
  if (!actividad.multimedia?.length) return null;

  const indice = indiceActual(actividad);
  return actividad.multimedia[indice] || actividad.multimedia[0];
};

const seleccionarElemento = (actividad, indice) => {
  posicionesCarrusel.value[actividad.id] = indice;
};

const cambiarElemento = (actividad, direccion) => {
  const total = actividad.multimedia?.length || 0;
  if (total < 2) return;

  const actual = indiceActual(actividad);
  posicionesCarrusel.value[actividad.id] = (actual + direccion + total) % total;
};

/*
  DATOS DE EJEMPLO.
  En producción, se reemplazarán por los registros recibidos del backend.

  Cada elemento multimedia:
  {
    id: identificador,
    tipo: "imagen" | "video",
    url: ruta pública o URL del archivo,
    alt: descripción accesible (imágenes),
    poster: imagen previa opcional (videos)
  }
*/

const actividades = ref([
  {
    id: 1,
    titulo: "Feria educativa",
    categoria: "Académicas",
    fecha: "Fecha por confirmar",
    lugar: "CEA Boliviano Alemán",
    descripcion:
      "Exposición de proyectos, trabajos y experiencias desarrolladas por los estudiantes en su formación técnica.",
    multimedia: [
      {
        id: "feria-1",
        tipo: "imagen",
        url: "/actividades/feria1.jpg",
        alt: "Exposición de proyectos de la feria educativa",
      },
      {
        id: "feria-2",
        tipo: "imagen",
        url: "/actividades/feria2.jpg",
        alt: "Estudiantes presentando sus trabajos",
      },
      // Ejemplo para cuando tengas un video real:
      // {
      //   id: "feria-3",
      //   tipo: "video",
      //   url: "/actividades/feria-video.mp4",
      //   poster: "/actividades/feria-portada.jpg",
      // },
    ],
  },
  {
    id: 2,
    titulo: "Aniversario institucional",
    categoria: "Institucionales",
    fecha: "Fecha por confirmar",
    lugar: "CEA Boliviano Alemán",
    descripcion:
      "Celebración de la historia del centro y participación de estudiantes, docentes y comunidad educativa.",
    multimedia: [
      {
        id: "aniversario-1",
        tipo: "imagen",
        url: "/actividades/aniversario1.jpg",
        alt: "Celebración del aniversario institucional",
      },
      {
        id: "aniversario-2",
        tipo: "imagen",
        url: "/actividades/aniversario2.jpg",
        alt: "Comunidad educativa durante el aniversario",
      },
    ],
  },
  {
    id: 3,
    titulo: "Jornada cultural",
    categoria: "Culturales",
    fecha: "Fecha por confirmar",
    lugar: "CEA Boliviano Alemán",
    descripcion:
      "Encuentro de expresión cultural y participación de los estudiantes en actividades artísticas.",
    multimedia: [
      {
        id: "cultural-1",
        tipo: "imagen",
        url: "/actividades/cultural1.jpg",
        alt: "Participación estudiantil en una jornada cultural",
      },
    ],
  },
  {
    id: 4,
    titulo: "Taller práctico",
    categoria: "Académicas",
    fecha: "Fecha por confirmar",
    lugar: "CEA Boliviano Alemán",
    descripcion:
      "Actividades prácticas orientadas al desarrollo de conocimientos y habilidades técnicas.",
    multimedia: [],
  },
]);

const actividadesFiltradas = computed(() => {
  if (categoriaSeleccionada.value === "Todas") {
    return actividades.value;
  }

  return actividades.value.filter(
    (actividad) => actividad.categoria === categoriaSeleccionada.value,
  );
});
</script>
