<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { authService } from "../services/authService";
import { usuariosAPI } from "../services/usuariosService";
import formCrearEditar from "../components/formCrearEditar.vue";
import modalEliminar from "../components/modalEliminar.vue";
import "../styles/usuarios.css";

const router = useRouter();
const usuarios = ref([]);
const cargando = ref(true);
const guardando = ref(false);
const eliminando = ref(false);
const mostrarFormulario = ref(false);
const mostrarEliminar = ref(false);
const usuarioSeleccionado = ref(null);
const error = ref("");
const mensaje = ref("");

const camposUsuario = computed(() => [
  {
    nombre: "nombre",
    etiqueta: "Nombre",
    tipo: "text",
    requerido: true,
    seccion: "Datos de la cuenta",
    iconoSeccion: "bi bi-person",
  },
  {
    nombre: "apellido",
    etiqueta: "Apellido",
    tipo: "text",
    requerido: true,
  },
  {
    nombre: "correo",
    etiqueta: "Correo electrónico",
    tipo: "email",
    requerido: true,
    placeholder: "nombre@ejemplo.com",
  },
  {
    nombre: "rol",
    etiqueta: "Rol",
    tipo: "select",
    requerido: true,
    opciones: [
      { valor: "administrador", texto: "Administrador" },
      { valor: "personal", texto: "Personal" },
    ],
  },
  {
    nombre: "activo",
    etiqueta: "Estado de la cuenta",
    tipo: "select",
    requerido: true,
    valorInicial: "1",
    opciones: [
      { valor: "1", texto: "Activa" },
      { valor: "0", texto: "Inactiva" },
    ],
  },
  {
    nombre: "password",
    etiqueta: usuarioSeleccionado.value
      ? "Nueva contraseña (opcional)"
      : "Contraseña",
    tipo: "password",
    autocomplete: "new-password",
    minlength: 4,
    requerido: !usuarioSeleccionado.value,
    placeholder: usuarioSeleccionado.value
      ? "Deja este campo vacío para conservarla"
      : "Mínimo 4 caracteres",
    nota: usuarioSeleccionado.value
      ? "Solo se cambiará si escribes una nueva contraseña (mínimo 4 caracteres)."
      : "Debe tener al menos 4 caracteres.",
  },
]);

const esAdministrador = computed(
  () => authService.usuarioActual.value?.rol === "administrador",
);

