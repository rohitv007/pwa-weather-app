const fetchWeather = async (query) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  );
  const data = await res.json();
  return data;
};

const getCurrentLocationWeather = async (coords) => {
  const { latitude, longitude } = coords;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
  );
  const data = await res.json();
  return data;
};

export { fetchWeather, getCurrentLocationWeather };
