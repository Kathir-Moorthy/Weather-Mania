import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchWeather from "./pages/SearchWeather";
import MyWeather from "./pages/MyWeather";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WeatherContextProvider } from "./context/WeatherContext";

const App = () => {
    return (
        <WeatherContextProvider>
            <Router>
                <div style={appStyle}>
                    <Header />
                    <div style={contentStyle}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search-weather" element={<SearchWeather />} />
                            <Route path="/my-weather" element={<MyWeather />} />
                        </Routes>
                    </div>
                    <Footer />
                </div>
            </Router>
        </WeatherContextProvider>
    );
};

// Flexbox container to structure the app layout
const appStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh", // Ensures the app spans the full viewport height
};

// Main content style to ensure the content is between Header and Footer
const contentStyle = {
    flex: 1, // Allows the content to grow and take the remaining space
    display: "flex",
    flexDirection: "column", // Ensures content inside (like Home.js) is vertically aligned
};

export default App;