import { createRouter, createWebHistory } from "vue-router";

import inicio from "../paginas/inicio.vue";
import carreras from "../paginas/carreras.vue";
import publicaciones from "../paginas/publicaciones.vue";
import nosotros from "../paginas/nosotros.vue";
import actividades from "../paginas/actividades.vue";

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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
