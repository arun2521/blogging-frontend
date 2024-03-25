import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import Dashboard from "./Components/Dashboard/Dashboard";
// import Login from './Components/Login/Login';
// import Register from './Components/Register/Register.jsx';

export const config = {
  endpoint: `https://blogging-backend-0jtd.onrender.com/api`,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false); // Set loading to false after checking token
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="App">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            {isLoggedIn ? (
              <Dashboard handleLogout={handleLogout} />
            ) : (
              <NavBar handleLogin={handleLogin} />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default App;
