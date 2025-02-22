import React from "react";
import { FaComments, FaShareAlt, FaBell, FaArrowLeft } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";


const Sidebar = ({ isChatOpen, setIsChatOpen }) => {
  const location = useLocation();
  // const [isChatOpen, setIsChatOpen] = useState(location.pathname === "/chat");


  return (
    <div className="relative">
      {/* Sidebar */}
      <div className="w-16 text-white h-screen fixed left-0 top-0 flex flex-col items-center pt-6 bg-gray-800">
        {/* Sidebar Menu */}
        <ul>
          <li
            className={`flex items-center justify-center w-full p-4 cursor-pointer 
              ${location.pathname === "/chat" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setIsChatOpen(true)}
          >
            <Link to="/chat">
              <FaComments className="text-xl" />
            </Link>
          </li>
          <li
            className={`flex items-center justify-center w-full p-4 cursor-pointer 
              ${location.pathname === "/share" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setIsChatOpen(false)}
          >
            <Link to="/share">
              <FaShareAlt className="text-xl" />
            </Link>
          </li>
          <li
            className={`flex items-center justify-center w-full p-4 cursor-pointer 
              ${location.pathname === "/notifications" ? "bg-gray-700" : "hover:bg-gray-700"}`}
            onClick={() => setIsChatOpen(false)}
          >
            <Link to="/notifications">
              <FaBell className="text-xl" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Chat Drawer (Only opens when Chat is active) */}
      {isChatOpen && location.pathname === "/chat" && (
        <div
          className="chat-drawer fixed left-16 top-0 h-[100vh] w-72 text-white shadow-lg p-4 rounded-2xl mt-5"
          style={{ backgroundColor: "#a8a29e" }}
        >
          <div className="flex justify-between items-center mb-4">
            {/* Close Button */}
            <button onClick={() => setIsChatOpen(false)}>
              <FaArrowLeft className="text-xl hover:text-gray-400" />
            </button>
          </div>
          <h2 className="text-lg font-bold">Chat History</h2>
          <ul className="space-y-2">
            <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">Chat 1</li>
            <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">Chat 2</li>
            <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">Chat 3</li>
            <li className="p-2 bg-gray-700 rounded cursor-pointer hover:bg-gray-600">Chat 4</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
