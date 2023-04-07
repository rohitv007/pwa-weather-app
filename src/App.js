import React, { useState, useEffect } from "react";
import { fetchWeather, getCurrentLocationWeather } from "./api/getWeather";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((pos) => {
        (async function () {
          // console.log(pos.coords);
          const data = await getCurrentLocationWeather(pos.coords);
          setWeather(data);
          // console.log(data);
        })();
      });
    }
  }, []);

  const search = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      if (data.main) {
        // console.log(data);
        setWeather(data);
      } else {
        setWeather({});
        alert(data.message);
      }
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search City"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {weather.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp)}
            {/* {weather.main.temp} */}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
            <p>Humidity - {weather.main.humidity}%</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
