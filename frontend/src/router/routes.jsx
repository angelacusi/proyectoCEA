import { createRouter, createWebHistory } from "vue-router";

import Inicio from "../paginas/Inicio.vue";
import Carreras from "../paginas/Carreras.vue";
// import Publicaciones from "../paginas/Publicaciones.vue";
// import Nosotros from "../paginas/Nosotros.vue";
// import Contacto from "../paginas/Contacto.vue";

const routes = [

    {
        path: "/",
        component: Inicio
    },

    {
        path: "/carreras",
        component: Carreras
    }
    // ,

    // {
    //     path: "/publicaciones",
    //     component: Publicaciones
    // },

    // {
    //     path: "/nosotros",
    //     component: Nosotros
    // },

    // {
    //     path: "/contacto",
    //     component: Contacto
    // }

];

const router = createRouter({

    history: createWebHistory(),

    routes

});

export default router;