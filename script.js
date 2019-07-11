var frutas = ["Banana", "Maçã", "Abacaxi", "Morango", "Uva"];
var frutasList = [];
var pontos = 0;
var falhas = 0;
var currentFruta = "";
var scrollTime = 100;
var best = 1;
var clickSound = new Audio("click.mp3");
var venderSound = new Audio("vender.mp3");

function getCombo() {
	var name = frutasList[0];
	var qtd;
	for (qtd = 0; qtd < frutasList.length && frutasList[qtd] == name; qtd++);
	return {qtd,name};
}

function checkTriumph() {
	if(pontos > 1) {
		var digits = (pontos).toString().length;
		if(digits > best) {
			best = digits;
			return true;
		}
		return false;
	}
}

function updateDados() {

	if(frutasList.length > 0) {
		var combo = getCombo();
		document.getElementById("combo").innerHTML = combo.name + " x" + combo.qtd;
	}
	else {
		document.getElementById("combo").innerHTML = "nenhum";
	}

	document.getElementById("qtd").innerHTML = frutasList.length;
	document.getElementById("pontos").innerHTML = pontos;
	document.getElementById("falhas").innerHTML = falhas;

	if(checkTriumph()){
		var originalPontosColor = document.getElementById("pontos").style.color;

		var blink = 0;
		var blinkAmount = 4;

		var a = setInterval(function() {

			if(blink%2 == 0) {
				document.getElementById("pontos").style.color = "rgb(255, 167, 85)";
			}
			else {
				document.getElementById("pontos").style.color = originalPontosColor;
			}

			if(blink == (blinkAmount * 2) - 1) {
				clearInterval(a);
			}

			blink++;

		}, 100);

	}

}

function updateFrutas() {
	scrollTime = frutasList.length < 1 ? 100 : 500/Math.pow(frutasList.length,0.3)
	if(frutasList.length > 0) {
		var frutasUL = "";
		for (var i = 0; i < frutasList.length; i++) {
			frutasUL += "<li>" + frutasList[i] + "</li>";
		}
		document.getElementById("frutas").innerHTML = frutasUL;
	}
	else {
		document.getElementById("frutas").innerHTML = "";
	}
	updateDados();
}

function addFruta() {
	frutasList.push(currentFruta);
	clickSound.cloneNode(true).play();
	updateFrutas();
}

function removeFruta() {
	frutasList.pop();
	falhas ++;
	clickSound.cloneNode(true).play();
	updateFrutas();
}

function vender() {
	var combo = getCombo().qtd;
	pontos += (combo*combo) - (falhas*falhas);
	frutasList = [];
	cliques = 0;
	falhas = 0;
	venderSound.cloneNode(true).play();
	updateFrutas();
}

var scrollIndex = 0;

function scrollFruta() {
	currentFruta = frutas[scrollIndex];
	document.getElementById("escolha").innerHTML = currentFruta;
	scrollIndex = scrollIndex == frutas.length - 1 ? 0 : scrollIndex + 1;
	setTimeout(scrollFruta, scrollTime);
}

var anim;
var animValue = 0;
var originalColor;

function hwb2rgb(h, w, b) {

  h *= 6;

  var v = 1 - b, n, f, i;
  if (!h) return {r:v, g:v, b:v};
  i = h|0;
  f = h - i;
  if (i & 1) f = 1 - f;
  n = w + f * (v - w);
  v = (v * 255)|0;
  n = (n * 255)|0;
  w = (w * 255)|0;

  switch(i) {
    case 6:
    case 0: return {r:v, g:n, b: w};
    case 1: return {r:n, g:v, b: w};
    case 2: return {r:w, g:v, b: n};
    case 3: return {r:w, g:n, b: v};
    case 4: return {r:n, g:w, b: v};
    case 5: return {r:v, g:w, b: n};
  }
}

function colorTick() {
	animValue = animValue == 360 ? 0 : animValue + 1;
	var rgb = hwb2rgb(animValue/360, 30/100, 10/100);
	document.getElementById("logo").style.color = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
}

function startColors() {
	anim = setInterval(colorTick, 10);
}

function stopColors() {
	clearInterval(anim);
	document.getElementById("logo").style.color = originalColor;
}

function onLoad() {
	originalColor = document.getElementById("logo").style.color;
	scrollFruta();
	updateDados();
}
