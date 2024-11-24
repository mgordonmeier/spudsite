import React, { useState } from 'react';

function Chatbox({ onClose }) {
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  // Function to handle user input and send messages to the chatbot
  const handleUserInput = () => {
    // Add your chatbot logic here to process userMessage and get a response
    const chatbotResponse = 'This is a sample response from the chatbot'; // Replace with actual chatbot response

    // Update chatMessages with user's message and chatbot's response
    setChatMessages([...chatMessages, { text: userMessage, user: true }, { text: chatbotResponse, user: false }]);

    // Clear the user input field
    setUserMessage('');
  };

  return (
    <div className="card specialCard text-center m-2" style={{ width: '20rem' }}>
      <div className="card-header m-2">
        <strong>Chatbot</strong>
        <button className="btn btn-danger btn-sm float-end" onClick={onClose}>X</button>
      </div>
      <div className="card-body">
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div key={index} className={message.user ? 'user-message' : 'chatbot-message'}>
              {message.text}
            </div>
          ))}
        </div>
        <div className="user-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleUserInput}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;