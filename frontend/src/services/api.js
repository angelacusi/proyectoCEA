const API_URL = import.meta.env.PROD
  ? "https://ceabolivianoaleman.edu.bo/backend/api"
  : "http://localhost:8000/api";

let tokenCSRF = null;

export function actualizarTokenCSRF(token) {
  tokenCSRF = token;
}

function notificarErrorConexion() {
  window.dispatchEvent(
    new CustomEvent("api-error", {
      detail: {
        mensaje:
          "No se pudo conectar con el servidor. Comprueba que el backend esté encendido e inténtalo nuevamente.",
      },
    }),
  );
}

async function fetchSeguro(url, opciones = {}) {
  try {
    return await fetch(url, opciones);
  } catch (error) {
    notificarErrorConexion();
    throw new Error("No se pudo conectar con el servidor.");
  }
}

async function obtenerTokenCSRF() {
  if (tokenCSRF) return tokenCSRF;

  const respuesta = await fetchSeguro(`${API_URL}/csrf`, {
    credentials: "include",
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "No se pudo obtener el token CSRF.");
  }

  tokenCSRF = datos.csrf_token;
  return tokenCSRF;
}

export async function solicitar(ruta, opciones = {}) {
  const metodo = (opciones.method || "GET").toUpperCase();

  const esFormData = opciones.body instanceof FormData;

  const headers = {
    ...opciones.headers,
  };

  // Solo establecer JSON cuando no se envían archivos.
  if (!esFormData && opciones.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (["POST", "PUT", "DELETE"].includes(metodo)) {
    headers["X-CSRF-Token"] = await obtenerTokenCSRF();
  }

  const respuesta = await fetchSeguro(`${API_URL}${ruta}`, {
    ...opciones,
    method: metodo,
    credentials: "include",
    headers,
  });

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.mensaje || "Ocurrió un error.");
  }

  if (datos.csrf_token) {
    actualizarTokenCSRF(datos.csrf_token);
  }

  return datos;
}

// Convierte las rutas
// En local apunta a http://localhost:8000 y en producción a /backend.
export function archivoUrl(ruta) {
  if (!ruta) return "";
  if (/^https?:\/\//i.test(ruta)) return ruta;

  const base = API_URL.replace(/\/api\/?$/, "");
  return `${base}/${String(ruta).replace(/^\/+/, "")}`;
}
