function changeBackground(clima) {
    const map = {
        Clear: "sunny sky city",
        Rain: "rain city",
        Clouds: "cloudy sky",
        Snow: "snow city",
        Thunderstorm: "storm lightning",
        Drizzle: "light rain city",
        Mist: "fog city"
    };

    const termo = map[clima] || "weather city";

    document.body.style.backgroundImage =`url("https://source.unsplash.com/1920x1080/?${termo}&t=${Date.now()}")`;
}

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

    changeBackground(dados.weather[0].main);

    dataInScreen(dados);
}

function clickButton() {
    const cidade = document.querySelector(".input-city").value;
    searchCity(cidade);
}

