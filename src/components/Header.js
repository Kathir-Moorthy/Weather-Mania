import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [fadeIn, setFadeIn] = useState(false); // State to trigger animation

    // State to track current styles
    const [styles, setStyles] = useState({
        logoStyle: {
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            transition: "all 0.3s ease",
        },
        titleStyle: {
            fontSize: "1.5rem",
            fontWeight: "bold",
            margin: 0,
            transition: "all 0.3s ease",
        },
        linkStyle: {
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            textDecoration: "none",
            color: "#fff",
            fontSize: "1rem",
            fontWeight: "bold",
            transition: "all 0.3s ease",
        },
    });

    // Function to apply responsive styles
    const applyResponsiveStyles = () => {
        if (window.innerWidth <= 768) {
            setStyles({
                logoStyle: {
                    ...styles.logoStyle,
                    width: "40px",
                    height: "40px",
                },
                titleStyle: {
                    ...styles.titleStyle,
                    fontSize: "1.2rem",
                },
                linkStyle: {
                    ...styles.linkStyle,
                    fontSize: "0.8rem",
                    padding: "0.4rem 0.8rem",
                },
            });
        } else {
            setStyles({
                logoStyle: {
                    ...styles.logoStyle,
                    width: "50px",
                    height: "50px",
                },
                titleStyle: {
                    ...styles.titleStyle,
                    fontSize: "1.5rem",
                },
                linkStyle: {
                    ...styles.linkStyle,
                    fontSize: "1rem",
                    padding: "0.5rem 1rem",
                },
            });
        }
    };

    // Add event listener on component mount
    useEffect(() => {
        window.addEventListener("resize", applyResponsiveStyles);
        applyResponsiveStyles(); // Apply styles initially

        // Trigger fade-in animation
        setTimeout(() => {
            setFadeIn(true);
        }, 100);

        return () => window.removeEventListener("resize", applyResponsiveStyles); // Cleanup
    }, []);

    return (
        <header
            style={{
                ...headerStyle,
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
        >
            <div style={logoContainer}>
                <img
                    src="/logo.png"
                    alt="Weather-Mania Logo"
                    style={{
                        ...styles.logoStyle,
                        opacity: fadeIn ? 1 : 0,
                        transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                    }}
                />
                <h1
                    style={{
                        ...styles.titleStyle,
                        opacity: fadeIn ? 1 : 0,
                        transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                    }}
                >
                    Weather-Mania
                </h1>
            </div>
            <nav
                style={{
                    ...navStyle,
                    opacity: fadeIn ? 1 : 0,
                    transform: fadeIn ? "translateY(0)" : "translateY(-20px)",
                    transition: "opacity 0.8s ease, transform 0.8s ease",
                }}
            >
                <Link
                    to="/"
                    style={styles.linkStyle}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                    Home
                </Link>
                <Link
                    to="/search-weather"
                    style={styles.linkStyle}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                    Search Weather
                </Link>
                <Link
                    to="/my-weather"
                    style={styles.linkStyle}
                    onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                >
                    My Weather
                </Link>
            </nav>
        </header>
    );
};

// General styles for header and navigation
const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky", // Ensures the header sticks to the top of the viewport
    top: "0",
    padding: "1rem 2rem",
    background: "linear-gradient(90deg, #56CCF2, #2F80ED)",
    color: "black",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    zIndex: "1000",
};

const logoContainer = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
};

const navStyle = {
    display: "flex",
    gap: "1rem",
};

export default Header;