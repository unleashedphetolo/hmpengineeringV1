import React, { useState } from 'react';
import '../styles/ChatBox.css';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa'; // Import icons from react-icons library

const ChatBox = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showChatBox, setShowChatBox] = useState(false);

  const handleSendMessage = (channel) => {
    // Basic validation
    if (!name.trim()) {
      setIsNameValid(false);
      return;
    } else {
      setIsNameValid(true);
    }

    if (!validateEmail(email)) {
      setIsEmailValid(false);
      return;
    } else {
      setIsEmailValid(true);
    }

    let messageContent = `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `;

    let subject = 'Message from ChatBox';

    if (channel === 'whatsapp') {
      // Open WhatsApp link
      window.location.href = `https://wa.me/27735051204?text=${encodeURIComponent(
        `${subject}%0A${messageContent}`
      )}`;
    } else if (channel === 'email') {
      // Open default email client
      window.location.href = `mailto:info@hmpengineering.co.za?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(messageContent)}`;
    }
  };

  const validateEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  return (
    <div>
     <button
  className="open-chat-button"
  onClick={toggleChatBox}
  style={{
    marginTop: '200px',
    padding: '10px 20px',
    borderRadius: '50px',
    border: 'none',
    backgroundColor: 'green',  // Use your preferred futuristic color
    color: '#fff',              // Text color
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Add a subtle shadow
    transition: 'background-color 0.3s ease-in-out',  // Smooth transition
    animation: 'pulse 1.5s infinite',  // Pulsating animation
    marginLeft: '128px',
  }}
  // Hover effect
  onMouseEnter={(e) => {
    e.target.style.backgroundColor = 'green';  // Change color on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.backgroundColor = 'green';  // Revert to original color
  }}
>
  Open Chat
</button>

      {showChatBox && (
        <div className="chat-box-container">
          <form className="contact-form">
            <input
              type="text"
              className={`contact-input ${!isNameValid ? 'invalid' : ''}`}
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {!isNameValid && <p className="error-message">Please enter your name</p>}
            <input
              type="email"
              className={`contact-input ${!isEmailValid ? 'invalid' : ''}`}
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && <p className="error-message">Please enter a valid email</p>}
            <textarea
              className="contact-message"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="contact-buttons">
              <button
                type="button"
                className="contact-button"
                onClick={() => handleSendMessage('whatsapp')}
              >
                <FaWhatsapp className="icon" /> Chat via WhatsApp
              </button>
              <button
                type="button"
                className="contact-button"
                onClick={() => handleSendMessage('email')}
              >
                <FaEnvelope className="icon" /> Send Email
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
