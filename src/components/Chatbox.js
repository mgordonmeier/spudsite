import React, { useState } from 'react';

// Mock AI responses - replace with actual API integration
const getAIResponse = async (message) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const responses = {
    hello: "Hi there! I'm Spuddie, your friendly potato assistant!",
    help: "I can help you navigate the site, chat with you, or just keep you company!",
    default: "That's interesting! Tell me more about that.",
    bye: "Goodbye! Come back soon!",
  };

  const messageLower = message.toLowerCase();
  
  if (messageLower.includes('hello') || messageLower.includes('hi')) {
    return responses.hello;
  } else if (messageLower.includes('help')) {
    return responses.help;
  } else if (messageLower.includes('bye')) {
    return responses.bye;
  }
  
  return responses.default;
};

function Chatbox({ onClose, style }) {
  const [userMessage, setUserMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleUserInput = async () => {
    if (!userMessage.trim()) return;
    
    // Add user message
    setChatMessages(prev => [...prev, { text: userMessage, user: true }]);
    const currentMessage = userMessage;
    setUserMessage('');
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Get AI response
      const response = await getAIResponse(currentMessage);
      
      // Add AI response
      setChatMessages(prev => [...prev, { text: response, user: false }]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
      setChatMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble responding right now.", 
        user: false,
        error: true
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserInput();
    }
  };

  return (
    <div className="card specialCard text-center" style={style}>
      <div className="card-header d-flex justify-content-between align-items-center p-3">
        <strong>Chat with Spuddie</strong>
        <button className="btn btn-danger btn-sm" onClick={onClose}>×</button>
      </div>
      <div className="card-body" style={{ height: '300px', overflowY: 'auto' }}>
        <div className="chat-messages">
          {chatMessages.map((message, index) => (
            <div 
              key={index} 
              className={`message ${message.user ? 'user-message' : 'chatbot-message'} mb-2`}
              style={{
                textAlign: message.user ? 'right' : 'left',
                padding: '8px',
                backgroundColor: message.user ? '#007bff' : '#e9ecef',
                color: message.user ? 'white' : 'black',
                borderRadius: '10px',
                maxWidth: '80%',
                marginLeft: message.user ? 'auto' : '0'
              }}
            >
              {message.text}
            </div>
          ))}
          {isTyping && (
            <div className="typing-indicator">
              Spuddie is typing...
            </div>
          )}
        </div>
      </div>
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            className="btn btn-primary" 
            onClick={handleUserInput}
            disabled={isTyping}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbox;