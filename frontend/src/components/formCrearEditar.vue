<script setup>
import { reactive, watch } from "vue";
import { archivoUrl } from "../services/api";

const props = defineProps({
  visible: { type: Boolean, default: false },
  modo: { type: String, default: "crear" },
  titulo: { type: String, default: "Registro" },
  campos: { type: Array, default: () => [] },
  datos: { type: Object, default: () => ({}) },
  guardando: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

const emit = defineEmits(["guardar", "cerrar"]);
const formulario = reactive({});

watch(
  () => [props.visible, props.datos],
  () => {
    if (!props.visible) return;

    Object.keys(formulario).forEach((clave) => {
      delete formulario[clave];
    });

    props.campos.forEach((campo) => {
      formulario[campo.nombre] =
        campo.tipo === "file"
          ? null
          : (props.datos[campo.nombre] ?? campo.valorInicial ?? "");
    });
  },
  { immediate: true, deep: true },
);

function seleccionarArchivo(evento, nombre) {
  formulario[nombre] = evento.target.files?.[0] || null;
}

function enviarFormulario() {
  emit("guardar", { ...formulario });
}
</script>

<template>
  <div
    v-if="visible"
    class="modal-general-fondo"
    @click.self="!guardando && emit('cerrar')"
  >
    <section
      class="modal-general"
      role="dialog"
      aria-modal="true"
      :aria-label="`${modo === 'editar' ? 'Editar' : 'Crear'} ${titulo}`"
    >
      <!-- ENCABEZADO -->
      <header class="modal-general-encabezado">
        <div class="encabezado-info">
          <span class="modal-general-etiqueta">
            {{ modo === "editar" ? "ACTUALIZACIÓN" : "NUEVO REGISTRO" }}
          </span>

          <h2>{{ modo === "editar" ? "Editar" : "Agregar" }} {{ titulo }}</h2>

          <p>
            Completa los campos para
            {{
              modo === "editar"
                ? "actualizar la información."
                : "registrar la información."
            }}
          </p>
        </div>

        <button
          class="modal-general-cerrar"
          type="button"
          @click="emit('cerrar')"
          :disabled="guardando"
          aria-label="Cerrar"
        >
          &times;
        </button>
      </header>

      <!-- FORMULARIO -->
      <form class="formulario-general" @submit.prevent="enviarFormulario">
        <p v-if="error" class="formulario-error" role="alert">
          <i class="bi bi-exclamation-circle-fill"></i>
          {{ error }}
        </p>

        <div
          v-for="(campo, indice) in campos"
          :key="campo.nombre"
          class="campo-general"
        >
          <!-- SECCIONES -->
          <div
            v-if="
              campo.seccion &&
              (indice === 0 || campos[indice - 1]?.seccion !== campo.seccion)
            "
            class="seccion-formulario"
          >
            <span class="seccion-formulario-icono">
              <i :class="campo.iconoSeccion || 'bi bi-pencil-square'"></i>
            </span>

            <div>
              <strong>{{ campo.seccion }}</strong>
              <small>Información correspondiente a esta sección</small>
            </div>
          </div>

          <!-- ETIQUETA -->
          <label :for="campo.nombre" class="etiqueta-campo">
            {{ campo.etiqueta }}

            <span
              v-if="campo.requerido !== false && campo.tipo !== 'file'"
              class="campo-obligatorio"
            >
              *
            </span>

            <span v-else-if="campo.tipo === 'file'" class="campo-opcional">
              Opcional
            </span>
          </label>

          <!-- TEXTAREA -->
          <textarea
            v-if="campo.tipo === 'textarea'"
            :id="campo.nombre"
            v-model="formulario[campo.nombre]"
            :placeholder="campo.placeholder || 'Escribe aquí...'"
            :required="campo.requerido !== false"
            :rows="campo.filas || 3"
          ></textarea>

          <!-- SELECT -->
          <select
            v-else-if="campo.tipo === 'select'"
            :id="campo.nombre"
            v-model="formulario[campo.nombre]"
            :required="campo.requerido !== false"
          >
            <option value="" disabled>Selecciona una opción</option>

            <option
              v-for="opcion in campo.opciones || []"
              :key="opcion.valor"
              :value="opcion.valor"
            >
              {{ opcion.texto }}
            </option>
          </select>

          <!-- ARCHIVOS -->
          <div v-else-if="campo.tipo === 'file'" class="archivo-campo">
            <input
              :id="campo.nombre"
              class="archivo-input-real"
              type="file"
              :accept="campo.accept || '*/*'"
              :required="modo === 'crear' && campo.requerido === true"
              @change="seleccionarArchivo($event, campo.nombre)"
            />

            <label class="archivo-selector" :for="campo.nombre">
              <span class="archivo-icono">
                <i :class="campo.icono || 'bi bi-cloud-arrow-up'"></i>
              </span>

              <span class="archivo-selector-texto">
                <strong>
                  {{
                    formulario[campo.nombre]
                      ? "Archivo seleccionado"
                      : "Seleccionar archivo"
                  }}
                </strong>

                <small>
                  {{
                    formulario[campo.nombre]?.name ||
                    campo.ayuda ||
                    "Selecciona un archivo desde tu dispositivo."
                  }}
                </small>
              </span>

              <span class="archivo-examinar">Examinar</span>
            </label>

            <!-- ARCHIVO NUEVO -->
            <div
              v-if="formulario[campo.nombre]"
              class="archivo-estado archivo-nuevo"
            >
              <i class="bi bi-check-circle-fill"></i>

              <span>
                Nuevo archivo:
                <strong>{{ formulario[campo.nombre].name }}</strong>
              </span>
            </div>

            <!-- ARCHIVO GUARDADO -->
            <div
              v-else-if="datos[campo.nombre]"
              class="archivo-estado archivo-guardado"
            >
              <i class="bi bi-file-earmark-check"></i>

              <span>Archivo guardado actualmente.</span>

              <a
                :href="archivoUrl(datos[campo.nombre])"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver archivo
                <i class="bi bi-box-arrow-up-right"></i>
              </a>
            </div>

            <!-- SIN ARCHIVO -->
            <div v-else class="archivo-estado archivo-vacio">
              <i class="bi bi-info-circle"></i>
              <span>No hay ningún archivo seleccionado.</span>
            </div>
          </div>

          <!-- INPUT NORMAL -->
          <input
            v-else
            :id="campo.nombre"
            v-model="formulario[campo.nombre]"
            :type="campo.tipo || 'text'"
            :placeholder="campo.placeholder || ''"
            :required="campo.requerido !== false"
            :min="campo.min"
            :max="campo.max"
            :minlength="campo.minlength"
            :maxlength="campo.maxlength"
            :autocomplete="campo.autocomplete"
          />

          <small v-if="campo.nota && campo.tipo !== 'file'" class="campo-nota">
            {{ campo.nota }}
          </small>
        </div>

        <!-- BOTONES -->
        <footer class="modal-general-acciones">
          <button
            type="button"
            class="btn-form-cancelar"
            @click="emit('cerrar')"
            :disabled="guardando"
          >
            Cancelar
          </button>

          <button type="submit" class="btn-form-guardar" :disabled="guardando">
            <i
              :class="
                guardando ? 'bi bi-hourglass-split' : 'bi bi-check2-circle'
              "
            ></i>

            {{
              guardando
                ? "Guardando..."
                : modo === "editar"
                  ? "Guardar cambios"
                  : "Crear registro"
            }}
          </button>
        </footer>
      </form>
    </section>
  </div>
</template>

<style scoped>
.modal-general-fondo {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: rgba(15, 23, 42, 0.68);
  backdrop-filter: blur(5px);
}

.modal-general {
  width: 100%;
  max-width: 680px;
  max-height: 92vh;
  overflow-y: auto;
  background: var(--fondo);
  border: 1px solid var(--borde);
  border-radius: var(--radius);
  box-shadow: var(--sombra-hover);
}

.modal-general-encabezado {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 25px 30px;
  background: var(--navbar-bg);
  border-bottom: 1px solid var(--borde);
  backdrop-filter: blur(10px);
}

.modal-general-etiqueta {
  display: inline-block;
  margin-bottom: 7px;
  color: var(--accion);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 1.3px;
}

.modal-general-encabezado h2 {
  margin: 0;
  color: var(--principal);
  font-size: 1.55rem;
  font-weight: 800;
  text-transform: capitalize;
}

.modal-general-encabezado p {
  margin: 6px 0 0;
  color: var(--texto-secundario);
  font-size: 0.9rem;
  line-height: 1.5;
}

.modal-general-cerrar {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border: 1px solid var(--borde);
  border-radius: 50%;
  background: var(--fondo);
  color: var(--principal);
  font-size: 25px;
  line-height: 1;
  cursor: pointer;
}

.formulario-general {
  padding: 24px 30px 28px;
}

.formulario-error {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin: 0 0 20px;
  padding: 12px 14px;
  border: 1px solid #fecaca;
  border-left: 4px solid #dc2626;
  border-radius: 8px;
  background: #fef2f2;
  color: #991b1b;
  line-height: 1.5;
}

.formulario-error i {
  margin-top: 2px;
}

.campo-general {
  margin-bottom: 20px;
}

.etiqueta-campo {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 8px;
  color: var(--principal);
  font-size: 0.92rem;
  font-weight: 700;
}

.campo-obligatorio {
  color: var(--accion);
}

.campo-opcional {
  padding: 3px 9px;
  border-radius: 20px;
  background: var(--fondo-alt);
  color: var(--texto-secundario);
  font-size: 0.7rem;
  font-weight: 600;
}

.campo-general input:not([type="file"]),
.campo-general textarea,
.campo-general select {
  display: block;
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--borde);
  border-radius: 10px;
  background: white;
  color: var(--texto);
  font: inherit;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.campo-general input:focus,
.campo-general textarea:focus,
.campo-general select:focus {
  border-color: var(--principal-light);
  box-shadow: 0 0 0 3px rgba(51, 65, 85, 0.12);
}

.campo-general textarea {
  min-height: 105px;
  resize: vertical;
  line-height: 1.55;
}

.campo-general input::placeholder,
.campo-general textarea::placeholder {
  color: #94a3b8;
}

.campo-nota {
  display: block;
  margin-top: 6px;
  color: var(--texto-secundario);
  font-size: 0.8rem;
}

.seccion-formulario {
  display: flex;
  align-items: center;
  gap: 11px;
  margin: 8px 0 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--borde);
  color: var(--principal);
}

.seccion-formulario-icono {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--fondo-alt);
  color: var(--principal-light);
  font-size: 1.1rem;
}

