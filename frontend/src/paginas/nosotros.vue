<template>
  <section class="hero-nosotros">
    <img src="../assets/instituto.png" alt="Instituto" />

    <div class="overlay">
      <h1>Nosotros</h1>

      <p>Conoce más sobre nuestra institución y nuestra formación técnica.</p>
    </div>
  </section>

  <section class="contenedor-info">
    <div class="card-info">
      <div class="circulo"></div>

      <div class="icono">🎯</div>

      <h2>Misión</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat ipsa
        nesciunt suscipit deserunt ad dolores, recusandae fugiat necessitatibus
        quos, architecto tempora natus fuga nisi sed mollitia quibusdam sapiente
        quam aspernatur!
      </p>
    </div>

    <div class="card-info">
      <div class="circulo"></div>

      <div class="icono">👁️</div>

      <h2>Visión</h2>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
        molestias in dignissimos doloremque nostrum magni ut error quos ipsam,
        molestiae ipsa accusamus expedita quod eveniet similique ipsum? Quasi,
        consequatur minus.
      </p>
    </div>

    <div class="card-info">
      <div class="circulo"></div>

      <div class="icono">🚀</div>

      <h2>Objetivos</h2>

      <ul>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur,
        suscipit mollitia ipsa quo repellendus explicabo laborum ex fuga
        assumenda perspiciatis est a maxime repellat neque. Explicabo ea fugiat
        commodi reiciendis?
      </ul>
    </div>
  </section>

  <section class="requisitos">
    <h2>Requisitos de inscripción</h2>
    <p class="subtitulo">
      Necesario para iniciar tu formación técnica con nosotros.
    </p>
    <div class="lista-requisitos">
      <div class="req">Ser mayor de 15 años</div>

      <div class="req">3 Fotocopias de carnet</div>

      <div class="req">2 fotocopias de Cert. Nacimiento</div>

      <div class="req">Fotografías tamaño 4x4</div>

      <div class="req">Llenado de RUE</div>

      <div class="req">Completamente gratis</div>
    </div>
  </section>

  <section class="info-academica">
    <h2>Información académica</h2>

    <p class="subtitulo">Conoce la modalidad y horarios de nuestras clases</p>

    <div class="info-grid">
      <div class="info-box">
        <div class="icono-info">🏫</div>

        <h3>Modalidad</h3>

        <p>Presencial</p>
      </div>

      <div class="info-box">
        <div class="icono-info">🕒</div>

        <h3>Horario</h3>

        <p>7:00 PM - 9:40 PM</p>
      </div>

      <div class="info-box">
        <div class="icono-info">📅</div>

        <h3>Días de clases</h3>

        <p>Lunes a Viernes</p>
      </div>
    </div>
  </section>

  <!-- INSCRIBETE -->

  <section class="inscribete">
    <h2>¡Construye tu futuro hoy!</h2>

    <p>Llena el RUDE y forma parte del C.E.A. Boliviano Alemán</p>

    <router-link to="/inscripcion" class="btn-inscripcion">
      Llenar RUDE
    </router-link>
  </section>

  <section class="contacto">
    <h2>C.E.A. Boliviano Alemán</h2>

    <div class="contacto-card">
      <p>Encuentranos y Contactanos</p>
      <div class="info-contacto">
        <p>
          <i class="bi bi-geo-alt-fill"></i>

          La Paz, calle Catacora entre Pichincha y Montenegro, a media cuadra de
          la plaza Riosinho, instalaciones U.E Genaro Gamarra.
        </p>
      </div>

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
    </div>
  </section>

  <!-- MAPA -->

  <section class="mapa">
    <h2>Encuéntranos</h2>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.298865795666!2d-68.13740792498601!3d-16.49154544050753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f21f4c6747d1b%3A0x814510a2d549aacb!2sC.E.A.%20Boliviano%20Alem%C3%A1n!5e1!3m2!1ses-419!2sbo!4v1779834570068!5m2!1ses-419!2sbo"
      width="100%"
      height="400"
      loading="lazy"
    >
    </iframe>
  </section>
</template>

<script setup>
import "../styles/nosotros.css";
</script>
