import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addNativeElement } from "@canva/design";
import styles from "styles/components.css";

const socket = io('https://vartalaap-backend.onrender.com');

export const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  const onClick = () => {
    addNativeElement({
      type: "TEXT",
      children: ["Hello world!"],
    });
  };

  return (
    <div className={styles.scrollContainer}>
      <Rows spacing="2u">

        <div>
          <h1>Chat Application</h1>
          <div className={styles.chatBox}>
            {messages.map((msg, index) => (
              <div key={index} className={styles.message}>
                {msg}
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className={styles.messageForm}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className={styles.input}
            />
            <Button variant="primary" type="submit" stretch>
              Send
            </Button>
          </form>
        </div>
      </Rows>
    </div>
  );
};
