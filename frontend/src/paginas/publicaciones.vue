<template>
  <section class="publicaciones">
    <h2>publicaciones recientes</h2>
    <div class="grid-publicaciones">
      <div
        class="card-publicacion"
        v-for="(item, index) in publicaciones"
        :key="index"
      >
        <div class="imagen-container">
          <img :src="item.imagen" :alt="item.titulo" />

          <span class="categoria">
            {{ item.categoria }}
          </span>
        </div>

        <div class="contenido">
          <h3>
            {{ item.titulo }}
          </h3>

          <p>
            {{ item.descripcion }}
          </p>

          <button class="btn-ver">Ver más</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import "../styles/publicaciones.css";
const publicaciones = [
  {
    titulo: "Convocatoria 2026",
    descripcion:
      "Inscripciones abiertas para las carreras técnicas de la gestión 2026.",
    categoria: "Convocatoria",
    imagen: "/publicaciones/pub1.jpg",
  },

  {
    titulo: "Feria tecnológica",
    descripcion:
      "Participación de estudiantes en proyectos tecnológicos y exposición de sistemas.",
    categoria: "Actividad",
    imagen: "/publicaciones/pub2.jpg",
  },

  {
    titulo: "Defensa de proyectos",
    descripcion:
      "Presentación final de proyectos de estudiantes de Técnico Medio.",
    categoria: "Académico",
    imagen: "/publicaciones/pub3.jpg",
  },

  {
    titulo: "Acto Conmemorativo ",
    descripcion:
      "Evento con diferentes actividades para festejar al instituto.",
    categoria: "Institucional",
    imagen: "/publicaciones/pub4.jpg",
  },

  {
    titulo: "Concurso estudiantil",
    descripcion:
      "Actividades competitivas y dinámicas para fortalecer habilidades.",
    categoria: "Evento",
    imagen: "/publicaciones/pub5.jpg",
  },

  {
    titulo: "Nuevas inscripciones",
    descripcion: "Inicio de inscripciones para nuevos estudiantes.",
    categoria: "Inscripción",
    imagen: "/publicaciones/pub6.jpg",
  },
];
</script>
