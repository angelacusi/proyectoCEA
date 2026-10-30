<script setup>
import { computed, reactive, ref, watch } from "vue";
import { authService } from "../services/authService";
import { usuariosAPI } from "../services/usuariosService";
import "../styles/miCuenta.css";

const usuario = computed(() => authService.usuarioActual.value);
const guardando = ref(false);
const error = ref("");
const mensaje = ref("");
const formulario = reactive({
  nombre: "",
  apellido: "",
  correo: "",
  password_actual: "",
  password_nueva: "",
  confirmar_password: "",
});

const requiereVerificacion = computed(
  () =>
    formulario.correo !== usuario.value?.correo ||
    formulario.password_nueva !== "",
);

watch(
  usuario,
  (actual) => {
    if (!actual) return;
    formulario.nombre = actual.nombre || "";
    formulario.apellido = actual.apellido || "";
    formulario.correo = actual.correo || "";
  },
  { immediate: true },
);

async function guardarCuenta() {
  error.value = "";
  mensaje.value = "";

  if (
    formulario.password_nueva &&
    formulario.password_nueva !== formulario.confirmar_password
  ) {
    error.value = "La nueva contraseña y su confirmación no coinciden.";
    return;
  }

  if (requiereVerificacion.value && !formulario.password_actual) {
    error.value =
      "Ingresa tu contraseña actual para cambiar el correo o la contraseña.";
    return;
  }

  guardando.value = true;

  try {
    const respuesta = await usuariosAPI.actualizarMiCuenta({
      nombre: formulario.nombre,
      apellido: formulario.apellido,
      correo: formulario.correo,
      password_actual: formulario.password_actual,
      password_nueva: formulario.password_nueva,
    });

    authService.actualizarUsuario(respuesta.usuario);
    formulario.password_actual = "";
    formulario.password_nueva = "";
    formulario.confirmar_password = "";
    mensaje.value = respuesta.mensaje;
  } catch (e) {
    error.value = e.message || "No se pudo actualizar tu cuenta.";
  } finally {
    guardando.value = false;
  }
}
</script>

<template>
  <main class="pagina-mi-cuenta">
    <section class="encabezado-cuenta">
      <h1>Mi cuenta</h1>
      <p>Actualiza tus datos y administra la contraseña de tu cuenta.</p>
    </section>

    <section v-if="usuario" class="tarjeta-mi-cuenta">
      <div class="icono-cuenta">
        <i class="bi bi-person-circle"></i>
      </div>

      <div class="encabezado-tarjeta-cuenta">
        <div>
          <span class="etiqueta-cuenta">PERFIL PERSONAL</span>
          <h2>Información personal</h2>
          <p>Administra tus datos de acceso y perfil institucional.</p>
        </div>
        <span class="rol-cuenta">
          <i class="bi bi-shield-check"></i>
          {{ usuario.rol }}
        </span>
      </div>

      <form class="formulario-cuenta" @submit.prevent="guardarCuenta">
        <div class="campo-cuenta">
          <label for="cuenta-nombre">Nombre</label>
          <input
            id="cuenta-nombre"
            v-model.trim="formulario.nombre"
            type="text"
            autocomplete="given-name"
            required
            :disabled="guardando"
          />
        </div>

        <div class="campo-cuenta">
          <label for="cuenta-apellido">Apellido</label>
          <input
            id="cuenta-apellido"
            v-model.trim="formulario.apellido"
            type="text"
            autocomplete="family-name"
            required
            :disabled="guardando"
          />
        </div>

        <div class="campo-cuenta">
          <label for="cuenta-correo">Correo electrónico (para iniciar sesión)</label>
          <input
            id="cuenta-correo"
            v-model.trim="formulario.correo"
            type="email"
            autocomplete="email"
            required
            :disabled="guardando"
          />
        </div>

        <div class="campo-cuenta">
          <label for="cuenta-rol">Rol de usuario</label>
          <input
            id="cuenta-rol"
            :value="usuario.rol"
            type="text"
            disabled
          />
        </div>

        <div class="seccion-password">
          <h3>Cambiar contraseña</h3>
          <p>Déjala vacía si no deseas cambiarla.</p>
        </div>

        <div class="campo-cuenta campo-password">
          <label for="cuenta-password-nueva">Nueva contraseña</label>
          <input
            id="cuenta-password-nueva"
            v-model="formulario.password_nueva"
            type="password"
            autocomplete="new-password"
            minlength="4"
            placeholder="Mínimo 4 caracteres"
            :disabled="guardando"
          />
        </div>

        <div class="campo-cuenta campo-password">
          <label for="cuenta-password-confirmacion">
            Confirmar nueva contraseña
          </label>
          <input
            id="cuenta-password-confirmacion"
            v-model="formulario.confirmar_password"
            type="password"
            autocomplete="new-password"
            minlength="4"
            :required="formulario.password_nueva !== ''"
            :disabled="guardando"
          />
        </div>

        <div
          v-if="requiereVerificacion"
          class="campo-cuenta campo-password"
        >
          <label for="cuenta-password-actual">
            Contraseña actual (requerida para cambiar correo o contraseña)
          </label>
          <input
            id="cuenta-password-actual"
            v-model="formulario.password_actual"
            type="password"
            autocomplete="current-password"
            required
            :disabled="guardando"
          />
        </div>

        <p v-if="error" class="mensaje-cuenta error-cuenta" role="alert">
          {{ error }}
        </p>
        <p v-if="mensaje" class="mensaje-cuenta exito-cuenta" role="status">
          {{ mensaje }}
          Si cambiaste el correo, úsalo la próxima vez que inicies sesión.
          Tu sesión actual seguirá activa.
        </p>

        <button class="btn-guardar-cuenta" type="submit" :disabled="guardando">
          <i :class="guardando ? 'bi bi-hourglass-split' : 'bi bi-check2-circle'"></i>
          {{ guardando ? "Guardando..." : "Guardar cambios" }}
        </button>
      </form>

      <p class="nota-cuenta">
        Para cambiar tu correo o contraseña debes confirmar tu contraseña actual.
        Los cambios se aplican también a tu próxima sesión.
      </p>
    </section>
  </main>
</template>
