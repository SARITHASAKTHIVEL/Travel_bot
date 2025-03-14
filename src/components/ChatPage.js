
import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (text, sender = "user", isVoice = false) => {
    if (!text.trim()) return;

    const userMessage = { text, sender };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // const response = await fetch("http://127.0.0.1:5000/ask", {
      const response = await fetch("https://server-bot-000v.onrender.com/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: text }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage = { text: data.answer, sender: "bot" };
        setMessages((prev) => [...prev, botMessage]);

        // Speak the response if the input was voice-based
        if (isVoice) {
          speak(data.answer);
        }
      } else {
        setMessages((prev) => [...prev, { text: "Error: Could not get response", sender: "bot" }]);
      }
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [...prev, { text: "Error: Something went wrong!", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition API not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      setIsListening(false);
      handleSendMessage(speechResult, "user", true);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);
  };

  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis not supported in this browser.");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevents new line
      handleSendMessage(input);
    }
  };

  return (
    <div className="h-full flex flex-col px-4 sm:px-20 lg:px-40 xl:px-80">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span
              className={`inline-block px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-500 text-center mt-2">Bot is typing...</div>}
      </div>

      {/* Input Section */}
      <div className="mt-5 flex items-center">
        <div className="relative w-full">
          <textarea
            className="w-full flex-1 p-2 border rounded-lg resize-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            name="question"
            rows="1" 
          />
          {input === "" && (
            <span
              onClick={startListening}
              className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
            >
              {isListening ? "Listening..." : <FaMicrophone className="text-xl" />}
            </span>
          )}
        </div>

        {/* Send Button */}
        
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg whitespace-nowrap"
          onClick={() => handleSendMessage(input)}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
        
      </div>
    </div>
  );
};

export default ChatPage;
