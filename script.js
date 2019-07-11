//--------------------------------------//

var fruits = ["🍌 Banana", "🍏 Maçã", "🍍 Abacaxi", "🍓 Morango", "🍇 Uva"];
var fruitsList = [];
var points = 0;
var faults = 0;
var currentFruit = "";
var scrollTime = 100;
var highscore = 1;
var clickSound = new Audio("click.mp3");
var sellSound = new Audio("sell.mp3");
var scrollIndex = 0;

//--------------------------------------//

function id(id){
	return document.getElementById(id);
}

function getCombo() {
	var name = fruitsList[0];
	var qtd;
	for (qtd = 0; qtd < fruitsList.length && fruitsList[qtd] == name; qtd++);
	return {qtd,name};
}

function showAchievement(text) {
	id("achievement-text").innerHTML = text;
	id("achievement").style.opacity = "1";
}

function hideAchievement() {
	id("achievement").style.opacity = "0";
}

//--------------------------------------//

function scrollFruit() {
	currentFruit = fruits[scrollIndex];
	id("choice").innerHTML = currentFruit;
	scrollIndex = scrollIndex == fruits.length - 1 ? 0 : scrollIndex + 1;
	setTimeout(scrollFruit, scrollTime);
}

function checkHighscore() {
	if(points > 1) {
		var digits = (points).toString().length;
		if(digits > highscore) {
			highscore = digits;
			return true;
		}
		return false;
	}
}

function updateData() {

	if(fruitsList.length > 0) {
		var combo = getCombo();
		id("combo").innerHTML = combo.name + " x" + combo.qtd;
	}
	else {
		id("combo").innerHTML = "nenhum";
	}

	id("qtd").innerHTML = fruitsList.length;
	id("points").innerHTML = points;
	id("faults").innerHTML = faults;

	if(checkHighscore()){

		showAchievement("Alcance " + Math.pow(10,highscore-1) + " pontos");

		var originalPointsColor = id("points").style.color;

		var blink = 0;
		var blinkAmount = 4;

		var a = setInterval(function() {

			if(blink%2 == 0) {
				id("points").style.color = "rgb(255, 167, 85)";
			}
			else {
				id("points").style.color = originalPointsColor;
			}

			if(blink == (blinkAmount * 2) - 1) {
				clearInterval(a);
			}

			blink++;

		}, 100);

	}

}

function updateFruits() {
	scrollTime = fruitsList.length < 1 ? 100 : 500/Math.pow(fruitsList.length,0.3)
	if(fruitsList.length > 0) {
		var fruitsUL = "";
		for (var i = 0; i < fruitsList.length; i++) {
			fruitsUL += "<li>" + fruitsList[i] + "</li>";
		}
		id("fruits").innerHTML = fruitsUL;
	}
	else {
		id("fruits").innerHTML = "";
	}
	id("game-panel").scrollTo(0,id("game-panel").scrollHeight);
	updateData();
}

function addFruit() {
	fruitsList.push(currentFruit);
	clickSound.cloneNode(true).play();
	updateFruits();
}

function removeFruit() {
	fruitsList.pop();
	faults ++;
	clickSound.cloneNode(true).play();
	updateFruits();
}

function sell() {
	var combo = getCombo().qtd;
	points += (combo*combo) - (faults*faults);
	fruitsList = [];
	cliques = 0;
	faults = 0;
	sellSound.cloneNode(true).play();
	updateFruits();
}

function openPanel(evt, cityName) {
    var tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (var i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    id(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

//--------------------------------------//

function onLoad() {
	id("defaultOpen").click();
	hideAchievement();
	scrollFruit();
	updateData();
}