function mostrarFecha(fecha) {
  if (!fecha) return "—";
  const valor = new Date(String(fecha).replace(" ", "T"));
  return Number.isNaN(valor.getTime())
    ? "—"
    : new Intl.DateTimeFormat("es-BO", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(valor);
}

async function cargarUsuarios() {
  cargando.value = true;
  error.value = "";

  try {
    const respuesta = await usuariosAPI.obtenerTodos();
    usuarios.value = respuesta.usuarios;
  } catch (e) {
    error.value = e.message || "No se pudieron cargar los usuarios.";
  } finally {
    cargando.value = false;
  }
}

function abrirCrear() {
  error.value = "";
  mensaje.value = "";
  usuarioSeleccionado.value = null;
  mostrarFormulario.value = true;
}

function abrirEditar(usuario) {
  error.value = "";
  mensaje.value = "";
  usuarioSeleccionado.value = { ...usuario };
  mostrarFormulario.value = true;
}

function cerrarFormulario() {
  mostrarFormulario.value = false;
  usuarioSeleccionado.value = null;
}

async function guardarUsuario(datos) {
  guardando.value = true;
  error.value = "";
  mensaje.value = "";

  try {
    const usuarioId = usuarioSeleccionado.value?.id;
    const datosUsuario = { ...datos, activo: Number(datos.activo) };

    if (usuarioId) {
      await usuariosAPI.actualizar(usuarioId, datosUsuario);
    } else {
      await usuariosAPI.crear(datosUsuario);
    }

    cerrarFormulario();
    await cargarUsuarios();

    if (
      usuarioId &&
      Number(authService.usuarioActual.value?.id) === Number(usuarioId)
    ) {
      await authService.comprobarSesion();
      if (!esAdministrador.value) {
        await router.replace({ name: "inicio" });
      }
    }

    mensaje.value = usuarioId
      ? "Usuario actualizado correctamente."
      : "Usuario creado correctamente.";
  } catch (e) {
    error.value = e.message || "No se pudo guardar el usuario.";
  } finally {
    guardando.value = false;
  }
}

function abrirEliminar(usuario) {
  error.value = "";
  mensaje.value = "";
  usuarioSeleccionado.value = usuario;
  mostrarEliminar.value = true;
}

function cerrarEliminar() {
  mostrarEliminar.value = false;
  usuarioSeleccionado.value = null;
}

async function eliminarUsuario() {
  if (!usuarioSeleccionado.value) return;

  eliminando.value = true;
  error.value = "";
  mensaje.value = "";

  try {
    await usuariosAPI.eliminar(usuarioSeleccionado.value.id);
    cerrarEliminar();
    await cargarUsuarios();
    mensaje.value = "Usuario eliminado correctamente.";
  } catch (e) {
    error.value = e.message || "No se pudo eliminar el usuario.";
  } finally {
    eliminando.value = false;
  }
}

onMounted(cargarUsuarios);
</script>

<template>
  <main class="pagina-usuarios">
    <section class="encabezado-usuarios">
      <div>
        <h1>Administración de usuarios</h1>
        <p>
          Gestiona las cuentas de los usuarios autorizados del CEA Boliviano
          Alemán.
        </p>
      </div>
    </section>

    <section class="contenido-usuarios">
      <div class="barra-usuarios">
        <h2>Usuarios registrados</h2>

        <button type="button" class="btn-crear-usuario" @click="abrirCrear">
          <i class="bi bi-person-plus"></i>
          Registrar usuario
        </button>
      </div>

      <p
        v-if="error && !mostrarFormulario && !mostrarEliminar"
        class="mensaje-usuarios error-usuarios"
        role="alert"
      >
        {{ error }}
      </p>
      <p v-if="mensaje" class="mensaje-usuarios exito-usuarios" role="status">
        {{ mensaje }}
      </p>

      <p v-if="cargando" class="estado-usuarios">Cargando usuarios...</p>
      <p v-else-if="usuarios.length === 0" class="estado-usuarios">
        No hay usuarios registrados.
      </p>

      <div v-else class="tabla-usuarios-contenedor">
        <table class="tabla-usuarios">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Creado</th>
              <th>Última actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="usuario in usuarios" :key="usuario.id">
              <td data-label="Nombre">{{ usuario.nombre }}</td>
              <td data-label="Apellido">{{ usuario.apellido }}</td>
              <td data-label="Correo">{{ usuario.correo }}</td>
              <td data-label="Rol">
                <span class="etiqueta-rol">
                  {{
                    usuario.rol === "administrador"
                      ? "Administrador"
                      : "Personal"
                  }}
                </span>
              </td>
              <td data-label="Estado">
                <span
                  class="etiqueta-estado"
                  :class="
                    Number(usuario.activo) === 1
                      ? 'estado-activo'
                      : 'estado-inactivo'
                  "
                >
                  {{ Number(usuario.activo) === 1 ? "Activa" : "Inactiva" }}
                </span>
              </td>
              <td data-label="Creado">{{ mostrarFecha(usuario.creado_en) }}</td>
              <td data-label="Última actualización">
                {{ mostrarFecha(usuario.actualizado_en) }}
              </td>
              <td data-label="Acciones" class="acciones-usuario">
                <button
                  type="button"
                  class="btn-accion-usuario btn-editar-usuario"
                  @click="abrirEditar(usuario)"
                  :aria-label="`Editar a ${usuario.nombre}`"
                >
                  <i class="bi bi-pencil-square"></i>
                  Editar
                </button>
                <button
                  v-if="
                    Number(usuario.id) !==
                    Number(authService.usuarioActual.value?.id)
                  "
                  type="button"
                  class="btn-accion-usuario btn-eliminar-usuario"
                  @click="abrirEliminar(usuario)"
                  :aria-label="`Eliminar a ${usuario.nombre}`"
                >
                  <i class="bi bi-trash"></i>
                  Eliminar
                </button>
                <span v-else class="cuenta-propia">Tu cuenta</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <formCrearEditar
      :visible="mostrarFormulario"
      :modo="usuarioSeleccionado ? 'editar' : 'crear'"
      titulo="usuario"
      :campos="camposUsuario"
      :datos="usuarioSeleccionado || {}"
      :guardando="guardando"
      :error="error"
      @guardar="guardarUsuario"
      @cerrar="cerrarFormulario"
    />

    <modalEliminar
      :visible="mostrarEliminar"
      titulo="Eliminar usuario"
      mensaje="Esta acción eliminará definitivamente la cuenta."
      :nombre="usuarioSeleccionado?.nombre || ''"
      :eliminando="eliminando"
      :error="mostrarEliminar ? error : ''"
      @confirmar="eliminarUsuario"
      @cancelar="cerrarEliminar"
    />
  </main>
</template>
