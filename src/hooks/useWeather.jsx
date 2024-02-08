import { useState, useEffect } from "react";

const useWeather = () => {
  const [weatherData, setWeatherData] = useState({
    location: "",
    climate: "",
    temperature: "",
    maxTemperature: "",
    minTemperature: "",
    humidity: "",
    cloudPercentage: "",
    wind: "",
    time: "",
    longitude: "",
    latitude: "",
  });
  const [loading, setLoading] = useState({
    state: false,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);

  

  useEffect(() => {
    const fetchWeatherData = async (latitude, longitude) => {
        try {
          setLoading({
            ...loading,
            state: true,
            message: "Fetching Weather Data...",
          });
          const response = await fetch(``);
          if (!response.ok) {
            const errorMessage = `Fetching weather data failed : ${response.status}`;
            throw new Error(errorMessage);
          }
    
          const data = await response.json(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
              import.meta.env.VITE_WEATHER_API_KEY
            }&units=metric`
          );
          console.log(data);
          const updateWeatherData = {
            ...weatherData,
            location: data?.name,
            climate: data?.weather[0]?.main,
            temperature: data?.main?.temp,
            maxTemperature: data?.main?.temp_max,
            minTemperature: data?.main?.temp_min,
            humidity: data?.main?.humidity,
            cloudPercentage: data?.clouds?.all,
            wind: data?.wind?.speed,
            time: data?.dt,
            longitude: longitude,
            latitude: latitude,
          };
          setWeatherData(updateWeatherData);
        } catch (error) {
          setErrorMessage(error);
        } finally {
          setLoading({
            ...loading,
            state: false,
            message: "Fetching Weather Data",
          });
        }
      };
    setLoading({ ...loading, loading: true, message: "Finding Location..." });
    navigator.geolocation.getCurrentPosition(function (position) {
      fetchWeatherData(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  return { weatherData, errorMessage, loading };
};
export default useWeather;
