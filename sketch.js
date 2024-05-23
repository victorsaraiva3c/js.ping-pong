//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 25;

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;
let raio = dBolinha / 2;

//variavel da raquete
let xRaquete = 5;
let yRaquete = 150;
let largRaquete = 8;
let altRaquete = 100

//variavel da raquete oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

//colisão
let colisão = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  cenario();
  trilha.loop();
}

function draw() {
  background(0);
  bolinha();
  movimentoDaBolinha();
  verificacaoDeColisaoDaBolinha();
  raquete(xRaquete, yRaquete);
  movimentoDaRaquete();
  //colisaoMinhaRaquete();
  colisaoRaquetes(xRaquete, yRaquete);
  raquete(xRaqueteOponente, yRaqueteOponente);
  movimentoDaRaqueteOponente();
  colisaoRaquetes(xRaqueteOponente, yRaqueteOponente);
  telaPlacar();
  marcaPonto();
  incluiPlacar();
}

function bolinha(){
  circle(xBolinha, yBolinha, dBolinha)
}

function movimentoDaBolinha(){
  xBolinha += velocidadeXBolinha
  yBolinha += velocidadeYBolinha
}

function verificacaoDeColisaoDaBolinha(){
  if (xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function cenario(){
  createCanvas(600, 400);
}

function raquete(x,y){
  rect(x, y, largRaquete, altRaquete);
}

function movimentoDaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoMinhaRaquete(){
  if (xBolinha - raio < xRaquete + largRaquete && yBolinha - raio < yRaquete + altRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function colisaoRaquetes(x,y){
  colisao = 
collideRectCircle(x, y, largRaquete, altRaquete, xBolinha, yBolinha, dBolinha);
  if (colisao){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentoDaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - largRaquete /2 - 30
  yRaqueteOponente += velocidadeYOponente
}

function movimentoDaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}




function incluiPlacar() {
    //fill(255);
    textSize(20);
    text(meusPontos, 150, 26);
    text(pontosDoOponente, 450, 26);
}

function telaPlacar(){
  stroke(0, 100, 0)
  rect(141, 9, 29, 20);
  rect(441, 9, 29, 20);
}

function marcaPonto(){
    if (xBolinha > 589){
        meusPontos += 1;
      ponto.play();
    }
    if (xBolinha < 11) {
        pontosDoOponente += 1;
      ponto.play();
    }
}