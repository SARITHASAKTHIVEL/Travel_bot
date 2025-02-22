import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/sidebar";
import ChatPage from "./components/ChatPage";
import SharePage from "./components/SharePage";
import NotificationsPage from "./components/NotificationPage";
import "./App.css";
import TravelImage from "./asset/Travel.jpg";
import { FaUserCircle } from "react-icons/fa";


function App() {
  const [isChatOpen, setIsChatOpen] = useState(true);
  return (
    <Router>
      <div className="app-container flex h-screen"
      style={{ backgroundImage: `url(${TravelImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100vw",
     }}>
        <Sidebar isChatOpen={isChatOpen} setIsChatOpen={setIsChatOpen} />
        <div className={`flex-1 transition-all duration-300 p-6 ${
            isChatOpen ? "ml-52" : "ml-20"
          }`}>  
          <div className="absolute top-0 right-0 w-9/12 h-16 flex justify-end items-center pr-6  bg-opacity-75 z-10">
            <FaUserCircle className="text-white text-3xl cursor-pointer" />
          </div>
          <Routes>
          <Route path="/" element={<Navigate to="/chat" />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
