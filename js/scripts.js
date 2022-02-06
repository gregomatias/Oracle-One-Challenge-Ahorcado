var contenedorCanvas = document.querySelector(".canvas-container");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imagenPlataforma = document.getElementById("img-plataforma");
var imagenCorazon = document.getElementById("img-corazon");
var imagenVictima = document.getElementById("img-victima");
var botonInicio = document.getElementById("boton-inicio");
var inputLetras = document.getElementById("input-letras");
var palabraRandom = "";
var palabraConAciertos = [];

var cantidadDeVidas = 7;
var leftCut = [71, 0, 142, 71, 0, 142, 71, 0];
var topCut = [118, 118, 59, 59, 59, 0, 0, 0];

/* contenedorCanvas.style.transform = "scale(1)"; */
ctx.font = "30px VT323";
ctx.textAlign = "center";
/* Pantala 1 */
ctx.fillText("Presiona Inicio", canvas.width / 2, canvas.height / 2);

botonInicio.addEventListener("click", function () {
  /* Pantala 2 */
  /*  contenedorCanvas.style.transform = "scale(2.2) translateY(25%)"; */

  cantidadDeVidas = 7;
  botonInicio.classList.add("invisible");

  //Borra Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pintaVidasDeCorazones(cantidadDeVidas);

  ctx.drawImage(imagenPlataforma, 0, 0);

  palabraRandom = devuelvePalabraRandom();

  palabraConAciertos = []; //Reinicia el Array cuando perdes

  llenaPalabraAciertosConGuiones(palabraRandom);

  pintaPalabraConAciertos(palabraConAciertos);

  muevoImagenDeLaVictima(cantidadDeVidas);

  inputLetras.classList.remove("invisible");
  inputLetras.focus();
}); //Listener inicio

inputLetras.addEventListener("input", function () {
  var letraIngresada = depuraTexto(inputLetras.value);
  inputLetras.value = "";

  //Borra un rectangulo debajo del canvas letras anteriores o guiones
  ctx.clearRect(0, canvas.height - 40, canvas.width, 40);
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
  pintaPalabraConAciertos(palabraConAciertos);

  if (cantidadDeVidas == 0) {
    pintaFinDelJuego();
  }
});

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
  var x = 130;
  var y = 39;
  var whidthCut = 72;
  var heightCut = 60;

  ctx.drawImage(
    imagenVictima,
    leftCut[cantidadDeVidas], //71
    topCut[cantidadDeVidas], //+59
    whidthCut,
    heightCut,
    x,
    y,
    72, //Escala
    60 //Escala
  );
}

function pintaVidasDeCorazones(cantidadDeVidas) {
  var posicionCorazon = 32;
  ctx.clearRect(0, 0, canvas.width, 35);
  for (i = 0; i < cantidadDeVidas; i++) {
    ctx.drawImage(imagenCorazon, posicionCorazon * i, 0);
  }
}
function pintaPalabraConAciertos(palabraConAciertos) {
  var y = 196;
  var palabraUnida = "";
  var x =
    canvas.width / 2; /*  canvasWidth / 2 - palabraConAciertos.length * 12; */ //12 es un estimado del largo de los guiones para centrar

  //30 es un estimado teniendo en cuenta que la fuente es de 60px
  for (i = 0; i < palabraConAciertos.length; i++) {
    palabraUnida = palabraUnida + palabraConAciertos[i] + " ";
  }

  ctx.fillStyle = "#fffff";
  ctx.font = "40px VT323";
  ctx.fillText(palabraUnida, x, y);
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

function pintaFinDelJuego() {
  //Borra Canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#fffff";
  ctx.font = "20px VT323";
  ctx.textAlign = "center";
  ctx.fillText("Lo siento, perdiste", canvas.width / 2, canvas.height / 2);
  ctx.fillText(
    "Era: " + palabraRandom,
    canvas.width / 2,
    canvas.height / 2 + 20
  );
  inputLetras.classList.add("invisible");
  botonInicio.classList.remove("invisible");
}
