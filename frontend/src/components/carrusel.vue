<template>
  <div
    id="carouselCEA"
    class="carousel slide"
    data-bs-ride="carousel"
    data-bs-interval="6000"
  >
    <!-- Indicadores -->
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselCEA"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselCEA"
        data-bs-slide-to="1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselCEA"
        data-bs-slide-to="2"
      ></button>
    </div>

    <!-- Imágenes y Contenido -->
    <div class="carousel-inner">
      <!-- SLIDE 1 -->
      <div class="carousel-item active">
        <img
          src="../assets/carrusel1.jpg"
          class="d-block w-100 carousel-img"
          alt="CEA Boliviano Alemán"
        />
        <div class="carousel-overlay"></div>
        <div class="carousel-caption">
          <div class="caption-container">
            <h1>CEA Boliviano Alemán</h1>
            <p>
              Formando profesionales técnicos para el futuro con excelencia
              académica y valores.
            </p>

            <div class="caption-actions">
              <!-- RouterLink para navegación interna fluida -->
              <router-link
                :to="{ path: '/nosotros#requisitos', hash: '#requisitos' }"
                class="btn-inscripcion"
              >
                Requisitos de Inscripción
              </router-link>
              <router-link to="/carreras" class="btn-secundario-carousel">
                Ver Carreras
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 2 -->
      <div class="carousel-item">
        <img
          src="../assets/carrusel2.jpg"
          class="d-block w-100 carousel-img"
          alt="Carreras Técnicas"
        />
        <div class="carousel-overlay"></div>
        <div class="carousel-caption">
          <div class="caption-container">
            <h1>Carreras Técnicas</h1>
            <p>
              Educación de calidad orientada a las necesidades productivas de la
              sociedad.
            </p>
            <div class="caption-actions">
              <router-link to="/carreras" class="btn-inscripcion">
                Explorar Especialidades
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- SLIDE 3 -->
      <div class="carousel-item">
        <img
          src="../assets/carrusel3.jpg"
          class="d-block w-100 carousel-img"
          alt="Docentes"
        />
        <div class="carousel-overlay"></div>
        <div class="carousel-caption">
          <div class="caption-container">
            <h1>Docentes Calificados</h1>
            <p>
              Compromiso pedagógico y vocación de servicio para tu formación
              integral.
            </p>
            <div class="caption-actions">
              <router-link to="/nosotros" class="btn-inscripcion">
                Conoce Nuestra Misión
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Flechas de navegación -->
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselCEA"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselCEA"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
</template>

<script setup>
import "../styles/carrusel.css";
</script>
