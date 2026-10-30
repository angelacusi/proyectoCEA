<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import "../styles/navbar.css";
import { authService } from "../services/authService";

const router = useRouter();

// Menús desplegables
const publicacionesAbiertas = ref(false);
const nosotrosAbierto = ref(false);
const cuentaAbierta = ref(false);

// Sesión del usuario
const usuarioActual = authService.usuarioActual;
const comprobandoSesion = authService.comprobandoSesion;

// Estado de cierre de sesión
const cerrandoSesion = ref(false);

// Verificar rol
const esAdministrador = computed(() => {
  return usuarioActual.value?.rol === "administrador";
});

// Mostrar nombre del rol
const nombreRol = computed(() => {
  const rol = usuarioActual.value?.rol;

  if (!rol) return "";

  return rol.charAt(0).toUpperCase() + rol.slice(1);
});

// Detectar móvil
const esMovil = () => window.innerWidth < 992;

// Abrir menús con hover en escritorio
const abrirConHover = (menu) => {
  if (esMovil()) return;

  if (menu === "publicaciones") {
    publicacionesAbiertas.value = true;
  } else if (menu === "nosotros") {
    nosotrosAbierto.value = true;
  }
};

// Cerrar menús con hover
const cerrarConHover = (menu) => {
  if (esMovil()) return;

  if (menu === "publicaciones") {
    publicacionesAbiertas.value = false;
  } else if (menu === "nosotros") {
    nosotrosAbierto.value = false;
  }
};

// Abrir publicaciones en móvil
const alternarPublicaciones = () => {
  if (esMovil()) {
    publicacionesAbiertas.value = !publicacionesAbiertas.value;
  }
};

// En móvil abre el desplegable.
// En escritorio lleva directamente a Nosotros.
const alternarNosotros = () => {
  if (esMovil()) {
    nosotrosAbierto.value = !nosotrosAbierto.value;
  } else {
    router.push("/nosotros");
  }
};

// Cerrar el menú de navegación
const cerrarMenu = () => {
  publicacionesAbiertas.value = false;
  nosotrosAbierto.value = false;
  cuentaAbierta.value = false;

  const elemento = document.getElementById("offcanvasNavbar");

  if (elemento && window.bootstrap?.Offcanvas) {
    window.bootstrap.Offcanvas.getInstance(elemento)?.hide();
  }
};

// Ir a una sección de Nosotros
const irASeccion = async (id) => {
  publicacionesAbiertas.value = false;
  nosotrosAbierto.value = false;
  cuentaAbierta.value = false;

  await router.push({
    path: "/nosotros",
    hash: `#${id}`,
  });

  await nextTick();

  requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    if (esMovil()) {
      const elemento = document.getElementById("offcanvasNavbar");

      if (elemento && window.bootstrap?.Offcanvas) {
        window.bootstrap.Offcanvas.getInstance(elemento)?.hide();
      }
    }
  });
};

// Cerrar sesión
const cerrarSesion = async () => {
  if (cerrandoSesion.value) return;

  cerrandoSesion.value = true;

  try {
    await authService.cerrarSesion();

    cerrarMenu();

    await router.push("/");
  } catch (error) {
    alert(error.message || "No se pudo cerrar la sesión.");
  } finally {
    cerrandoSesion.value = false;
  }
};

// Efecto de la barra al desplazarse
const cambiarNavbar = () => {
  const navbar = document.querySelector(".custom-navbar");

  if (!navbar) return;

  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else if (window.scrollY < 40) {
    navbar.classList.remove("scrolled");
  }
};

// Inicialización
onMounted(() => {
  cambiarNavbar();

  window.addEventListener("scroll", cambiarNavbar, {
    passive: true,
  });
});

// Limpiar evento
onUnmounted(() => {
  window.removeEventListener("scroll", cambiarNavbar);
});
</script>

