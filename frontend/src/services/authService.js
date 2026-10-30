import { ref } from "vue";
import { solicitar, actualizarTokenCSRF } from "./api";

const usuarioActual = ref(null);
const comprobandoSesion = ref(true);

export const authService = {
  usuarioActual,
  comprobandoSesion,

  get esAdministrador() {
    return usuarioActual.value?.rol === "administrador";
  },

  async iniciarSesion(correo, password) {
    const respuesta = await solicitar("/login", {
      method: "POST",
      body: JSON.stringify({ correo, password }),
    });

    usuarioActual.value = respuesta.usuario;
    return respuesta;
  },

  actualizarUsuario(usuario) {
    usuarioActual.value = usuario;
  },

  async comprobarSesion() {
    comprobandoSesion.value = true;

    try {
      const respuesta = await solicitar("/sesion");
      usuarioActual.value = respuesta.usuario;
      return respuesta.usuario;
    } catch {
      usuarioActual.value = null;
      actualizarTokenCSRF(null);
      return null;
    } finally {
      comprobandoSesion.value = false;
    }
  },

  async cerrarSesion() {
    try {
      await solicitar("/logout", { method: "POST" });
    } finally {
      usuarioActual.value = null;
      actualizarTokenCSRF(null);
    }
  },
};
