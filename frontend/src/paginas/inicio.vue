<template>
  <Carrusel />
  <section class="bienvenida">
    <div class="bienvenida-texto">
      <h2>Formación técnica para construir tu futuro profesional</h2>
      <p>
        Somos una Institución fiscal fundada el 23 de agosto de 1975 en las
        instalaciones de la carrera de la escuela superior “pedro domingo
        murillo”, inició su funcionamiento capacitando adultos, en el turno de
        la noche con el único objetivo de la formación técnica y profesional,
        actualmente brindando educación de calidad para jóvenes y adultos.
      </p>
    </div>

    <div class="bienvenida-img">
      <img src="../assets/instituto.png" alt="Instituto" />
    </div>
  </section>

  <section class="porque-estudiar">
    <div class="titulo-section">
      <h2>¿Por qué estudiar en el CEA Boliviano Alemán?</h2>

      <p>Formación técnica de calidad para construir tu futuro profesional.</p>
    </div>

    <div class="cards-container-inicio">
      <!-- CARD 1 -->
      <div class="card-beneficio">
        <div class="icono">🎓</div>

        <h3>Educación de Calidad</h3>

        <p>
          Materias tecnicas con un aprendizaje teorico pero sobre todo practico.
        </p>
      </div>

      <!-- CARD 2 -->
      <div class="card-beneficio">
        <div class="icono">👨‍🏫</div>

        <h3>Docentes Capacitados</h3>

        <p>
          Maestros con experiencia en el ambito laboral de la materia
          compartiendo sus conocimientos.
        </p>
      </div>

      <!-- CARD 3 -->
      <div class="card-beneficio">
        <div class="icono">🛠️</div>

        <h3>Formación Técnica</h3>

        <p>
          Carreras orientadas al trabajo y desarrollo profesional para jovenes y
          adultos.
        </p>
      </div>

      <!-- CARD 4 -->
      <div class="card-beneficio">
        <div class="icono">📜</div>

        <h3>Certificación</h3>

        <p>
          al finalizar la carrera otorga el certificado abalado por el
          'MINISTERIO DE EDUCACION'en las diferentes carreras.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import "../styles/inicio.css";
import Carrusel from "../components/carrusel.vue";
</script>
