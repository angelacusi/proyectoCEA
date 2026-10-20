<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <!-- LOGO -->
      <router-link
        to="/"
        class="navbar-brand logo-container"
        @click="cerrarMenu"
      >
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
              @mouseenter="abrirConHover('publicaciones')"
              @mouseleave="cerrarConHover('publicaciones')"
            >
              <button
                type="button"
                class="nav-link boton-publicaciones"
                :class="{
                  'categoria-activa': $route.path === '/publicaciones',
                }"
                :aria-expanded="publicacionesAbiertas"
                aria-controls="submenuPublicaciones"
                @click="alternarPublicaciones"
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

                <li>
                  <router-link
                    class="submenu-link"
                    :class="{
                      'categoria-activa': $route.query.tipo === 'proyectos',
                    }"
                    :to="{
                      path: '/publicaciones',
                      query: { tipo: 'proyectos' },
                    }"
                    @click="cerrarMenu"
                  >
                    <i class="bi bi-folder2-open"></i>
                    Proyectos
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
            <li
              class="nav-item dropdown-publicaciones"
              :class="{ desplegado: nosotrosAbierto }"
              @mouseenter="abrirConHover('nosotros')"
              @mouseleave="cerrarConHover('nosotros')"
            >
              <button
                type="button"
                class="nav-link boton-publicaciones"
                :class="{
                  'categoria-activa': $route.path === '/nosotros',
                }"
                :aria-expanded="nosotrosAbierto"
                aria-controls="submenuNosotros"
                @click="alternarNosotros"
              >
                NOSOTROS
                <span class="flecha-publicaciones">▾</span>
              </button>

              <ul
                v-show="nosotrosAbierto"
                id="submenuNosotros"
                class="submenu-publicaciones submenu-nosotros"
              >
                <li>
                  <a
                    class="submenu-link"
                    href="/nosotros#mision"
                    @click.prevent="irASeccion('mision')"
                  >
                    <i class="bi bi-building"></i>
                    Misión, visión y objetivos
                  </a>
                </li>

                <li>
                  <a
                    class="submenu-link"
                    href="/nosotros#estadisticas"
                    @click.prevent="irASeccion('estadisticas')"
                  >
                    <i class="bi bi-bar-chart-line"></i>
                    Estadísticas
                  </a>
                </li>

                <li>
                  <a
                    class="submenu-link"
                    href="/nosotros#requisitos"
                    @click.prevent="irASeccion('requisitos')"
                  >
                    <i class="bi bi-card-checklist"></i>
                    Requisitos
                  </a>
                </li>

                <li>
                  <a
                    class="submenu-link"
                    href="/nosotros#inscripcion"
                    @click.prevent="irASeccion('inscripcion')"
                  >
                    <i class="bi bi-file-earmark-text"></i>
                    Inscripción
                  </a>
                </li>

                <li>
                  <a
                    class="submenu-link"
                    href="/nosotros#contacto"
                    @click.prevent="irASeccion('contacto')"
                  >
                    <i class="bi bi-geo-alt"></i>
                    Contacto y ubicación
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import "../styles/navbar.css";

const router = useRouter();

const publicacionesAbiertas = ref(false);
const nosotrosAbierto = ref(false);

const esMovil = () => window.innerWidth < 992;

// En computadora, abrir y cerrar con el cursor.
const abrirConHover = (menu) => {
  if (esMovil()) return;

  if (menu === "publicaciones") {
    publicacionesAbiertas.value = true;
  } else {
    nosotrosAbierto.value = true;
  }
};

const cerrarConHover = (menu) => {
  if (esMovil()) return;

  if (menu === "publicaciones") {
    publicacionesAbiertas.value = false;
  } else {
    nosotrosAbierto.value = false;
  }
};

// En móvil, abrir los submenús con clic.
const alternarPublicaciones = () => {
  if (esMovil()) {
    publicacionesAbiertas.value = !publicacionesAbiertas.value;
  }
};

// En computadora, el clic en NOSOTROS abre la página.
// En móvil, el clic abre o cierra el submenú.
const alternarNosotros = () => {
  if (esMovil()) {
    nosotrosAbierto.value = !nosotrosAbierto.value;
  } else {
    router.push("/nosotros");
  }
};

// Cerrar submenús y el menú hamburguesa al elegir un enlace.
const cerrarMenu = () => {
  publicacionesAbiertas.value = false;
  nosotrosAbierto.value = false;

  const offcanvasElement = document.getElementById("offcanvasNavbar");

  if (offcanvasElement && window.bootstrap?.Offcanvas) {
    const instancia = window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    instancia?.hide();
  }
};

// Navegar a una sección de Nosotros, incluso si venimos de otra página.
const irASeccion = async (id) => {
  publicacionesAbiertas.value = false;
  nosotrosAbierto.value = false;

  await router.push({ path: "/nosotros", hash: `#${id}` });
  await nextTick();

  // Esperar a que Vue y el navegador actualicen la página.
  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    // Cerrar la hamburguesa solo en móviles.
    if (esMovil()) {
      const offcanvasElement = document.getElementById("offcanvasNavbar");

      if (offcanvasElement && window.bootstrap?.Offcanvas) {
        const instancia =
          window.bootstrap.Offcanvas.getInstance(offcanvasElement);
        instancia?.hide();
      }
    }
  });
};

// Efecto del navbar al desplazarse.
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
