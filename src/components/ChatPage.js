import React, { useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a bot response!", sender: "bot" },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="h-full px-80 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex">
        <input
          type="text"
          className="flex-1 p-2 border rounded-lg"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