.seccion-formulario strong,
.seccion-formulario small {
  display: block;
}

.seccion-formulario strong {
  font-size: 0.96rem;
}

.seccion-formulario small {
  margin-top: 3px;
  color: var(--texto-secundario);
  font-size: 0.75rem;
  font-weight: 400;
}

/* ARCHIVOS */
.archivo-input-real {
  position: absolute;
  width: 1px;
  height: 1px;
  opacity: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.archivo-selector {
  display: flex;
  align-items: center;
  gap: 13px;
  width: 100%;
  padding: 14px;
  border: 1.5px dashed var(--borde);
  border-radius: 12px;
  background: rgba(243, 235, 212, 0.35);
  cursor: pointer;
  transition: 0.2s;
}

.archivo-selector:hover {
  border-color: var(--principal-light);
  background: var(--fondo-alt);
}

.archivo-icono {
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  border-radius: 10px;
  background: white;
  color: var(--principal);
  font-size: 1.35rem;
}

.archivo-selector-texto {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 3px;
}

.archivo-selector-texto strong {
  color: var(--principal);
  font-size: 0.88rem;
}

.archivo-selector-texto small {
  overflow-wrap: anywhere;
  color: var(--texto-secundario);
  font-size: 0.77rem;
  line-height: 1.4;
}

.archivo-examinar {
  padding: 8px 13px;
  border-radius: 8px;
  background: var(--principal);
  color: var(--texto-light);
  font-size: 0.78rem;
  font-weight: 700;
}

.archivo-estado {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 10px;
  color: var(--texto-secundario);
  font-size: 0.78rem;
}

.archivo-nuevo > i {
  color: #15803d;
}

.archivo-guardado > i {
  color: var(--principal-light);
}

.archivo-vacio > i {
  color: var(--texto-secundario);
}

.archivo-estado a {
  margin-left: auto;
  color: var(--principal);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* ACCIONES */
.modal-general-acciones {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 27px;
  padding-top: 20px;
  border-top: 1px solid var(--borde);
}

.modal-general-acciones button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px 19px;
  border: 0;
  border-radius: 9px;
  font: inherit;
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;
}

.btn-form-cancelar {
  background: var(--fondo-alt);
  color: var(--principal);
}

.btn-form-guardar {
  background: var(--gradiente-principal);
  color: var(--texto-light);
  box-shadow: var(--sombra);
}

.btn-form-guardar:hover {
  transform: translateY(-2px);
  box-shadow: var(--sombra-hover);
}

.modal-general-acciones button:disabled,
.modal-general-cerrar:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (max-width: 600px) {
  .modal-general-fondo {
    padding: 10px;
  }

  .modal-general {
    max-height: 95vh;
  }

  .modal-general-encabezado {
    padding: 20px;
  }

  .formulario-general {
    padding: 20px;
  }

  .modal-general-encabezado h2 {
    font-size: 1.3rem;
  }

  .archivo-examinar {
    padding: 7px 9px;
  }

  .modal-general-acciones button {
    flex: 1;
    padding: 11px 10px;
  }
}
</style>
