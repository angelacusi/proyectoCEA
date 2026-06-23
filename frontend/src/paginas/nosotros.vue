<template>
  <!-- HERO -->
  <section class="hero-nosotros">
    <img src="../assets/instituto.png" alt="Instituto" />

    <div class="overlay">
      <h1>Nosotros</h1>

      <p>
        Conoce más sobre el Centro de Educación Alternativa Boliviano Alemán y
        nuestra formación técnica.
      </p>
    </div>
  </section>

  <!-- MISIÓN - VISIÓN - OBJETIVOS -->
  <section class="contenedor-info">
    <!-- Misión -->
    <div class="card-info">
      <div class="circulo"></div>

      <div class="icono">🎯</div>

      <h2>Misión</h2>

      <p>
        Formar profesionales íntegros con valores morales y éticos, con
        formación técnica, tecnológica, científica y productiva. Desarrollamos
        personas creativas, innovadoras y con actitud emprendedora, capaces de
        responder a las necesidades del mercado laboral y de la sociedad.
      </p>
    </div>

    <!-- Visión -->
    <div class="card-info">
      <div class="circulo"></div>

      <div class="icono">👁️</div>

      <h2>Visión</h2>

      <p>
        Ser un Centro de Educación Alternativa de excelencia académica,
        reconocido por formar mujeres y hombres competitivos en el ámbito
        laboral y empresarial, fundamentados en principios, valores éticos y
        comunitarios orientados al vivir bien.
      </p>
    </div>

    <!-- Objetivos -->
    <div class="card-info card-objetivos">
      <div class="circulo"></div>

      <div class="icono">🚀</div>

      <h2>Objetivos</h2>

      <p>
        Capacitar a las y los participantes con conocimientos, habilidades y
        destrezas que les permitan:
      </p>

      <ul>
        <li>
          Planificar, organizar y ejecutar procesos técnicos y tecnológicos de
          acuerdo con la especialidad elegida.
        </li>

        <li>
          Aplicar conocimientos científicos y prácticos en la solución de
          problemas del entorno laboral y social.
        </li>

        <li>
          Desarrollar capacidades de liderazgo, innovación y emprendimiento.
        </li>

        <li>
          Integrarse al mercado laboral con responsabilidad, honestidad y
          compromiso con la sociedad.
        </li>
      </ul>
    </div>
  </section>

  <!-- REQUISITOS -->
  <section class="requisitos">
    <h2>Requisitos de inscripción</h2>

    <p class="subtitulo">
      Documentos necesarios para iniciar el proceso de inscripción.
    </p>

    <div class="lista-requisitos">
      <div class="req">Ser mayor de 15 años</div>

      <div class="req">3 fotocopias de Cédula de Identidad</div>

      <div class="req">2 fotocopias del Certificado de Nacimiento</div>

      <div class="req">Fotografías tamaño 4x4</div>

      <div class="req">Formulario RUDEAL correctamente llenado</div>

      <div class="req">Inscripción completamente gratuita</div>
    </div>
  </section>

  <!-- INFORMACIÓN ACADÉMICA -->
  <section class="info-academica">
    <h2>Información académica</h2>

    <p class="subtitulo">Conoce la modalidad y horarios de nuestras clases.</p>

    <div class="info-grid">
      <div class="info-box">
        <div class="icono-info">🏫</div>

        <h3>Modalidad</h3>

        <p>Presencial</p>
      </div>

      <div class="info-box">
        <div class="icono-info">🕒</div>

        <h3>Horario</h3>

        <p>19:00 PM - 21:40 PM</p>
      </div>

      <div class="info-box">
        <div class="icono-info">📅</div>

        <h3>Días de clases</h3>

        <p>Lunes a viernes</p>
      </div>
    </div>
  </section>
  <!-- PROCESO DE INSCRIPCIÓN -->

  <section class="inscripcion-rude">
    <h2>Proceso de inscripción</h2>

    <p class="subtitulo">
      Complete el RUDEAL y adjúntelo junto con los demás requisitos solicitados
      por el Centro de Educación Alternativa.
    </p>

    <div class="opciones-inscripcion">
      <!-- Descargar RUDE vacío -->
      <div class="opcion-card">
        <div class="icono-opcion">📄</div>

        <h3>Descargar RUDEAL en blanco</h3>

        <p>
          Descargue el formulario oficial para llenarlo manualmente y entregarlo
          en nuestras instalaciones.
        </p>

        <a href="/rude.pdf" download class="btn-rude"> Descargar RUDEAL </a>
      </div>

      <!-- Llenar RUDE digital -->
      <div class="opcion-card">
        <div class="icono-opcion">💻</div>

        <h3>Llenar RUDEAL digitalmente</h3>

        <p>
          Complete el formulario en línea, genere su RUDEAL en PDF y
          posteriormente imprímalo para presentarlo junto a los demás documentos
          de inscripción.
        </p>

        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#modalRude"
          class="btn-rude"
        >
          Llenar RUDEAL digital
        </button>
      </div>
    </div>

    <modalRude />
  </section>
  <section class="contacto">
    <h2>C.E.A. Boliviano Alemán</h2>

    <div class="contacto-card">
      <h4>Contactanos</h4>

      <div class="redes">
        <a href="https://wa.me/59178780074">
          <i class="bi bi-whatsapp"></i>
        </a>

        <a
          href="https://www.facebook.com/profile.php?id=61556484240164&sk=about&locale=es_LA"
        >
          <i class="bi bi-facebook"></i>
        </a>

        <a
          href="https://www.tiktok.com/@c.e.a.bolivianoaleman?is_from_webapp=1&sender_device=pc"
        >
          <i class="bi bi-tiktok"></i>
        </a>
      </div>

      <div class="info-contacto">
        <h4>Encuentranos</h4>

        <p>
          <i class="bi bi-geo-alt-fill"></i>

          La Paz, calle Catacora entre Pichincha y Montenegro, a media cuadra de
          la plaza Riosinho, instalaciones U.E Genaro Gamarra.
        </p>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.298865795666!2d-68.13740792498601!3d-16.49154544050753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21f4c6747d1b%3A0x814510a2d549aacb!2sC.E.A.%20Boliviano%20Alem%C3%A1n!5e1!3m2!1ses-419!2sbo!4v1779834570068!5m2!1ses-419!2sbo"
          width="100%"
          height="400"
          loading="lazy"
        >
        </iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import "../styles/nosotros.css";
import modalRude from "../components/modalRude.vue";
</script>
