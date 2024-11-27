import React, { useEffect, useState } from "react";

const Footer = () => {
    const [fadeIn, setFadeIn] = useState(false); // State to control animation

    useEffect(() => {
        // Trigger fade-in animation after component mounts
        const timer = setTimeout(() => {
            setFadeIn(true);
        }, 100);

        return () => clearTimeout(timer); // Cleanup timer on unmount
    }, []);

    return (
        <footer
            style={{
                ...footerStyle,
                opacity: fadeIn ? 1 : 0,
                transform: fadeIn ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
            }}
        >
            <p>&copy; 2024 Weather-Mania. All rights reserved.</p>
        </footer>
    );
};

// Footer style without fixed position
const footerStyle = {
    textAlign: "center",
    padding: "1rem",
    background: "linear-gradient(90deg, #2F80ED, #56CCF2)",
    color: "black",
    fontSize: "0.9rem",
    boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
};

export default Footer;