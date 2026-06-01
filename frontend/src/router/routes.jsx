import { createRouter, createWebHistory } from "vue-router";

import inicio from "../paginas/inicio.vue";
import carreras from "../paginas/carreras.vue";
import publicaciones from "../paginas/publicaciones.vue";
import nosotros from "../paginas/nosotros.vue";
import inscripcion from "../paginas/inscripcion.vue";
// import Contacto from "../paginas/Contacto.vue";

const routes = [
  {
    path: "/",
    component: inicio,
  },

  {
    path: "/carreras",
    component: carreras,
  },
  // ,

  {
    path: "/publicaciones",
    component: publicaciones,
  },

  {
    path: "/nosotros",
    component: nosotros,
  },

  {
    path: "/inscripcion",
    component: inscripcion,
  },
];

const router = createRouter({
  history: createWebHistory(),

  routes,
});

export default router;
