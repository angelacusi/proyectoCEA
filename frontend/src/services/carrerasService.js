import { solicitar } from "./api";

export const carrerasService = {
  obtenerTodas() {
    return solicitar("/carreras");
  },

  crear(carrera) {
    return solicitar("/carreras", {
      method: "POST",
      body: carrera,
    });
  },

  actualizar(id, carrera) {
    return solicitar(`/carreras/${id}`, {
      method: "POST",
      body: carrera,
    });
  },

  eliminar(id) {
    return solicitar(`/carreras/${id}`, {
      method: "DELETE",
    });
  },
};
