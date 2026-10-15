<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <!-- LOGO -->
      <router-link to="/" class="navbar-brand logo-container">
        <img src="/pngLogo.png" alt="Logo CEA" />

        <div class="logo-texto">
          <h1>CEA BOLIVIANO ALEMÁN</h1>
          <p>Formación en Tecnico Basico, Tecnico Medio y Tecnico Auxiliar</p>
        </div>
      </router-link>

      <!-- BOTÓN MÓVIL -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
        aria-label="Abrir menú"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- MENÚ -->
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        data-bs-backdrop="false"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENÚ</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar menú"
          ></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <!-- INICIO -->
            <li class="nav-item">
              <router-link class="nav-link" to="/" @click="cerrarMenu">
                INICIO
              </router-link>
            </li>

            <!-- CARRERAS -->
            <li class="nav-item">
              <router-link class="nav-link" to="/carreras" @click="cerrarMenu">
                CARRERAS
              </router-link>
            </li>

            <!-- PUBLICACIONES -->
            <li
              class="nav-item dropdown-publicaciones"
              :class="{ desplegado: publicacionesAbiertas }"
            >
              <button
                type="button"
                class="nav-link boton-publicaciones"
                :class="{
                  'categoria-activa': $route.path === '/publicaciones',
                }"
                :aria-expanded="publicacionesAbiertas"
                aria-controls="submenuPublicaciones"
                @click="publicacionesAbiertas = !publicacionesAbiertas"
              >
                PUBLICACIONES
                <span class="flecha-publicaciones">▾</span>
              </button>

              <ul
                v-show="publicacionesAbiertas"
                id="submenuPublicaciones"
                class="submenu-publicaciones"
              >
                <li>
                  <router-link
                    class="submenu-link"
                    :class="{
                      'categoria-activa': $route.query.tipo === 'convocatorias',
                    }"
                    :to="{
                      path: '/publicaciones',
                      query: { tipo: 'convocatorias' },
                    }"
                    @click="cerrarMenu"
                  >
                    <i class="bi bi-megaphone"></i>
                    Convocatorias
                  </router-link>
                </li>

                <li>
                  <router-link
                    class="submenu-link"
                    :class="{
                      'categoria-activa': $route.query.tipo === 'boletines',
                    }"
                    :to="{
                      path: '/publicaciones',
                      query: { tipo: 'boletines' },
                    }"
                    @click="cerrarMenu"
                  >
                    <i class="bi bi-newspaper"></i>
                    Boletines
                  </router-link>
                </li>

                <li>
                  <router-link
                    class="submenu-link"
                    :class="{
                      'categoria-activa': $route.query.tipo === 'revistas',
                    }"
                    :to="{
                      path: '/publicaciones',
                      query: { tipo: 'revistas' },
                    }"
                    @click="cerrarMenu"
                  >
                    <i class="bi bi-book"></i>
                    Revistas
                  </router-link>
                </li>
              </ul>
            </li>

            <!-- ACTIVIDADES -->
            <li class="nav-item">
              <router-link
                class="nav-link"
                to="/actividades"
                @click="cerrarMenu"
              >
                ACTIVIDADES
              </router-link>
            </li>

            <!-- NOSOTROS -->
            <li class="nav-item">
              <router-link class="nav-link" to="/nosotros" @click="cerrarMenu">
                NOSOTROS
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import "../styles/navbar.css";

const publicacionesAbiertas = ref(false);

const cerrarMenu = () => {
  publicacionesAbiertas.value = false;

  // Cierra el offcanvas únicamente si está abierto.
  const elemento = document.getElementById("offcanvasNavbar");

  if (elemento && window.bootstrap?.Offcanvas) {
    const instancia = window.bootstrap.Offcanvas.getInstance(elemento);

    if (instancia) {
      instancia.hide();
    }
  }
};

const cambiarNavbar = () => {
  const navbar = document.querySelector(".custom-navbar");

  if (!navbar) return;

  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else if (window.scrollY < 40) {
    navbar.classList.remove("scrolled");
  }
};

onMounted(() => {
  window.addEventListener("scroll", cambiarNavbar);
  cambiarNavbar();
});

onUnmounted(() => {
  window.removeEventListener("scroll", cambiarNavbar);
});
</script>
