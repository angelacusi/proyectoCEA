<template>

<div class="carreras">

    <div class="titulo">

        <h1>Nuestras Carreras</h1>

        <p>
            Conoce nuestras opciones de formación técnica
        </p>

    </div>

    <div class="cards-container">

        <div
            class="card-carrera"
            v-for="carrera in carreras"
            :key="carrera.id"
        >

            <!-- Imagen -->
            <div class="imagen">

                <img
                    :src="carrera.imagen"
                    :alt="carrera.nombre"
                >

            </div>

            <!-- Centro -->
            <div class="info">

                <h3>
                    {{ carrera.nombre }}
                </h3>

                <p>
                    {{ carrera.descripcion }}
                </p>

            </div>

            <!-- Derecha -->
            <div class="datos">

                <p>
                    📚 {{ carrera.alcance }}
                </p>

                <p>
                    ⏳ {{ carrera.duracion }}
                </p>

                <a
                    :href="carrera.malla"
                    target="_blank"
                    class="btn-malla"
                >
                    Ver malla
                </a>

            </div>

        </div>
    </div>

</div>

</template>

<script setup>

import "../styles/carreras.css"

import sistemas from "../assets/sistemas.png"
import secretariado from "../assets/secretariado.png"



const carreras=[

{
    id:1,

    nombre:"Sistemas Informáticos",

    descripcion:
    "Formación en desarrollo de software y tecnologías.",

    alcance:
    "Técnico Básico, Técnico Auxiliar y Técnico Medio",

    duracion:"2 años",

    imagen:sistemas,

    malla:""
},

{
    id:2,

    nombre:"Secretariado Ejecutivo",

    descripcion:
    "Formación en administración y gestión documental.",

    alcance:
    "Técnico Básico y Técnico Auxiliar",

    duracion:"1 año y medio",

    imagen:secretariado,

    malla:""
}

]
</script>

