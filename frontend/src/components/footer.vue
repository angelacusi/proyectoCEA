<template>
  <footer class="footer">
    <div class="footer-contenido">
      <div class="footer-logo">
        <h3>C.E.A. Boliviano Alemán</h3>

        <p>
          Formación técnica para jóvenes y adultos con educación de calidad.
        </p>
      </div>

      <div class="footer-links">
        <h4>Enlaces</h4>

        <router-link to="/"> Inicio </router-link>

        <router-link to="/carreras"> Carreras </router-link>

        <router-link to="/publicaciones"> Publicaciones </router-link>

        <router-link to="/nosotros"> Nosotros </router-link>
      </div>

      <div class="footer-contacto">
        <h4>Contacto</h4>

        <p>
          <i class="bi bi-whatsapp"></i>
          78780074
        </p>

        <p>
          <i class="bi bi-geo-alt-fill"></i>
          La Paz - Bolivia
        </p>
      </div>
    </div>

    <div class="footer-copy">
      © 2026 C.E.A. Boliviano Alemán — Todos los derechos reservados
    </div>
  </footer>
</template>

<script setup>
import "../styles/footer.css";
</script>
