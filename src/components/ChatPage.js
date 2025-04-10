
import React, { useState } from "react";
import { FaMicrophone, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; 
import rehypeRaw from "rehype-raw";


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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text }),
        
      });
  
      const data = await response.json();
      // console.log("Bot reply text:", data.data.answer);

  
      if (response.ok && data.status === "success") {
        const botMessage = {
          text: data.data.answer,
          sender: "bot",
          locations: data.data.locations || [], // add this!
        };
        setMessages((prev) => [...prev, botMessage]);
  
        if (isVoice) {
          speak(data.data.answer);
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
    <div className="h-full flex flex-col px-2 sm:px-20 lg:px-40 xl:px-80">
      {/* Chat Messages */}
      <div className="flex-1  p-4 rounded-lg">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-6 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
          <span
            className={`inline-block px-4 py-3 rounded-lg ${
              msg.sender === "user" ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}>{msg.text}
              
            </ReactMarkdown>
          </span>
      
          {/* Show locations if bot message includes them */}
          {msg.sender === "bot" && msg.locations?.length > 0 && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {msg.locations && msg.locations.map((loc, locIndex) => (
                <div
                  key={locIndex}
                  className="bg-white shadow-md border rounded-lg overflow-hidden"
                >
                  {loc.image_url && (
                    <img
                      src={loc.image_url}
                      alt={loc.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-3">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}>
                    {loc.name}
                  </ReactMarkdown>
                    <a
                      href={loc.map_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline text-sm"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        ))}
        {loading && <div className="text-gray-500 text-center mt-2">Bot is typing...</div>}
      </div>

      {/* Input Section */}
      <div className="mb-10 flex items-center">
        <div className="relative w-full">
          <textarea
            className="w-full flex-1 p-4 border rounded-lg resize-none"
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
          className="ml-2 mb-2 px-5 py-4 bg-gray-900 text-white rounded-lg whitespace-nowrap"
          onClick={() => handleSendMessage(input)}
          disabled={loading}
        >
          
          {loading ? "Sending..." : <FaPaperPlane/>}
        </button>
        
      </div>
    </div>
  );
};

export default ChatPage;
