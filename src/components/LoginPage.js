// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import TravelImage from "../asset/bg.webp";

// const LoginPage = ({ setIsAuthenticated, setUsername }) => {
//   const [username, setUserInput] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (username && password) {
//       localStorage.setItem("isAuthenticated", "true");
//       localStorage.setItem("username", username);
//       setIsAuthenticated(true);
//       setUserInput(username);
//       navigate("/");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen" style={{
//         backgroundImage: `url(${TravelImage})`,
//         boxShadow: "inset 0 0 0 2000px rgba(249, 173, 101, 0.55)",
//         backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//     }}>
//       <div className="absolute top-5 left-10 text-white text-4xl font-fantasy animate-pulse">
//         ✈ Travel Chat 🌍
//       </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Username</label>
//             <input
//               type="text"
//               className="w-full px-3 py-2 border rounded-lg"
//               value={username}
//               onChange={(e) => setUserInput(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               className="w-full px-3 py-2 border rounded-lg"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
//           >
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setIsAuthenticated, setUsername }) => {
  const [username, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", username);
      setIsAuthenticated(true);
      setUserInput(username);
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 relative">
        <img
          src="./bg1.webp"
          alt="Travel Destination"
          className="h-full w-full object-cover"
        />
        <h1 className="absolute top-10 left-10 text-white text-4xl font-fantasy animate-pulse bg-black bg-opacity-50 px-4 py-2 rounded-lg">
          ✈ Travel Chat 🌍
        </h1>
      </div>

      {/* Right Section with Login Form */}
      <div className="w-1/2 flex justify-center items-center bg-gray-900">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Welcome Back!
          </h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-white font-semibold">Username</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg bg-white bg-opacity-30 backdrop-blur-md text-white placeholder-gray-200"
                value={username}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter username"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-white font-semibold">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg bg-white bg-opacity-30 backdrop-blur-md text-white placeholder-gray-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
