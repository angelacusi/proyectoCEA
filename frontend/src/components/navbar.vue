<template>

<!-- HEADER -->
<div class="top-header">

    <div class="header-left">
        <p>Centro de educación técnica tecnológica productiva</p>
        <p>Carreras a nivel técnico básico, auxiliar y medio</p>
    </div>

    <div class="header-center">
        <h1>CEA BOLIVIANO-ALEMÁN</h1>
        <p>Centro de Educación Alternativa</p>
    </div>

    <div class="header-right">
        <img
            src="../assets/logo.jpg"
            alt="Logo CEA"
        >
    </div>

</div>

<!-- NAVBAR -->
<div class="navbar-container">

<nav class="navbar navbar-expand-sm custom-navbar">

    <div class="container-fluid">

        <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <div
            class="collapse navbar-collapse"
            id="navbarNav"
        >

            <div class="navbar-nav mx-auto">

                <router-link
                    class="nav-link"
                    to="/"
                >
                    INICIO
                </router-link>

                <router-link
                    class="nav-link"
                    to="/carreras"
                >
                    CARRERAS
                </router-link>

                <router-link
                    class="nav-link"
                    to="/publicaciones"
                >
                    PUBLICACIONES
                </router-link>

                <router-link
                    class="nav-link"
                    to="/nosotros"
                >
                    NOSOTROS
                </router-link>

                <router-link
                    class="nav-link"
                    to="/contacto"
                >
                    CONTACTO
                </router-link>

            </div>

        </div>

    </div>

</nav>

</div>


</template>

<script setup> import "../styles/navbar.css"; </script>