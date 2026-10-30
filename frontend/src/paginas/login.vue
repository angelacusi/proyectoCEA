<template>
  <main class="login-pagina">
    <section class="login-contenedor">
      <!-- Panel institucional -->
      <aside class="login-lateral">
        <div class="login-marca">
          <img src="/pngLogo.png" alt="Logo CEA Boliviano Alemán" />
          <span>CEA BOLIVIANO ALEMÁN</span>
        </div>

        <div class="login-mensaje">
          <span class="login-etiqueta">
            <i class="bi bi-shield-lock"></i>
            ÁREA ADMINISTRATIVA
          </span>

          <h1>Bienvenido de nuevo</h1>

          <p>
            Accede al sistema de gestión institucional para continuar con tus
            actividades autorizadas.
          </p>
        </div>

        <div class="login-pie-lateral">
          <i class="bi bi-mortarboard"></i>
          Educación · Compromiso · Futuro
        </div>
      </aside>

      <!-- Formulario -->
      <section class="login-formulario">
        <router-link to="/" class="login-volver">
          <i class="bi bi-arrow-left"></i>
          Volver al sitio web
        </router-link>

        <div class="login-encabezado">
          <div class="login-icono">
            <i class="bi bi-person-lock"></i>
          </div>

          <h2>Iniciar sesión</h2>
          <p>Ingresa tus credenciales autorizadas.</p>
        </div>

        <form @submit.prevent="iniciarSesion">
          <div class="login-campo">
            <label for="correo">Correo electrónico</label>

            <div class="login-input">
              <i class="bi bi-envelope"></i>
              <input
                id="correo"
                v-model.trim="correo"
                type="email"
                placeholder="nombre@correo.com"
                autocomplete="username"
                required
                :disabled="cargando"
              />
            </div>
          </div>

          <div class="login-campo">
            <label for="password">Contraseña</label>

            <div class="login-input">
              <i class="bi bi-lock"></i>
              <input
                id="password"
                v-model="password"
                :type="mostrarPassword ? 'text' : 'password'"
                placeholder="Ingresa tu contraseña"
                autocomplete="current-password"
                required
                :disabled="cargando"
              />

              <button
                type="button"
                class="login-mostrar"
                :aria-label="
                  mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'
                "
                @click="mostrarPassword = !mostrarPassword"
              >
                <i
                  :class="mostrarPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                ></i>
              </button>
            </div>
          </div>

          <div
            v-if="mensaje"
            class="login-alerta"
            :class="tipoMensaje"
            role="alert"
            aria-live="polite"
          >
            <i
              :class="
                tipoMensaje === 'exito'
                  ? 'bi bi-check-circle'
                  : 'bi bi-exclamation-circle'
              "
            ></i>
            <span>{{ mensaje }}</span>
          </div>

          <button class="login-boton" type="submit" :disabled="cargando">
            <span
              v-if="cargando"
              class="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>

            <i v-else class="bi bi-box-arrow-in-right"></i>

            {{ cargando ? "Verificando..." : "Ingresar al sistema" }}
          </button>
        </form>

        <p class="login-seguridad">
          <i class="bi bi-shield-check"></i>
          Acceso exclusivo para personal autorizado.
        </p>
      </section>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import "../styles/login.css";
import { authService } from "../services/authService";

const router = useRouter();

const correo = ref("");
const password = ref("");
const mostrarPassword = ref(false);
const cargando = ref(false);
const mensaje = ref("");
const tipoMensaje = ref("error");

const iniciarSesion = async () => {
  mensaje.value = "";
  cargando.value = true;

  try {
    const respuesta = await authService.iniciarSesion(
      correo.value,
      password.value,
    );

    mensaje.value = respuesta.mensaje || "Sesión iniciada correctamente.";
    tipoMensaje.value = "exito";

    // Avisar a los componentes que la sesión cambió.
    window.dispatchEvent(new Event("sesion-actualizada"));

    await router.push("/");
  } catch (error) {
    mensaje.value = error.message || "No se pudo iniciar sesión.";
    tipoMensaje.value = "error";
  } finally {
    cargando.value = false;
  }
};
</script>
