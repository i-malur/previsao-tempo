require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.static("public"));

app.get("/clima", async (req, res) => {
  const cidade = req.query.cidade;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${process.env.API_KEY}&units=metric&lang=pt_br`
  );

  const data = await response.json();
  res.json(data);
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});