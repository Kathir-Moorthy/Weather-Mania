import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherContextProvider = ({ children }) => {
    const [myWeather, setMyWeather] = useState([]);

    // Add weather card to the list
    const addToMyWeather = (weather) => {
        if (!myWeather.find((w) => w.id === weather.id)) {
            setMyWeather([...myWeather, weather]);
            alert(`${weather.name} added to My Weather.`);
        } else {
            alert(`${weather.name} is already in My Weather.`);
        }
    };

    // Remove weather card from the list
    const removeFromMyWeather = (id) => {
        const updatedWeather = myWeather.filter((w) => w.id !== id);
        if (updatedWeather.length === myWeather.length) {
            alert("Card not found in My Weather!");
            return;
        }
        setMyWeather(updatedWeather);
        alert('Weather card removed from My Weather.');
    };

    return (
        <WeatherContext.Provider
            value={{
                myWeather,
                addToMyWeather,
                removeFromMyWeather,
            }}
        >
            {children}
        </WeatherContext.Provider>
    );
};