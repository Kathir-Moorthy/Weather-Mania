import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
    const [fadeIn, setFadeIn] = useState(false); // State to trigger fade-in animation
    const [styles, setStyles] = useState({
        headingStyle: {
            fontSize: "2.5rem",
            marginBottom: "1rem",
            fontWeight: "bold",
            opacity: 0, // Initial opacity for fade-in
            transform: "translateY(-20px)", // Initial position for fade-in
            transition: "opacity 0.8s ease, transform 0.8s ease",
        },
        taglineStyle: {
            fontSize: "1.2rem",
            fontStyle: "italic",
            marginBottom: "2rem",
            opacity: 0, // Initial opacity for fade-in
            transform: "translateY(-20px)", // Initial position for fade-in
            transition: "opacity 0.8s ease, transform 0.8s ease",
        },
        tabStyle: {
            padding: "0.75rem 2rem",
            borderRadius: "10px",
            textDecoration: "none",
            color: "#fff",
            backgroundColor: "#007BFF",
            fontSize: "1.1rem",
            fontWeight: "bold",
            opacity: 0, // Initial opacity for fade-in
            transform: "translateY(-20px)", // Initial position for fade-in
            transition: "opacity 0.8s ease, transform 0.8s ease",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        },
    });

    const applyResponsiveStyles = () => {
        if (window.innerWidth <= 768) {
            setStyles((prevStyles) => ({
                ...prevStyles,
                headingStyle: {
                    ...prevStyles.headingStyle,
                    fontSize: "2rem",
                },
                taglineStyle: {
                    ...prevStyles.taglineStyle,
                    fontSize: "1rem",
                },
                tabStyle: {
                    ...prevStyles.tabStyle,
                    fontSize: "0.9rem",
                    padding: "0.5rem 1.5rem",
                },
            }));
        } else {
            setStyles((prevStyles) => ({
                ...prevStyles,
                headingStyle: {
                    ...prevStyles.headingStyle,
                    fontSize: "2.5rem",
                },
                taglineStyle: {
                    ...prevStyles.taglineStyle,
                    fontSize: "1.2rem",
                },
                tabStyle: {
                    ...prevStyles.tabStyle,
                    fontSize: "1.1rem",
                    padding: "0.75rem 2rem",
                },
            }));
        }
    };

    useEffect(() => {
        window.addEventListener("resize", applyResponsiveStyles);
        applyResponsiveStyles(); // Apply styles initially

        // Trigger fade-in animation on mount
        setTimeout(() => {
            setFadeIn(true);
        }, 100);

        return () => window.removeEventListener("resize", applyResponsiveStyles);
    }, []);

    return (
        <div
            style={{
                ...homeContainer,
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
        >
            <h1
                style={{
                    ...styles.headingStyle,
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                }}
            >
                Welcome to Weather-Mania
            </h1>
            <p
                style={{
                    ...styles.taglineStyle,
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                }}
            >
                "Your ultimate weather companion, wherever you go!"
            </p>
            <div
                style={{
                    ...tabsContainer,
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
            >
                <Link
                    to="/search-weather"
                    style={{
                        ...styles.tabStyle,
                        opacity: fadeIn ? 1 : 0,
                        transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#007BFF")
                    }
                >
                    Search Weather
                </Link>
                <Link
                    to="/my-weather"
                    style={{
                        ...styles.tabStyle,
                        opacity: fadeIn ? 1 : 0,
                        transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                    }}
                    onMouseEnter={(e) =>
                        (e.target.style.backgroundColor = "#0056b3")
                    }
                    onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "#007BFF")
                    }
                >
                    My Weather
                </Link>
            </div>
        </div>
    );
};

const homeContainer = {
    textAlign: "center",
    padding: "1rem",
    background: "linear-gradient(135deg, #A6D8FF, #70AFFF)",
    color: "black",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};

const tabsContainer = {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
};

export default Home;