
var palavras = ["DITONGO","ALTERNAR","CORAGEM","MANEIRA","INHAME","TRAVESSA","PERENE","COLUNA","PACOTE","CAMINHO","PERFUME","ASTRO","MOMENTO","TRIVIAL"];
var letrasPossiveis = ["A","B","C","D","E","F","G","H","I","J","L","M","N","O","P","Q","R","S","T","U","V","X","Z"];
var letrasDigitadas;
var palavraCorreta;
var palavraSecreta;
var erros;

function salvarPalavra() {

	var botaoSalvarPalavra = document.querySelector("#salvar_palavra");
	var inputPalavra = document.querySelector(".input");
	var palavraAdicionada = inputPalavra.value.toUpperCase();

	if(palavraAdicionada.length>=5 && palavraAdicionada.length<=8 ) {
		if(palavras.includes(palavraAdicionada)) {
			inputPalavra.value="";
			alert("Esta palavra já existe na lista, digite outra!");
		}
		else {
			palavras.push(palavraAdicionada);
			inputPalavra.value="";
			alert("A nova palavra foi salva!");
		} 
	} else {
		alert("A palavra deve ter entre 5 e 8 letras");
		inputPalavra.value = "";
	}
}

function escolherPalavraSecreta() {
	palavraSecreta = palavras[Math.floor(Math.random()*palavras.length)];
	console.log(palavraSecreta);
	return palavraSecreta;
}

function desenharTracinhos() {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	tabuleiro.clearRect(0,0,1200,400);
	tabuleiro.lineWidth = 6;
	tabuleiro.lineCap = "round";
	tabuleiro.lineJoin = "round";
	tabuleiro.strokeStyle = "#0A3871";
	tabuleiro.beginPath();

	var eixo = 600/palavraSecreta.length;
	for(var i=0;i<palavraSecreta.length;i++) {
		tabuleiro.moveTo(500+(eixo*i),300);
		tabuleiro.lineTo(550+(eixo*i),300);
	}
	tabuleiro.stroke();
	tabuleiro.closePath();
}

function jogar() {
	letrasDigitadas = [];
	palavraCorreta = "";
	erros = 9;

	escolherPalavraSecreta();
	desenharTracinhos();
	document.addEventListener("keydown", (e) => {
		var letraClicada = e.key.toUpperCase();
		verificaLetraDigitada(letraClicada);
		letrasDigitadas.push(letraClicada);
	})
}

function verificaLetraDigitada(letraClicada) {
	if(erros>1 && palavraCorreta.length != palavraSecreta.length) {
		if(letrasPossiveis.includes(letraClicada) && !letrasDigitadas.includes(letraClicada)) {
			if(palavraSecreta.includes(letraClicada)) {
				for(let i=0;i<palavraSecreta.length;i++) {
					if(palavraSecreta[i]===letraClicada) {
						escreverLetraCorreta(i);
						adicionarLetraCorreta(palavraSecreta.indexOf(letraClicada));
					}
				}
			}
			else {
					adicionarLetraIncorreta(letraClicada);
					escreverLetraIncorreta(letraClicada,erros);
			}
		} 
	} 
}

function escreverLetraCorreta(index) {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	tabuleiro.font="bold 52px Ubuntu";
	tabuleiro.lineWidth = 6;
	tabuleiro.lineCap = "round";
	tabuleiro.lineJoin = "round";
	tabuleiro.fillStyle = "#0A3871";

	var eixo = 600/palavraSecreta.length;
	tabuleiro.fillText(palavraSecreta[index],505+(eixo*index),290);
	tabuleiro.stroke();
}

function escreverLetraIncorreta(letra,errorsLeft) {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	tabuleiro.font="bold 40px Ubuntu";
	tabuleiro.lineWidth = 6;
	tabuleiro.lineCap = "round";
	tabuleiro.lineJoin = "round";
	tabuleiro.fillStyle = "#0A3871";
	tabuleiro.fillText(letra,535+(40*(10-errorsLeft)),350,40);
}

function adicionarLetraCorreta(i) {
	palavraCorreta += palavraSecreta[i];
	setTimeout(function() {
			if(palavraCorreta.length == palavraSecreta.length) {
				desenhaVoceGanhou();
			}
		},500);
}

function adicionarLetraIncorreta(letter) {
	if(palavraSecreta.indexOf(letter)<=0) {
		erros-=1;
		desenhaForca(erros);
	}
}

function desenhaVoceGanhou() {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	var frase = "Você ganhou!";
	tabuleiro.font="bold 42px Ubuntu";
	tabuleiro.lineWidth = 5;
	tabuleiro.lineCap = "round";
	tabuleiro.lineJoin = "round";
	tabuleiro.fillStyle = "white";
	tabuleiro.fillText(frase,125,250);
}

function desenhaVocePerdeu() {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	var frase = "Você perdeu!";
	tabuleiro.font="bold 42px Ubuntu";
	tabuleiro.lineWidth = 5;
	tabuleiro.lineCap = "round";
	tabuleiro.lineJoin = "round";
	tabuleiro.fillStyle = "white";
	tabuleiro.fillText(frase,125,250);
}

function desenha(x,y,x2,y2) {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	tabuleiro.moveTo(x,y);
	tabuleiro.lineTo(x2,y2);
	tabuleiro.stroke();
	tabuleiro.closePath();
}

function desenhaForca (erros) {
	var tabuleiro = document.getElementById("forca").getContext("2d");
	tabuleiro.lineWidth = 6;
	tabuleiro.lineCap = "round";
	tabuleiro.lineJoin = "round";
	tabuleiro.strokeStyle = "#0A3871";
	tabuleiro.beginPath();

	if(erros==8){
		desenha(490,290,490,10);
	}
	if(erros==7){
		desenha(490,10,630,10);
	}
	if(erros==6){
		tabuleiro.arc(630,50,30,0,2*Math.PI);
		tabuleiro.stroke();
		tabuleiro.closePath();
	}
	if(erros==5){
		desenha(630,80,630,185);
	}
	if(erros==4){
		desenha(630,105,580,135);
	}
	if(erros==3){
		desenha(630,105,680,135);
	}
	if(erros==2){
		desenha(630,185,680,215);
	}
	if(erros==1){
		desenha(630,185,580,215);

		setTimeout(function() {
			desenhaVocePerdeu();
		},500);
	}
}


	

	
		
