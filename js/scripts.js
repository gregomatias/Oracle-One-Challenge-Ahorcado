var contenedorCanvas = document.querySelector(".canvas-container");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imagenPlataforma = document.getElementById("img-plataforma");
var imagenSoldado = document.getElementById("img-soldado");
var imagenCura = document.getElementById("img-cura");
var imagenCorazon = document.getElementById("img-corazon");
var imagenVictima = document.getElementById("img-victima");
var imagenVictimaGano = document.getElementById("img-victimaGano");
var botonInicio = document.getElementById("boton-inicio");
var inputLetras = document.getElementById("input-letras");
var abecedario = document.getElementById("abecedario");
var palabraRandom = "";
var palabraConAciertos = [];
var palabraConAciertosUnida = "";

var cantidadDeVidas = 7;

var leftCut = [138, 0, 276, 138, 0, 276, 138, 0];
var topCut = [230, 230, 115, 115, 115, 0, 0, 0];

ctx.font = "30px VT323";
ctx.textAlign = "center";
/* Pantala 1 */
ctx.fillText("Presiona Inicio", canvas.width / 2, canvas.height / 2);

botonInicio.addEventListener("click", function () {
  /* Pantala 2 */

  cantidadDeVidas = 7;
  botonInicio.classList.add("invisible");
  abecedario.textContent ="ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

  //Borra Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pintaVidasDeCorazones(cantidadDeVidas);

  ctx.drawImage(imagenPlataforma, 0, 0);
  ctx.drawImage(imagenCura, 0, 75);
  ctx.drawImage(imagenSoldado, 260, 75);

  palabraRandom = devuelvePalabraRandom();

  palabraConAciertos = []; //Reinicia el Array cuando perdes

  llenaPalabraAciertosConGuiones(palabraRandom);

  pintaPalabraConAciertos(palabraConAciertos);

  muevoImagenDeLaVictima(cantidadDeVidas);
  abecedario.classList.remove("invisible");
  inputLetras.classList.remove("invisible");
  inputLetras.focus();
}); //Listener inicio

inputLetras.addEventListener("input", function () {
  var letraIngresada = depuraTexto(inputLetras.value);
  inputLetras.value = "";

  quitaLetraDelAbecedario(letraIngresada);

  var acierto = false;
  for (let i = 0; i < palabraRandom.length; i++) {
    if (letraIngresada == palabraRandom[i]) {
      palabraConAciertos[i] = letraIngresada;
      acierto = true;
    }
  }

  if (!acierto) {
    cantidadDeVidas = cantidadDeVidas - 1;
    muevoImagenDeLaVictima(cantidadDeVidas);
  }
  pintaVidasDeCorazones(cantidadDeVidas);
  palabraConAciertosUnida = pintaPalabraConAciertos(palabraConAciertos);

  if (cantidadDeVidas == 0) {
    perdisteElJuego();
  }
  if (palabraRandom == palabraConAciertosUnida) {
    ganasteElJuego();
  }
});

function quitaLetraDelAbecedario(letraIngresada) {
  var lestrasDisponibles = abecedario.textContent;
  var expresion = `[${letraIngresada}]`;
  var regex = new RegExp(expresion, "g");

  lestrasDisponibles = lestrasDisponibles.replace(regex, "");

  abecedario.textContent = lestrasDisponibles;
}

function depuraTexto(textoIngresado) {
  var textoReemplazado = textoIngresado.replace(/á/g, "a");
  textoReemplazado = textoReemplazado.replace(/é/g, "e");
  textoReemplazado = textoReemplazado.replace(/í/g, "i");
  textoReemplazado = textoReemplazado.replace(/ó/g, "o");
  textoReemplazado = textoReemplazado.replace(/ú/g, "u");
  textoReemplazado = textoReemplazado
    .replace(/[^A-Z-a-z\s\r]/g, "")
    .toUpperCase();

  return textoReemplazado;
}

function muevoImagenDeLaVictima(cantidadDeVidas) {
  var x = 80; //130
  var y = 37; //39
  var whidthCut = 138; //72
  var heightCut = 115; //60

  ctx.drawImage(
    imagenVictima,
    leftCut[cantidadDeVidas], //71
    topCut[cantidadDeVidas], //+59
    whidthCut,
    heightCut,
    x,
    y,
    138, //Escala
    115 //Escala
  );
}

function pintaVidasDeCorazones(cantidadDeVidas) {
  var posicionCorazon = 32;
  ctx.clearRect(0, 0, canvas.width, 35);
  for (i = 0; i < cantidadDeVidas; i++) {
    ctx.drawImage(imagenCorazon, posicionCorazon * i, 0, 16, 16);
  }
}
function pintaPalabraConAciertos(palabraConAciertos) {
  //Borra un rectangulo debajo del canvas letras anteriores o guiones
  /* ctx.clearRect(0, canvas.height - 40, canvas.width, 40); */
  //En lugar de borrar con clearRect pinto nuevamente el fondo.
  ctx.drawImage(imagenPlataforma, 0, 0);
  var y = 196;
  var palabraUnida = "";
  var x = canvas.width / 2;

  //30 es un estimado teniendo en cuenta que la fuente es de 60px
  for (i = 0; i < palabraConAciertos.length; i++) {
    palabraUnida = palabraUnida + palabraConAciertos[i] + " ";
  }

  ctx.fillStyle = "#cbdbfc";
  ctx.font = "30px VT323";
  ctx.fillText(palabraUnida, x, y);
  return palabraUnida.replace(/\s/g, "");
}

function llenaPalabraAciertosConGuiones(palabraRandom) {
  for (i = 0; i < palabraRandom.length; i++) {
    palabraConAciertos[i] = "_";
  }
}

function devuelvePalabraRandom() {
  var palabras = ["PATO", "PITO", "MAMA", "PAPIRO", "HELADERA"];

  var indiceRandom = Math.floor(Math.random() * 5); //De cero a 5

  return palabras[indiceRandom];
}

function perdisteElJuego() {
  //Borra Canvas
  ctx.drawImage(imagenPlataforma, 0, 0);
  pintaPalabraConAciertos(palabraRandom);

  ctx.fillStyle = "#222034";
  ctx.font = "20px VT323";
  ctx.textAlign = "center";
  ctx.fillText("Lo siento, perdiste", canvas.width / 2, 20);

  inputLetras.classList.add("invisible");
  botonInicio.classList.remove("invisible");
  abecedario.classList.add("invisible");
}
function ganasteElJuego() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  //En lugar de borrar con clearRect pinto nuevamente el fondo.
  ctx.drawImage(imagenPlataforma, 0, 0);
  ctx.fillStyle = "#222034";
  ctx.font = "30px VT323";
  ctx.textAlign = "center";
  ctx.fillText("Ganaste el juego!!!", canvas.width / 2, canvas.height / 2 - 20);
  inputLetras.classList.add("invisible");
  botonInicio.classList.remove("invisible");
  abecedario.classList.add("invisible");
  ctx.drawImage(imagenVictimaGano, canvas.width / 2 - 36, 75);
  ctx.drawImage(imagenCorazon, canvas.width / 2 + 25, 95, 16, 16);
}
