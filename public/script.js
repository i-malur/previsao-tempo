let dadosClima = null;

function changeBackground() {

    const url =`https://picsum.photos/1920/1080?random=${Date.now()}`;

    document.body.style.backgroundImage =`url("${url}")`;
}


changeBackground();
setInterval(changeBackground, 300000);

function dataInScreen(dados) {
    document.querySelector(".city").innerHTML = "Tempo em: " + dados.name;
    document.querySelector(".temp").innerHTML = Math.floor(dados.main.temp) + " °C";
    document.querySelector(".temp-min").innerHTML = "Mínimo: " + Math.floor(dados.main.temp_min) + " °C";
    document.querySelector(".temp-max").innerHTML = "Máximo: " + Math.floor(dados.main.temp_max) + " °C";
    document.querySelector(".text-time").innerHTML = dados.weather[0].description;
    document.querySelector(".humidity").innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector(".icon-cloud").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    console.log(dados)
}

function clearScreen() {

    document.querySelector(".city").innerHTML = "Tempo em:";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".temp-min").innerHTML = "";
    document.querySelector(".temp-max").innerHTML = "";
    document.querySelector(".text-time").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";

    document.querySelector(".icon-cloud").src = "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f30e_3d.png";
}

async function searchCity(cidade) {
    const resposta = await fetch(`/clima?cidade=${cidade}`);
    const dados = await resposta.json();

    if (dados.cod !== 200) {
        document.querySelector(".city").innerHTML = "Cidade não encontrada 👀";
        document.querySelector(".temp").innerHTML = "Temperatura atual";
        document.querySelector(".temp-min").innerHTML = "Mínima";
        document.querySelector(".temp-max").innerHTML = "Máxima";
        document.querySelector(".text-time").innerHTML = "Tempo";
        document.querySelector(".humidity").innerHTML = "Umidade";
        document.querySelector(".icon-cloud").src = "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f30e_3d.png";
        return;
    }

    changeBackground(dados.weather[0].main);
    dataInScreen(dados);

    dadosClima = dados;
}


async function clickButton() {
    const cidade = document.querySelector(".input-city").value;
    searchCity(cidade);
}

async function clickButtonIA(){

    if(!dadosClima){
        alert("Pesquise uma cidade primeiro 🌎");
        return;
    }

    const temperatura = dadosClima.main.temp;
    const clima = dadosClima.weather[0].description;
    const cidade = dadosClima.name;

    const respostaIA = await fetch(
        `/resposta?temp=${temperatura}&clima=${clima}&cidade=${cidade}`
    );

    const ia = await respostaIA.json();

    document.querySelector(".response-ia").innerHTML = ia.resposta;
}

function voiceDetected(){
    clearScreen();

    let reconhecimentoVoz = new window.webkitSpeechRecognition();
    reconhecimentoVoz.lang = "pt-BR";
    reconhecimentoVoz.start();

    reconhecimentoVoz.onresult = function(evento){
        let textoTranscrito = evento.results[0][0].transcript;
        document.querySelector(".input-city").value = textoTranscrito;
        searchCity(textoTranscrito);
    }
}

document.querySelector(".input-city")
    .addEventListener("keypress", function(event){
        if(event.key === "Enter"){
            clickButton();
        }
    });