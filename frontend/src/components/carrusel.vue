<template>

    <div id="carouselCEA" class="carousel slide" data-bs-ride="carousel">

        <!-- Indicadores -->
        <div class="carousel-indicators">
            <button
                type="button"
                data-bs-target="#carouselCEA"
                data-bs-slide-to="0"
                class="active"
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

        <!-- Imágenes -->
        <div class="carousel-inner">

            <div class="carousel-item active">
                <img
                    src="../assets/carrusel1.jpg"
                    class="d-block w-100 carousel-img"
                    alt="Instituto"
                >

                <div class="carousel-caption">
                    <h1>CEA Boliviano Alemán</h1>
                    <p>Formando profesionales para el futuro</p>
                </div>
            </div>

            <div class="carousel-item">
                <img
                    src="../assets/carrusel2.jpg"
                    class="d-block w-100 carousel-img"
                    alt="Carreras"
                >

                <div class="carousel-caption">
                    <h1>Carreras Técnicas</h1>
                    <p>Educación de calidad</p>
                </div>
            </div>

            <div class="carousel-item">
                <img
                    src="../assets/carrusel3.jpg"
                    class="d-block w-100 carousel-img"
                    alt="Docentes"
                >

                <div class="carousel-caption">
                    <h1>Docentes Calificados</h1>
                    <p>Compromiso y excelencia académica</p>
                </div>
            </div>

        </div>

        <!-- Botones -->
        <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselCEA"
            data-bs-slide="prev"
        >
            <span class="carousel-control-prev-icon"></span>
        </button>

        <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselCEA"
            data-bs-slide="next"
        >
            <span class="carousel-control-next-icon"></span>
        </button>

    </div>

</template>

<script setup>
import "../styles/carrusel.css"
</script>