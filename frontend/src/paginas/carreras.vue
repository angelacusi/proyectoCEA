<template>
  <div class="carreras">
    <div class="principio">
      <div class="titulo">
        <h1>Nuestras Carreras</h1>
        <p>Conoce nuestras 8 opciones de formación técnica</p>
      </div>
      <div class="botones">
        <a href="/programas.pdf" target="_blank" class="btn-c">
          Ver Planes y Programas</a
        >
        <a href="/docentes.pdf" target="_blank" class="btn-c">
          Ver Plantel Docente</a
        >
      </div>
    </div>

    <div class="cards-container">
      <div class="card-carrera" v-for="carrera in carreras" :key="carrera.id">
        <div class="imagen">
          <img :src="carrera.imagen" :alt="carrera.nombre" />
        </div>

        <div class="info">
          <h3>
            {{ carrera.nombre }}
          </h3>
          <p>
            {{ carrera.descripcion }}
          </p>
        </div>

        <div class="datos">
          <span> 🎓 {{ carrera.alcance }} </span>
          <span> ⏱ {{ carrera.duracion }} </span>

          <a :href="carrera.malla" target="_blank" class="ver-mas">
            Ver malla curricular
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import "../styles/carreras.css";

import sistemas from "../assets/sistemas.png";
import secretariado from "../assets/secretariado.png";
import ingles from "../assets/ingles.png";
import electromecanica from "../assets/electromecanica.png";
import mecanicaIndustrial from "../assets/mecanicaIndustrial.png";
import mecanica from "../assets/mecanica.png";
import electronica from "../assets/electronica.png";
import electricidad from "../assets/electricidad.png";

const carreras = [
  {
    id: 1,
    nombre: "Sistemas Informáticos",
    descripcion:
      "Especialista que apoya a nivel operativo el desarrollo de tecnologías de información para optimizar los recursos informáticos contribuye en el mejor desempeño de las empresas.",
    alcance: "Técnico Básico, Auxiliar y Medio",
    duracion: "2 años",
    imagen: sistemas,
    malla: "/mallaSistemas.png",
  },

  {
    id: 2,
    nombre: "Secretariado Ejecutivo",
    descripcion:
      "Base fundamental para una empresa al momento de desempeñar sus funciones correspondientes o asignadas por su superiores, pues da un apoyo importante a su gestión.",
    alcance: "Técnico Básico y Auxiliar",
    duracion: "1 año y medio",
    imagen: secretariado,
    malla: "/mallaSecretariado.png",
  },
  {
    id: 3,
    nombre: "Idioma Ingles",
    descripcion:
      "Comunication-conversation estrategies, Writing-Reading, Grammar, Vocabulary, Listening",
    alcance: "Técnico Básico y Auxiliar",
    duracion: "1 año ",
    imagen: ingles,
    malla: "",
  },

  {
    id: 4,
    nombre: "Electromecánica",
    descripcion:
      "Sist. Eltr. Carrocería Sist. Eltr. del motor Sist. EFI OBD I- OBD II Electrónica Automotriz",
    alcance: "Técnico Básico y Técnico Auxiliar",
    duracion: "1 año ",
    imagen: electromecanica,
    malla: "/mallaElectromecanica.png",
  },

  {
    id: 5,
    nombre: "Mecánica Automotriz",
    descripcion:
      "Motores a Gasolina, sistema de Transmisión, Mecanismos de automóvil, Diagnótico, Reparación, Mantenimiento.",
    alcance: "Técnico Básico y Técnico Auxiliar",
    duracion: "1 año ",
    imagen: mecanica,
    malla: "/mallaMecanica.png",
  },

  {
    id: 6,
    nombre: "Electrónica",
    descripcion:
      "Electrónica Básica, Ensambladoe de amplicadores, Sistemas de TV, Reparación, Mantenimiento.",
    alcance: "Técnico Básico y Técnico Auxiliar",
    duracion: "1 año ",
    imagen: electronica,
    malla: "/mallaElectronica.png",
  },

  {
    id: 7,
    nombre: "Electricidad Industrial",
    descripcion:
      "Los procesos educativos prácticos productivos forman técnicos eficientes con capacidades productivas en la implementación de instalaciones eléctricas residenciales, reparación de máquinas, mantenimiento preventivo de máquinas.",
    alcance: "Técnico Básico, Auxiliar y Medio",
    duracion: "1 año y medio ",
    imagen: electricidad,
    malla: "/mallaElectricidadIndu.png",
  },

  {
    id: 8,
    nombre: "Mecánica Industrial",
    descripcion: "La propuesta de Formación se .",
    alcance: "Técnico Básico, Auxiliar y Medio",
    duracion: "2 año ",
    imagen: mecanicaIndustrial,
    malla: "/mallaMecanicaIndu.png",
  },
];
</script>
