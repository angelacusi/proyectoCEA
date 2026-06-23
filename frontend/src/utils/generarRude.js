import { jsPDF } from "jspdf";

async function loadImage(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  return await new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.readAsDataURL(blob);
  });
}

export async function generarRude(form) {
  const imagen = await loadImage("/rudeimage.jpg");

  const pdf = new jsPDF("p", "mm", "legal");

  pdf.addImage(imagen, "JPEG", 0, 0, 216, 356);

  // FECHA
  const fechaActual = new Date();

  const diaA = String(fechaActual.getDate()).padStart(2, "0");

  const mesA = String(fechaActual.getMonth() + 1).padStart(2, "0");

  const anioA = String(fechaActual.getFullYear());

  pdf.setFont("courier", "bold");
  pdf.setFontSize(6);
  pdf.setTextColor(0, 0, 150);

  // poner datos
  pdf.text("Boliviano Áleman", 23.4, 58.76);
  pdf.setCharSpace(2.05);
  pdf.text(form.apPaterno.toUpperCase(), 42.05, 69);
  pdf.text(form.apMaterno.toUpperCase(), 42.05, 72.97);
  pdf.text(form.nombres.toUpperCase(), 42.05, 76.92);
  pdf.text(form.ci, 45.39, 84.75);
  pdf.text(form.complemento, 84.97, 84.75);
  pdf.text(form.expedido, 101.55, 84.75);

  pdf.text(form.paisNacimiento.toUpperCase(), 32.06, 93.06);

  pdf.text(form.departamentoNacimiento.toUpperCase(), 75.24, 92.96);
  pdf.text(form.provinciaNacimiento.toUpperCase(), 32.06, 96.52);
  pdf.text(form.localidadNacimiento.toUpperCase(), 75.24, 96.52);

  pdf.setCharSpace(0, 5);

  const [anio, mes, dia] = form.fechaNacimiento.split("-");

  pdf.text(dia || "", 158.4, 69.38);
  pdf.text(mes || "", 168.84, 69.38);
  pdf.text(anio || "", 178.92, 69.38);

  pdf.text(form.oficialia, 114.84, 69.51);
  pdf.text(form.libro, 124.55, 69.51);
  pdf.text(form.partida, 134.64, 69.51);
  pdf.text(form.folio, 144.0, 69.51);

  if (form.sexo === "Femenino") {
    pdf.ellipse(128.2, 84.88, 1, 0.5, "f");
  } else if (form.sexo === "Masculino") {
    pdf.ellipse(128.18, 87.09, 1, 0.5, "f");
  }
  pdf.text(form.numeroHijos.toString(), 143.28, 87.02);

  if (form.estadoCivil === "Soltera/o") {
    pdf.text("x", 162.58, 89);
  } else if (form.estadoCivil === "Conviviente") {
    pdf.text("x", 169.42, 89);
  } else if (form.estadoCivil === "Casada/o") {
    pdf.text("x", 175.9, 89);
  } else if (form.estadoCivil === "Viuda/o") {
    pdf.text("x", 182.52, 89);
  } else if (form.estadoCivil === "Divorciada/o") {
    pdf.text("x", 189.0, 89);
  }

  // PASO 2
  if (form.tieneDiscapacidad) {
    pdf.text("X", 111.24, 105.24);
    if (form.tipoRegistro === "CODEPEDIS") {
      pdf.text("x", 72.0, 107.91);
    } else if (form.tipoRegistro === "IBC") {
      pdf.text("x", 84.96, 107.54);
    }
    pdf.setCharSpace(2.05);
    pdf.text(form.nDiscapacidad.toString(), 98.28, 108.03);
    switch (form.tipoDiscapacidad) {
      case "Visual":
        pdf.text("x", 68.76, 118.37);
        switch (form.gradoDiscapacidad) {
          case "Ceguera total":
            pdf.text("x", 71.28, 123.05);
            break;
          case "Baja visión":
            pdf.text("x", 71.28, 125.94);
            break;
        }
        break;

      case "Física-Motora":
        pdf.text("x", 131.76, 118.01);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 127.44, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 127.44, 123.27);
            break;

          case "Grave":
            pdf.text("x", 127.44, 125.79);
            break;

          case "Muy Grave":
            pdf.text("x", 127.44, 128.68);
            break;
        }
        break;

      case "Auditiva":
        pdf.text("x", 39.96, 118.28);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 41.4, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 41.4, 123.27);
            break;

          case "Grave":
            pdf.text("x", 41.4, 126.15);
            break;

          case "Muy Grave":
            pdf.text("x", 41.4, 128.68);
            break;
        }
        break;

      case "Intelectual":
        pdf.text("x", 101.16, 118.3);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 97.92, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 97.56, 123.27);
            break;

          case "Grave":
            pdf.text("x", 97.56, 125.79);
            break;

          case "Muy Grave":
            pdf.text("x", 97.56, 128.68);
            break;
        }
        break;

      case "Mental o Psíquica":
        pdf.text("x", 163.44, 118.37);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 156.96, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 156.96, 123.27);
            break;

          case "Grave":
            pdf.text("x", 156.96, 125.79);
            break;

          case "Muy Grave":
            pdf.text("x", 156.96, 128.68);
            break;
        }
        break;

      case "Múltiple":
        pdf.text("X", 185.4, 118.37);
        switch (form.gradoDiscapacidad) {
          case "Leve":
            pdf.text("x", 186.84, 120.75);
            break;

          case "Moderado":
            pdf.text("x", 186.84, 123.27);
            break;

          case "Grave":
            pdf.text("x", 186.84, 126.15);
            break;

          case "Muy Grave":
            pdf.text("x", 186.84, 128.68);
            break;
        }
        break;
    }

    if (form.origenDiscapacidad === "nacimiento") {
      pdf.text("x", 86.76, 132.64);
    } else if (form.origenDiscapacidad === "Adquirida") {
      pdf.text("x", 98.28, 132.64);
    }
  } else {
    pdf.text("X", 137.88, 105.24);
  }

  if (form.tieneTEA) {
    pdf.text("x", 51.12, 139.28);
    switch (form.tipoTEA) {
      case "1":
        pdf.text("x", 84.96, 141.7);
        break;
      case "2":
        pdf.text("x", 94.32, 141.7);
        break;
      case "3":
        pdf.text("x", 103.32, 141.7);
        break;
    }
  } else {
    pdf.text("x", 67.68, 138.92);
  }

  if (form.esExtranjero) {
    switch (form.documentoExtranjero) {
      case "Extranjero":
        pdf.text("X", 61.92, 153.24);
        break;
      case "DNI":
        pdf.text("X", 61.56, 158.29);
        break;
      case "Diplomatico":
        pdf.text("X", 101.52, 153.24);
        break;
      case "Pasaporte":
        pdf.text("X", 101.16, 158.29);
        break;
      case "Nacimiento":
        pdf.text("X", 137.52, 153.24);
        break;
      case "Declaracion":
        pdf.text("X", 137.52, 157.92);
        break;
    }
    pdf.text(form.codigoExtranjero, 147.6, 157.92);
  }

  // PASO 3
  pdf.setCharSpace(0);

  pdf.text(form.departamento, 41.5, 166.2);
  pdf.text(form.provincia, 41.5, 170.36);
  pdf.text(form.municipio, 41.5, 174.32);
  pdf.text(form.localidad, 41.5, 178.29);
  pdf.text(form.zona, 41.5, 181.89);
  pdf.text(form.calle, 41.4, 185.86);
  pdf.text(form.numeroVivienda, 41.5, 189.83);
  pdf.text(form.celular, 84.6, 185.86);
  pdf.text(form.telefono, 84.6, 189.83);

  if (form.esSoldado) {
    pdf.text("X", 152.64, 170.47);
    pdf.text(form.unidadMilitar.toUpperCase(), 140.76, 174.44);
  } else {
    pdf.text("X", 172.44, 170.47);
  }

  if (form.contextoEncierro) {
    pdf.text("X", 152.28, 178.4);
    pdf.text(form.centroPenitenciario.toUpperCase(), 153.72, 182.37);
  } else {
    pdf.text("X", 172.44, 178.4);
  }

  if (form.trabajadoraHogar) {
    pdf.text("X", 152.64, 185.98);
  } else {
    pdf.text("X", 172.44, 186.34);
  }

  pdf.text(form.otroContexto.toUpperCase(), 120.96, 189.94);

  // // PASO 4
  pdf.text(form.idiomaMaterno.toUpperCase(), 21.96, 211.93);

  pdf.text(form.idioma1.toUpperCase(), 21.6, 227.6);
  pdf.text(form.idioma2.toUpperCase(), 21.6, 230.9);
  pdf.text(form.idioma3.toUpperCase(), 21.96, 234.2);

  switch (form.puebloIndigena) {
    case "Ninguno":
      pdf.text("X", 61.56, 204.06);
      break;

    case "Chiman":
      pdf.text("X", 84.96, 204.56);
      break;

    case "Mojeño-Ignaciano":
      pdf.text("X", 104.76, 204.56);
      break;

    case "Tapiete":
      pdf.text("X", 121.32, 204.2);
      break;

    case "Afroboliviano":
      pdf.text("X", 121.32, 204.2);
      break;

    case "EseEjja":
      pdf.text("X", 121.32, 204.2);
      break;

    case "Mojeño-Trinitario":
      pdf.text("X", 104.76, 207.45);
      break;

    case "Toromona":
      pdf.text("X", 121.32, 207.81);
      break;

    case "Araona":
      pdf.text("X", 62.28, 211.05);
      break;

    case "Guaraní":
      pdf.text("X", 85.32, 211.05);
      break;

    case "Moré":
      pdf.text("X", 104.76, 211.05);
      break;

    case "Uru-Chipaya":
      pdf.text("X", 121.32, 211.05);
      break;

    case "Aymara":
      pdf.text("X", 61.92, 214.3);
      break;

    case "Guarasuawe":
      pdf.text("X", 85.32, 214.3);
      break;

    case "Mosetén":
      pdf.text("X", 104.76, 214.3);
      break;

    case "Weenhayek":
      pdf.text("X", 121.32, 214.3);
      break;

    case "Baure":
      pdf.text("X", 61.92, 217.54);
      break;

    case "Guarayo":
      pdf.text("X", 85.32, 217.54);
      break;

    case "Movima":
      pdf.text("X", 104.76, 217.54);
      break;

    case "Yaminawa":
      pdf.text("X", 121.32, 217.18);
      break;

    case "Bésiro":
      pdf.text("X", 62.28, 220.79);
      break;

    case "Itonoma":
      pdf.text("X", 84.96, 220.79);
      break;

    case "Tacawara":
      pdf.text("X", 104.76, 220.79);
      break;

    case "Yuki":
      pdf.text("X", 121.32, 220.79);
      break;

    case "Canichana":
      pdf.text("X", 61.92, 224.03);
      break;

    case "Leco":
      pdf.text("X", 84.96, 224.03);
      break;

    case "Puquina":
      pdf.text("X", 104.76, 224.03);
      break;

    case "Yuracaré":
      pdf.text("X", 121.32, 224.03);
      break;

    case "Cavineño":
      pdf.text("X", 61.92, 227.28);
      break;

    case "Machajuyai-Kallawaya":
      pdf.text("X", 85.32, 227.64);
      break;

    case "Quechua":
      pdf.text("X", 104.76, 227.28);
      break;

    case "Zamuco":
      pdf.text("X", 121.32, 227.28);
      break;

    case "Cayubaba":
      pdf.text("X", 61.92, 230.71);
      break;

    case "Machineri":
      pdf.text("X", 85.32, 230.71);
      break;

    case "Sirionó":
      pdf.text("X", 104.76, 230.71);
      break;

    case "Chachacobo":
      pdf.text("X", 61.92, 233.96);
      break;

    case "Maropa":
      pdf.text("X", 84.96, 233.96);
      break;

    case "Tacana":
      pdf.text("X", 104.76, 233.96);
      break;
  }

  if (form.hayCentroSalud) {
    pdf.text("x", 190.8, 200);
  } else {
    pdf.text("x", 190.8, 202.56);
  }

  switch (form.atencionSalud) {
    case "seguro":
      pdf.text("X", 160.92, 210.85);
      break;
    case "publica":
      pdf.text("X", 160.92, 214.3);
      break;
    case "privada":
      pdf.text("X", 160.92, 217.34);
      break;
    case "farmacia":
      pdf.text("X", 190.8, 217.7);
      break;
    case "vivienda":
      pdf.text("X", 190.8, 210.85);
      break;
    case "tradicional":
      pdf.text("X", 190.8, 214.3);
      break;
  }

  if (form.tieneSeguro) {
    pdf.text("X", 171.0, 224.19);
  } else {
    pdf.text("X", 183.96, 224.19);
  }

  pdf.text(form.grupoSanguineo, 173.88, 231);

  // PASO 5

  switch (form.ocupacion) {
    case "Agricultura":
      pdf.text("X", 38.88, 245);
      break;

    case "Obrero":
      pdf.text("X", 61.92, 245);
      break;

    case "Empleado":
      pdf.text("X", 61.92, 248.2);
      break;

    case "Gremial":
      pdf.text("X", 38.88, 248.2);
      break;

    case "Trabajadora de hogar":
      pdf.text("X", 38.88, 251.09);
      break;

    case "Emprendedor":
      pdf.text("X", 61.92, 251.45);
      break;

    case "Otro":
      pdf.text("X", 38.88, 256);
      pdf.text(form.ocupacionOtro, 48.24, 256);
      break;
  }

  if (form.turnoTrabajo.includes("Mañana")) {
    pdf.text("X", 104.76, 245.14);
  }

  if (form.turnoTrabajo.includes("Tarde")) {
    pdf.text("X", 114.84, 245.14);
  }

  if (form.turnoTrabajo.includes("Noche")) {
    pdf.text("X", 124.92, 245.14);
  }

  switch (form.frecuenciaTrabajo) {
    case "Todos los días":
      pdf.ellipse(88.56, 251.09, 0.8, 0.8, "F");
      break;

    case "Días hábiles":
      pdf.ellipse(88.56, 254.69, 0.8, 0.8, "F");
      break;

    case "Fines de semana":
      pdf.ellipse(105.2, 251.09, 0.8, 0.8, "F");
      break;

    case "Días festivos":
      pdf.ellipse(128.16, 251.09, 0.8, 0.8, "F");
      break;

    case "Eventual / esporádico":
      pdf.ellipse(105.48, 255.06, 0.8, 0.8, "F");
      break;
    case "En vacaciones":
      pdf.ellipse(128.16, 254.69, 0.8, 0.8, "F");
      break;
  }

  if (form.accesoInternet.includes("Teléfono celular")) {
    pdf.text("X", 157.68, 244.96);
  }

  if (form.accesoInternet.includes("Su vivienda")) {
    pdf.text("X", 170.64, 244.96);
  }

  if (form.accesoInternet.includes("Lugares públicos")) {
    pdf.text("X", 190.8, 244.96);
  }

  if (form.accesoInternet.includes("Centro de Educación Alternativa")) {
    pdf.text("X", 170.64, 248.5);
  }

  if (form.accesoInternet.includes("No accede a internet")) {
    pdf.text("X", 190.8, 248.5);
  }

  switch (form.frecuenciaInternet) {
    case "Diariamente":
      pdf.text("X", 164.52, 253.61);
      break;

    case "Más de una vez a la semana":
      pdf.text("X", 190.8, 253.61);
      break;

    case "Una vez a la semana":
      pdf.text("X", 164.16, 257.58);
      break;

    case "Una vez al mes":
      pdf.text("X", 190.8, 257.58);
      break;
  }

  switch (form.medioTransporte) {
    case "A pie":
      pdf.text("X", 38.88, 268.6);
      break;

    case "Minibús":
      pdf.text("X", 58.68, 268.6);
      break;

    case "Microbús":
      pdf.text("X", 38.88, 272.0);
      break;

    case "Taxi / Trufi":
      pdf.text("X", 58.68, 272);
      break;

    case "Camión":
      pdf.text("X", 78.48, 268.6);
      break;

    case "Bicicleta":
      pdf.text("X", 98.28, 268.6);
      break;

    case "Motocicleta":
      pdf.text("X", 78.48, 272.0);
      break;

    case "Transporte fluvial":
      pdf.text("X", 98.28, 272);
      break;
  }
  pdf.setCharSpace(2.1);
  pdf.text(form.tiempoHoras.toString(), 95.04, 275.7);
  pdf.text(form.tiempoMinutos.toString(), 94.68, 278.97);

  // 7.5.3 acceso a
  if (form.accesoComunicacion.includes("Radio")) {
    pdf.text("X", 124.92, 268.76);
  }

  if (form.accesoComunicacion.includes("Televisión")) {
    pdf.text("X", 124.56, 272);
  }

  if (form.accesoComunicacion.includes("Celular")) {
    pdf.text("X", 147.6, 272);
  }

  if (form.accesoComunicacion.includes("Computadora")) {
    pdf.text("X", 147.6, 275.25);
  }

  if (form.accesoComunicacion.includes("Internet")) {
    pdf.text("X", 147.6, 268.76);
  }

  if (form.aguaPotable) {
    pdf.ellipse(184.59, 264.09, 0.8, 0.8, "F");
  } else {
    pdf.ellipse(191.3, 264.09, 0.8, 0.8, "F");
  }

  if (form.alcantarillado) {
    pdf.ellipse(184.59, 268.7, 0.8, 0.8, "F");
  } else {
    pdf.ellipse(191.3, 268.7, 0.8, 0.8, "F");
  }

  if (form.energiaElectrica) {
    pdf.ellipse(184.59, 272, 0.8, 0.8, "F");
  } else {
    pdf.ellipse(191.3, 272, 0.8, 0.8, "F");
  }

  switch (form.tipoVivienda) {
    case "Propia":
      pdf.ellipse(159.48, 277.8, 1, 0.5, "F");
      break;

    case "Alquilada":
      pdf.ellipse(171.36, 277.8, 1, 0.5, "F");
      break;

    case "Anticrético":
      pdf.ellipse(182.16, 277.8, 1, 0.5, "F");
      break;

    case "Otro":
      pdf.ellipse(191.16, 277.8, 1, 0.5, "F");
      break;
  }

  // // PASO 6
  pdf.setCharSpace(0);

  switch (form.modalidadEstudio) {
    case "Presencial":
      pdf.text("X", 39.24, 288.08);
      break;

    case "Semipresencial":
      pdf.text("X", 39.6, 290.72);
      break;

    case "A distancia":
      pdf.text("X", 39.24, 293.87);
      break;
  }

  switch (form.turnoEstudio) {
    case "Mañana":
      pdf.text("X", 55.44, 303.05);
      break;

    case "Tarde":
      pdf.text("X", 55.44, 305.94);
      break;

    case "Noche":
      pdf.text("X", 55.44, 308.46);
      break;
  }

  // Semestre
  if (form.semestre === "Primer semestre") {
    switch (form.nivel) {
      case "Técnico Básico":
        pdf.ellipse(158, 288, 1, 0.5, "F");

        break;

      case "Técnico Auxiliar":
        pdf.ellipse(173.7, 288, 1, 0.5, "F");
        break;

      case "Técnico Medio":
        pdf.ellipse(188.9, 288, 1, 0.5, "F");
        break;
    }
    pdf.setCharSpace(0);

    pdf.text(form.carrera.toUpperCase(), 148.32, 290.86);
  } else if (form.semestre === "Segundo semestre") {
    switch (form.nivel) {
      case "Técnico Básico":
        pdf.ellipse(158, 293.7, 1, 0.5, "F");
        break;

      case "Técnico Auxiliar":
        pdf.ellipse(173.52, 293.7, 1, 0.5, "F");
        break;

      case "Técnico Medio":
        pdf.ellipse(189.0, 293.7, 1, 0.5, "F");
        break;
    }

    pdf.text(form.carrera.toUpperCase(), 147.96, 296.63);
  }
  pdf.setCharSpace(0);

  pdf.text(diaA, 142.56, 314.2);
  pdf.text(mesA, 159.84, 314.2);
  pdf.text(anioA, 181.08, 314.2);
  pdf.save("rude.pdf");
}
