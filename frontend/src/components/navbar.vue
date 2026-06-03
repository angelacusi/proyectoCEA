<template>
  <!-- NAVBAR OFFCANVAS -->

  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <!-- LOGO -->
      <router-link to="/" class="navbar-brand logo-container">
        <img src="/png logo.png" alt="Logo CEA" />

        <div class="logo-texto">
          <h1>CEA Boliviano Alemán</h1>

          <p>Formación en Tecnico Basico, Tecnico Medio y Tecnico Auxiliar</p>
        </div>
      </router-link>

      <!-- BOTON OFFCANVAS -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- OFFCANVAS -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <!-- HEADER -->
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <!-- BODY -->
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Inicio</router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/carreras"
                >Carreras</router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/publicaciones">
                Publicaciones
              </router-link>
            </li>

            <li class="nav-item">
              <router-link class="nav-link" to="/nosotros">
                Nosotros
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import "../styles/navbar.css";
</script>
