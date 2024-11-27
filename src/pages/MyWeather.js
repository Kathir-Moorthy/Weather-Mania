import React, { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import Lottie from "lottie-react";
import { jsPDF } from "jspdf";
import sunnyAnimation from "../assets/animations/sunny-animation.json";
import moonAnimation from "../assets/animations/moon-animation.json";
import cloudyAnimation from "../assets/animations/cloudy-animation.json";
import rainingAnimation from "../assets/animations/raining-animation.json";
import thunderAnimation from "../assets/animations/thunder-animation.json";
import snowAnimation from "../assets/animations/snow-animation.json";

const MyWeather = () => {
    const { myWeather, removeFromMyWeather } = useContext(WeatherContext);

    // Capitalize text utility
    const capitalizeWords = (text) =>
        text
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

    // Get animation based on weather type
    const getAnimation = (weatherType) => {
        if (weatherType === "Clear") {
            const hours = new Date().getHours();
            return hours >= 6 && hours < 18 ? sunnyAnimation : moonAnimation;
        }
        switch (weatherType) {
            case "Clouds":
            case "Mist":
            case "Fog":
            case "Smoke":
                return cloudyAnimation;
            case "Rain":
            case "Drizzle":
                return rainingAnimation;
            case "Thunderstorm":
            case "Lightning":
                return thunderAnimation;
            case "Snow":
                return snowAnimation;
            default:
                return sunnyAnimation;
        }
    };

    // Get theme color based on weather type
    const getThemeColor = (weatherType) => {
        const hours = new Date().getHours();
        const isDaytime = hours >= 6 && hours < 18;

        if (weatherType === "Clear") return isDaytime ? "#358CEE" : "#2C3E50";
        if (["Clouds", "Mist", "Fog", "Smoke"].includes(weatherType))
            return isDaytime ? "#A9A9A9" : "#34495E";
        if (["Rain", "Thunderstorm", "Drizzle", "Lightning"].includes(weatherType))
            return isDaytime ? "#5F6A6A" : "#1C1C1C";
        if (weatherType === "Snow") return isDaytime ? "#ADD8E6" : "#4B0082";
        return "#3498DB"; // Default color
    };

    // Get local date and time based on timezone offset
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

    // Download weather report as PDF with additional information
    const downloadReport = (data) => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`${data.name}, ${data.sys.country} - Weather Report`, 10, 20);
        doc.text(`Local Date & Time: ${getLocalDateTime(data.timezone)}`, 10, 30);

        doc.setFontSize(12);
        doc.text(`Weather: ${capitalizeWords(data.weather[0].description)}`, 10, 50);
        doc.text(`Temperature: ${data.main.temp}°C`, 10, 60);
        doc.text(`Feels Like: ${data.main.feels_like}°C`, 10, 70);
        doc.text(`Humidity: ${data.main.humidity}%`, 10, 80);
        doc.text(`Wind Speed: ${data.wind.speed} m/s`, 10, 90);
        doc.text(`Pressure: ${data.main.pressure} hPa`, 10, 100);
        doc.text(`Visibility: ${data.visibility / 1000} km`, 10, 110);
        doc.text(`Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`, 10, 120);
        doc.text(`Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`, 10, 130);
        doc.text(`Cloud Coverage: ${data.clouds.all}%`, 10, 140);

        doc.text("Coordinates:", 10, 160);
        doc.text(`Latitude: ${data.coord.lat}`, 10, 170);
        doc.text(`Longitude: ${data.coord.lon}`, 10, 180);

        doc.save(`${data.name}_Weather_Report.pdf`);
    };

    return (
        <div style={{ padding: "20px", textAlign: "center" }}>
            <h1 style={{ fontSize: "2rem", color: "#007BFF", marginBottom: "20px" }}>
                🌦️ My Weather Cards 🌏
            </h1>

            {myWeather.length === 0 ? (
                <p style={{ fontSize: "1rem", color: "#555" }}>
                    No weather cards added yet. Search for a city to add weather cards!
                </p>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "20px",
                        justifyContent: "center",
                        justifyItems: "center",
                    }}
                >
                    {myWeather.map((weather) => (
                        <div
                            key={weather.id}
                            style={{
                                backgroundColor: getThemeColor(weather.weather[0].main),
                                padding: "20px",
                                borderRadius: "10px",
                                color: "#fff",
                                textAlign: "center",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                                maxWidth: "300px",
                                margin: "0 auto",
                            }}
                        >
                            <Lottie
                                animationData={getAnimation(weather.weather[0].main)}
                                style={{ height: "100px" }}
                            />
                            <h3>
                                {weather.name}, {weather.sys.country}
                            </h3>
                            <p>{capitalizeWords(weather.weather[0].description)}</p>
                            <p>Temperature: {weather.main.temp}°C</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                            <p>Wind Speed: {weather.wind.speed} m/s</p>
                            <p>
                                <strong>Local Date & Time:</strong> {getLocalDateTime(weather.timezone)}
                            </p>
                            <div style={{ marginTop: "15px" }}>
                                <button
                                    onClick={() => downloadReport(weather)}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#28a745",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        marginRight: "10px",
                                        transition: "background-color 0.3s",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.target.style.backgroundColor = "#218838")
                                    }
                                    onMouseOut={(e) =>
                                        (e.target.style.backgroundColor = "#28a745")
                                    }
                                >
                                    Download Report
                                </button>
                                <button
                                    onClick={() => removeFromMyWeather(weather.id)}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        transition: "background-color 0.3s",
                                    }}
                                    onMouseOver={(e) =>
                                        (e.target.style.backgroundColor = "#c82333")
                                    }
                                    onMouseOut={(e) =>
                                        (e.target.style.backgroundColor = "#dc3545")
                                    }
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyWeather;