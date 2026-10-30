import { solicitar } from "./api";

export const usuariosAPI = {
  actualizarMiCuenta(datos) {
    return solicitar("/mi-cuenta", {
      method: "PUT",
      body: JSON.stringify(datos),
    });
  },

  obtenerTodos() {
    return solicitar("/usuarios");
  },

  crear(usuario) {
    return solicitar("/usuarios", {
      method: "POST",
      body: JSON.stringify(usuario),
    });
  },

  actualizar(id, usuario) {
    return solicitar(`/usuarios/${id}`, {
      method: "PUT",
      body: JSON.stringify(usuario),
    });
  },

  eliminar(id) {
    return solicitar(`/usuarios/${id}`, {
      method: "DELETE",
    });
  },
};
