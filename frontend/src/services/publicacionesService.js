import { solicitar } from "./api";

export const publicacionesService = {
  obtenerTodas() {
    return solicitar("/publicaciones");
  },

  crear(publicacion) {
    return solicitar("/publicaciones", {
      method: "POST",
      body: publicacion,
    });
  },

  actualizar(id, publicacion) {
    return solicitar(`/publicaciones/${id}`, {
      method: "POST",
      body: publicacion,
    });
  },

  eliminar(id) {
    return solicitar(`/publicaciones/${id}`, {
      method: "DELETE",
    });
  },
};