<template>
  <nav class="navbar navbar-expand-lg custom-navbar">
    <div class="container-fluid">
      <!-- LOGO INSTITUCIONAL -->
      <router-link
        to="/"
        class="navbar-brand logo-container"
        @click="cerrarMenu"
      >
        <img src="/pngLogo.png" alt="Logo CEA" />

        <div class="logo-texto">
          <h1>CEA BOLIVIANO ALEMÁN</h1>
          <p>Formación en Técnico Básico, Técnico Auxiliar y Técnico Medio</p>
        </div>
      </router-link>

      <!-- BOTÓN HAMBURGUESA -->
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

      <!-- MENÚ PRINCIPAL -->
      <div
        id="offcanvasNavbar"
        class="offcanvas offcanvas-end"
        tabindex="-1"
        data-bs-backdrop="false"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 id="offcanvasNavbarLabel" class="offcanvas-title">MENÚ</h5>

          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar menú"
          ></button>
        </div>

        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <!-- REDES SOCIALES -->
            <li class="redes-sociales">
              <a
                class="nav-icon"
                href="https://wa.me/59178780074"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
              >
                <i class="bi bi-whatsapp"></i>
              </a>

              <a
                class="nav-icon"
                href="https://www.facebook.com/profile.php?id=61556484240164&sk=about&locale=es_LA"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
              >
                <i class="bi bi-facebook"></i>
              </a>

              <a
                class="nav-icon"
                href="https://www.tiktok.com/@c.e.a.bolivianoaleman?is_from_webapp=1&sender_device=pc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title="TikTok"
              >
                <i class="bi bi-tiktok"></i>
              </a>
            </li>

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

            <!-- MENÚ DE CUENTA -->
            <li
              v-if="!comprobandoSesion && usuarioActual"
              class="nav-item cuenta-menu"
            >
              <button
                type="button"
                class="boton-usuario boton-usuario-externo"
                :aria-expanded="cuentaAbierta"
                aria-controls="submenuCuenta"
                @click="cuentaAbierta = !cuentaAbierta"
              >
                <i class="bi bi-person-circle"></i>

                <span class="cuenta-resumen">
                  <strong>{{ usuarioActual.nombre }}</strong>
                  <small>{{ nombreRol }}</small>
                </span>

                <i class="bi bi-chevron-down cuenta-flecha"></i>
              </button>

              <ul
                v-if="cuentaAbierta"
                id="submenuCuenta"
                class="submenu-cuenta"
              >
                <li class="cuenta-encabezado">
                  <strong>{{ usuarioActual.nombre }}</strong>
                  <span>{{ usuarioActual.correo }}</span>
                  <small>{{ nombreRol }}</small>
                </li>

                <!-- OPCIONES SOLO PARA ADMINISTRADOR -->
                <li v-if="esAdministrador">
                  <router-link
                    to="/admin/usuarios"
                    class="cuenta-enlace"
                    @click="cerrarMenu"
                  >
                    <i class="bi bi-people"></i>
                    Administrar usuarios
                  </router-link>
                </li>

                <!-- CUENTA PERSONAL -->
                <li>
                  <router-link
                    to="/mi-cuenta"
                    class="cuenta-enlace"
                    @click="cerrarMenu"
                  >
                    <i class="bi bi-person-gear"></i>
                    Editar cuenta
                  </router-link>
                </li>

                <!-- CERRAR SESIÓN -->
                <li class="cuenta-separador">
                  <button
                    type="button"
                    class="cuenta-enlace cuenta-salir"
                    :disabled="cerrandoSesion"
                    @click="cerrarSesion"
                  >
                    <i v-if="!cerrandoSesion" class="bi bi-box-arrow-right"></i>

                    <span
                      v-else
                      class="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>

                    {{
                      cerrandoSesion ? "Cerrando sesión..." : "Cerrar sesión"
                    }}
                  </button>
                </li>
              </ul>
            </li>

            <!-- ACCESO CUANDO NO HAY SESIÓN -->
            <li v-else-if="!comprobandoSesion" class="nav-item cuenta-menu">
              <router-link
                to="/login"
                class="boton-usuario boton-usuario-externo"
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
                @click="cerrarMenu"
              >
                <i class="bi bi-person-circle"></i>
                <span>Iniciar sesión</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
