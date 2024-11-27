import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SearchWeather from "./pages/SearchWeather";
import MyWeather from "./pages/MyWeather";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { WeatherContextProvider } from "./context/WeatherContext"; // Updated import path and name

const App = () => {
    return (
        <WeatherContextProvider>
            <Router>
                {/* Flexbox container for layout */}
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

// Main content style to grow and take available space
const contentStyle = {
    flex: 1, 
};

export default App;