"use strict";
const express = require("express");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/",(req,res)=>{
    console.log("HELLOOOOOO");
    res.json({"key":"TEST"});
})

app.get("/api/weather", async (req,res)=>{
    console.log("HELLOOO AGAIN!!!!!!")
    try{
        const city = req.query.city;
        const url = "";
        const API_KEY = process.env.API_KEY;
        const response = await fetch(`${url}${city}`);
        const data = await response.json();
        res.json(data);
    }
    catch(err){
        res.status(500).json(err);
    }
})

app.listen(PORT,()=>{
    console.log(`server is running on: ${PORT}`);
})

