import { useTheme } from "../context/ThemeContext";
import "../assets/css/components/darkMode.css";

const Container = ({ children, ...props }) => {
  const { theme } = useTheme();

  return (
    <div
      {...props}
      className={`containerDiv ${theme}`}
    >
      {children}
    </div>
  );
};

export default Container;
