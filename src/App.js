import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ChatPage from "./components/ChatPage";
import BlogsPage from "./components/BlogsPage";
import "./App.css";
import TravelImage from "./asset/Travel3.jpg";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import EventsPage from "./components/EventsPage";
import LoginPage from "./components/LoginPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedUser = localStorage.getItem("username");
    if (storedAuth === "true" && storedUser) {
      setIsAuthenticated(true);
      setUsername(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          <Route
            path="*"
            element={
      <div
        className="app-container flex h-screen"
        style={{
          backgroundImage: `url(${TravelImage})`,
          boxShadow: "inset 0 0 0 2000px rgba(249, 173, 101, 0.55)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Sidebar isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        <div
          className={`flex-1 transition-all duration-300 p-6 pr-0 overflow-y-auto h-screen ${
            isChatOpen ? "ml-20" : "ml-10"
          }`}
          style={{ maxHeight: "100vh" }}
        >
          <div className="absolute top-0 right-0 w-9/12 h-16 flex justify-end items-center pr-6 bg-opacity-75 z-10">
                    <span className="text-white text-lg mr-3">{username}</span>
                    <FaUserCircle className="text-white text-3xl cursor-pointer" />
                    <FaSignOutAlt
                      className="text-white text-2xl ml-4 cursor-pointer"
                      onClick={handleLogout}
                      title="Logout"
                    />
                  </div>
          <Routes>
            {/* <Route path="/" element={<Navigate to="/chat" />} /> */}
            <Route path="/" element={<ChatPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
          </Routes>
        </div>
      </div>
       }
       />
     )}
     </Routes>
    </Router>
  );
}

export default App;
