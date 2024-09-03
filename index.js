"use strict";
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const WeatherData = require("./WeatherData");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())



app.get("/",(req,res)=>{
    res.json({"key":"TEST"});
})

app.get("/api/weather", async (req,res)=>{
    const API_KEY = process.env.API_KEY;  

    try{
        const city = req.query.name;

        const responseCurrent = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
        const responseForecast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}`);

        const current = await responseCurrent.json();
        const forecast = await responseForecast.json();

        const hours = forecast.forecast.forecastday[0].hour.map((hour)=>{
            return {hour:hour.time.split(" ")[1],hourTemp:hour.temp_c}
        })

        const weatherData = new WeatherData(current.location.name, current.current.feelslike_c,current.current.temp_c,hours)

        res.json(weatherData);
    }
    catch(err){
        res.status(500).json(err.message);
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on: ${PORT}`);
})

