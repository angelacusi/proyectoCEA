import { createRouter, createWebHistory } from "vue-router";

import inicio from "../paginas/inicio.vue";
import carreras from "../paginas/carreras.vue";
import publicaciones from "../paginas/publicaciones.vue";
import nosotros from "../paginas/nosotros.vue";
import actividades from "../paginas/actividades.vue";
import login from "../paginas/login.vue";
import usuarios from "../paginas/usuarios.vue";
import miCuenta from "../paginas/miCuenta.vue";

import { authService } from "../services/authService";

const routes = [
  {
    path: "/",
    name: "inicio",
    component: inicio,
  },
  {
    path: "/carreras",
    name: "carreras",
    component: carreras,
  },
  {
    path: "/publicaciones",
    name: "publicaciones",
    component: publicaciones,
  },
  {
    path: "/actividades",
    name: "actividades",
    component: actividades,
  },
  {
    path: "/nosotros",
    name: "nosotros",
    component: nosotros,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/admin/usuarios",
    name: "usuarios",
    component: usuarios,
    meta: {
      requiereSesion: true,
      requiereAdmin: true,
    },
  },
  {
    path: "/mi-cuenta",
    name: "miCuenta",
    component: miCuenta,
    meta: {
      requiereSesion: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Protección de las páginas privadas
router.beforeEach(async (to) => {
  if (!to.meta.requiereSesion) {
    return true;
  }

  let usuario = authService.usuarioActual.value;

  // Verificar nuevamente la sesión al entrar a una página protegida
  usuario = await authService.comprobarSesion();

  if (!usuario) {
    return {
      name: "login",
      query: { redireccion: to.fullPath },
    };
  }

  if (to.meta.requiereAdmin && usuario.rol !== "administrador") {
    return { name: "inicio" };
  }

  return true;
});

export default router;
