

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

async function searchCity(cidade) {
    const resposta = await fetch(`/clima?cidade=${cidade}`);
    const dados = await resposta.json();

    if (dados.cod !== 200) {
        document.querySelector(".city").innerHTML = "Cidade não encontrada 😢";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".temp-min").innerHTML = "";
        document.querySelector(".temp-max").innerHTML = "";
        document.querySelector(".text-time").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".icon-cloud").src = "https://images.emojiterra.com/microsoft/fluent-emoji/15.1/3d/1f30e_3d.png";
        return;
    }

    document.body.style.backgroundImage = `url("https://picsum.photos/1920/1080?random=${Math.random()}")`;

    dataInScreen(dados);
}

function clickButton() {
    const cidade = document.querySelector(".input-city").value;
    searchCity(cidade);
}

