import React, { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Lottie from "lottie-react";
import sunnyAnimation from "../assets/animations/sunny-animation.json";
import moonAnimation from "../assets/animations/moon-animation.json";
import cloudyAnimation from "../assets/animations/cloudy-animation.json";
import rainingAnimation from "../assets/animations/raining-animation.json";
import thunderAnimation from "../assets/animations/thunder-animation.json";
import snowAnimation from "../assets/animations/snow-animation.json";

const SearchWeather = () => {
    const { addToMyWeather } = useContext(WeatherContext);
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState("");

    const handleSearch = async () => {
        if (!city.trim()) {
            alert("Please enter a city name.");
            return;
        }

        const apiKey = "37161b8991aead2552a7c36c69e64983";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Invalid city name");
            const data = await response.json();
            setWeatherData(data);
            alert(`${data.name}, ${data.sys.country} weather data generated.`);
        } catch (error) {
            alert("Wrong city name entered.");
            setWeatherData(null);
        }
    };

    const capitalizeWords = (text) =>
        text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    const getAnimation = (weatherType) => {
        if (weatherType === "Clear") {
            const hours = new Date().getHours();
            return hours >= 6 && hours < 18 ? sunnyAnimation : moonAnimation;
        }
        switch (weatherType) {
            case "Clouds":
                return cloudyAnimation;
            case "Mist":
                return cloudyAnimation;
            case "Fog":
                return cloudyAnimation;
            case "Smoke":
                return cloudyAnimation;
            case "Rain":
                return rainingAnimation;
            case "Drizzle":
                return rainingAnimation;
            case "Thunderstorm":
                return thunderAnimation;
            case "Lightning":
                return thunderAnimation;
            case "Snow":
                return snowAnimation;
            default:
                return sunnyAnimation;
        }
    };

    const getThemeColor = (weatherType) => {
        const hours = new Date().getHours();
        const isDaytime = hours >= 6 && hours < 18;

        if (weatherType === "Clear") return isDaytime ? "#358CEE" : "#2C3E50";
        if (weatherType === "Clouds" || weatherType === "Mist" || weatherType === "Fog" || weatherType === "Smoke") return isDaytime ? "#A9A9A9" : "#34495E";
        if (weatherType === "Rain" || weatherType === "Thunderstorm" || weatherType === "Drizzle" || weatherType === "Lightning")
            return isDaytime ? "#5F6A6A" : "#1C1C1C";
        if (weatherType === "Snow") return isDaytime ? "#ADD8E6" : "#4B0082";
        return "#3498DB"; // Default color
    };

    const getLocalDateTime = (timezoneOffset) => {
        const utcTime = new Date().getTime() + new Date().getTimezoneOffset() * 60000; // UTC time in milliseconds
        const localTime = new Date(utcTime + timezoneOffset * 1000); // Adjust with city's timezone offset
        return localTime.toLocaleString("en-US", {
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", color: "#007BFF", marginBottom: "20px" }}>
                🌤️ Weather Finder 🌙
            </h1>

            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        outline: "none",
                        transition: "box-shadow 0.3s ease",
                    }}
                    onFocus={(e) => (e.target.style.boxShadow = "0 0 10px #007BFF")}
                    onBlur={(e) => (e.target.style.boxShadow = "none")}
                />
                <button
                    onClick={handleSearch}
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "#007BFF",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginLeft: "10px",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#007BFF")}
                >
                    Search
                </button>
            </div>

            {weatherData && (
                <div
                    style={{
                        backgroundColor: getThemeColor(weatherData.weather[0].main),
                        padding: "20px",
                        borderRadius: "10px",
                        color: "#fff",
                        textAlign: "center",
                        marginTop: "20px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        width: "350px",
                        margin: "20px auto",
                    }}
                >
                    <Lottie
                        animationData={getAnimation(weatherData.weather[0].main)}
                        style={{ height: "100px" }}
                    />
                    <h3>
                        {weatherData.name}, {weatherData.sys.country}
                    </h3>
                    <p>{capitalizeWords(weatherData.weather[0].description)}</p>
                    <p>Temperature: {weatherData.main.temp}°C</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                    <p>
                        <strong>Local Date & Time:</strong>{" "}
                        {getLocalDateTime(weatherData.timezone)}
                    </p>
                    <button
                        onClick={() => addToMyWeather(weatherData)}
                        style={{
                            padding: "10px",
                            backgroundColor: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
                    >
                        Add to My Weather
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchWeather;