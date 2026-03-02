console.log("AAAAAAAAAAAAAAAAAAAAAAAA")

const express = require("express");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const app = express();

app.use(express.static("public"));

const groq = new Groq({
    apiKey: process.env.API_KEY_IA
});


app.get("/clima", async (req, res) => {

    const cidade = req.query.cidade;

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.API_KEY}&units=metric&lang=pt_br`
    );

    const data = await response.json();

    res.json(data);
});


app.get("/resposta", async (req, res) => {

    const { temp, clima, cidade } = req.query;

    const respostaIA =
        await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content:
                        `Em ${cidade} está ${temp}°C com ${clima}. Que roupa devo usar?`
                }
            ]
        });

    res.json({
        resposta:
            respostaIA.choices[0].message.content
    });
});


app.listen(3000, () => {
    console.log("✅ Servidor rodando em http://localhost:3000");
});