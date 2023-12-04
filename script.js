const html = document.querySelector("html");
const tempoNaTela = document.querySelector("#timer")
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const startPauseBt = document.querySelector("#start-pause");
const musicaFocoInput = document.querySelector("#alternar-musica");
const iniciaOuPausaBt = document.querySelector("#start-pause span");
const imagemBt = document.querySelector(".app__card-primary-butto-icon");
const musica = new Audio("sons/luna-rise-part-one.mp3");
const startSom = new Audio("sons/play.wav");
const pauseSom = new Audio("sons/pause.mp3");
const alertaSom = new Audio("sons/beep.mp3");
musica.loop = true;

let tempoDecorridoEmSegundo =1500;
let intervaloId = null;

//addEventListener É método que permite que registremos funções (callbacks) que serão chamadas quando um evento específico ocorrer. elemento.addEventListener(evento, callback); No caso usamos o evento click.

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundo = 1500;
  alteraContexto("foco");
  focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundo = 300;
  alteraContexto("descanso-curto");
  curtoBt.classList.add("active");
  

});
longoBt.addEventListener("click", () => {
  tempoDecorridoEmSegundo = 900;
  alteraContexto("descanso-longo");
  longoBt.classList.add("active");
});

function alteraContexto(contexto) {
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  imagem.setAttribute("src", `imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `Otimize sua produtividade,<br>
        <strong class="app__title-strong">mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      titulo.innerHTML = `Que tal dar uma respirada?<br>
        <strong class="app__title-strong">Faça uma pausa curta!</strong>`;

      break;
    case "descanso-longo":
      titulo.innerHTML = `Hora de voltar à superfície.<br>
        <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundo <= 0) {
    alertaSom.play();
    alert("Tempo Esgotado");
    zerar();
    return;
  }
  tempoDecorridoEmSegundo -= 1;
  mostrarTempo();
};

startPauseBt.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  //Aqui a parte do pause.
  if (intervaloId) {
    pauseSom.play();
    zerar();
    return;
  }
  //Aqui a parte do play
  intervaloId = setInterval(contagemRegressiva, 1000);
  startSom.play();
  iniciaOuPausaBt.textContent="Pausar";
  imagemBt.setAttribute("src", `imagens/pause.png`)
}

function zerar() {
  clearInterval(intervaloId);
  iniciaOuPausaBt.textContent="Começar"
  imagemBt.setAttribute("src", `imagens/play_arrow.png`)
  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundo * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {minute: "2-digit", second: "2-digit"})
  tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()
//Neste projeto usamos tanto o Innet.html quanto o textContent ambos alteram o conteúdo do texto do html, mas tem caracteristicas diferentes em algum pontos. Por exemplo, com  o inner conseguimos mudar ou inserir tags do html, incluindo o <strong> ou <br> já no textContent não será possível, só alterando o texto apenas.