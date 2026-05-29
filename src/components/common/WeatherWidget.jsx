import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "59f598e860733fb19ae67d1813bd2f6d";

const WeatherWidget = () => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&units=metric&appid=${API_KEY}`
      )
      .then((res) => {
        const temp = Math.round(res.data.main.temp);
        const desc = res.data.weather[0].description;
        const descCap = desc.charAt(0).toUpperCase() + desc.slice(1);
        setWeather(`🌤 Hyderabad ${temp}°C, ${descCap}`);
      })
      .catch(() => {
        setWeather("Weather unavailable");
      });
  }, []);

  return <div className="weather-widget">{weather}</div>;
};

export default WeatherWidget;
