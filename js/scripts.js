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
var canvasWidth = 352;
var canvasHeight = 198;

contenedorCanvas.style.transform = "scale(1)";
ctx.font = "30px VT323";
ctx.textAlign = "center";
/* Pantala 1 */
ctx.fillText("Presiona Inicio", canvas.width / 2, canvas.height / 2);

botonInicio.addEventListener("click", function () {
  /* Pantala 2 */
  contenedorCanvas.style.transform = "scale(2.2) translateY(25%)";

  botonInicio.classList.add("invisible");

  //Borra Canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  pintaVidasDeCorazones(5);

  ctx.drawImage(imagenPlataforma, 0, 0);

  palabraRandom = devuelvePalabraRandom();

  llenaPalabraConAciertosConGuiones(palabraRandom);

  pintaPalabraConAciertos(palabraConAciertos);

  muevoImagenDeLaVictima(0, 0);

  inputLetras.classList.remove("invisible");
}); //Listener inicio

inputLetras.addEventListener("input", function () {
  var letraIngresada = inputLetras.value;
  inputLetras.value = "";

  //Borra un rectangulo debajo del canvas letras anteriores o guiones
  ctx.clearRect(0, canvasHeight - 40, canvasWidth, 40);
  console.log(palabraRandom);
  console.log(letraIngresada);
  console.log(palabraConAciertos);

  for (let i = 0; i < palabraRandom.length; i++) {
    if (letraIngresada == palabraRandom[i]) {
      palabraConAciertos[i] = letraIngresada;
    }
  }
  pintaPalabraConAciertos(palabraConAciertos);
});

function muevoImagenDeLaVictima(adicionLeft, adicionTop) {
  var x = 130;
  var y = 39;
  var leftCut = 0;
  var topCut = 0;
  var whidthCut = 72;
  var heightCut = 60;
  ctx.drawImage(
    imagenVictima,
    leftCut + adicionLeft, //71
    topCut + adicionTop, //+59
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
  for (i = 0; i < cantidadDeVidas; i++) {
    ctx.drawImage(imagenCorazon, posicionCorazon * i, 0);
  }
}
function pintaPalabraConAciertos(palabraConAciertos) {
  var y = 196;
  var palabraUnida = "";
  var x =
    canvasWidth / 2; /*  canvasWidth / 2 - palabraConAciertos.length * 12; */ //12 es un estimado del largo de los guiones para centrar
  /*   ctx.font = "60px VT323";
  ctx.fillText(palabraConAciertos, x + i, y) */

  //30 es un estimado teniendo en cuenta que la fuente es de 60px
  for (i = 0; i < palabraConAciertos.length; i++) {
    palabraUnida = palabraUnida + palabraConAciertos[i] + " ";
  }

  ctx.font = "40px VT323";
  ctx.fillText(palabraUnida, x, y);
}

function llenaPalabraConAciertosConGuiones(palabraRandom) {
  for (i = 0; i < palabraRandom.length; i++) {
    palabraConAciertos[i] = "_";
  }
}

/* function pintaCaracteres(cantidadDeCaracteres, caracter) {
  var y = 196;

  var x = canvasWidth / 2 - cantidadDeCaracteres * 12; //12 es un estimado del largo de los guiones para centrar

  //30 es un estimado teniendo en cuenta que la fuente es de 60px
  for (i = 0; i < cantidadDeCaracteres * 30; i += 30) {
    ctx.font = "60px VT323";
    ctx.fillText(caracter, x + i, y);
  }
} */

function devuelvePalabraRandom() {
  var palabras = ["pato", "pito", "mama", "papiro", "heladera"];

  var indiceRandom = Math.floor(Math.random() * 5); //De cero a 5

  return palabras[indiceRandom];
}
/* var imagen = new Image(100,50);
imagen.src = "img/plataforma.png";

imagen.onload =() =>{
ctx.drawImage(imagen,0,0);
}; */
