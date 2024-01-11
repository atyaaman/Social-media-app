import React, { useEffect, useState } from 'react';
import './chatBot.css'; // Import your external CSS file for additional styling

function Chat() {
  const [chat, setChat] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    const objDiv = document.getElementById('messageArea');
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [chat]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const name = "shreyas";
    const request_temp = { sender: "user", sender_id: name, msg: inputMessage };

    if (inputMessage !== "") {
      setChat((prevChat) => [...prevChat, request_temp]);
      setBotTyping(true);
      setInputMessage('');
      rasaAPI(name, inputMessage);
    } else {
      window.alert("Please enter a valid message");
    }
  };

  const rasaAPI = async function handleClick(name, msg) {
    try {
      const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'charset': 'UTF-8',
        },
        credentials: "same-origin",
        body: JSON.stringify({ "sender": name, "message": msg }),
      });

      const responseData = await response.json();

      if (responseData && responseData.length > 0) {
        const temp = responseData[0];
        const recipient_id = temp["recipient_id"];
        const recipient_msg = temp["text"];

        const response_temp = { sender: "bot", recipient_id: recipient_id, msg: recipient_msg };
        setBotTyping(false);

        setChat((prevChat) => [...prevChat, response_temp]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    // ... (your imports and component definition)


    <div className="container">
      <div className="row justify-content-center">
        <div className="card">
          <div className="cardHeader">
            <h1>Fun Bot</h1>
            {botTyping && <h6>Bot Typing....</h6>}
          </div>
          <div className="cardBody" id="messageArea">
            <div className="msgarea">
              {chat.map((user, key) => (
                <div key={key} className={user.sender === 'bot' ? 'msgalignstart' : 'msgalignend'}>
                  {user.sender === 'bot' ? (
                    <>
                      <div className="botIcon" />
                      <div className="botmsgContainer">
                        <h5 className="botmsg">{user.msg}</h5>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="usermsgContainer">
                        <h5 className="usermsg">{user.msg}</h5>
                      </div>
                      <div className="userIcon" />
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="cardFooter">
            <form onSubmit={handleSubmit}>
              <input
                onChange={(e) => setInputMessage(e.target.value)}
                value={inputMessage}
                type="text"
                className="msginp"
                placeholder="Type a message..."
              />
              <button type="submit" className="circleBtn">
                <div className="sendBtn" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Chat;
