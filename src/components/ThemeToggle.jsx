import { use } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = use(ThemeContext);

    return (
        <button
            onClick={toggleTheme}
            className="btn btn-md rounded-full text-xl mr-2"
        >
            {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
    );
};

export default ThemeToggle;
