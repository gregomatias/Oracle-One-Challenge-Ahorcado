var contenedorCanvas = document.querySelector(".canvas-container");
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var imagenPlataforma = document.getElementById("img-plataforma");
var imagenVictima = document.getElementById("img-victima");
var botonInicio = document.getElementById("boton-inicio");
var canvasWidth = 352;
var canvasHeight = 198;

/* var imagen = new Image(100,50);
imagen.src = "img/plataforma.png";

imagen.onload =() =>{
ctx.drawImage(imagen,0,0);
}; */

contenedorCanvas.style.transform = "scale(1)";
ctx.font = "30px VT323";
ctx.textAlign = "center";

ctx.fillText("Presiona Inicio", canvas.width / 2, canvas.height / 2);

botonInicio.addEventListener("click", function () {
  contenedorCanvas.style.transform = "scale(2.5) translateY(25%)";
  botonInicio.classList.add("invisible");

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.drawImage(imagenPlataforma, 0, 0);

  muevoImagenDeLaVictima(0, 0);
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
