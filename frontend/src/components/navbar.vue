<template>
  <!-- NAVBAR -->

  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container">
      <!-- LOGO -->

      <router-link to="/" class="navbar-brand logo-container">
        <img src="/png logo.png" alt="Logo CEA" />

        <div class="logo-texto">
          <h1>CEA Boliviano Alemán</h1>

          <p>Formación en Tecnico Basico, Tecnico Medio y Tecnico Auxiliar</p>
        </div>
      </router-link>

      <!-- BOTON -->

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- LINKS -->

      <div class="collapse navbar-collapse" id="navbarNav">
        <div class="navbar-nav ms-auto">
          <router-link class="nav-link" to="/"> Inicio </router-link>

          <router-link class="nav-link" to="/carreras"> Carreras </router-link>

          <router-link class="nav-link" to="/publicaciones">
            Publicaciones
          </router-link>

          <router-link class="nav-link" to="/nosotros"> Nosotros </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import "../styles/navbar.css";
</script>
