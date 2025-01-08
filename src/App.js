import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, serverTimestamp, doc, orderBy, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FaRocket } from "react-icons/fa";
import "./App.css";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBThaaDf3Xw9VPxfw_n1_xDBW7_bd-g8Vo",
  authDomain: "psichat-2.firebaseapp.com",
  projectId: "psichat-2",
  storageBucket: "psichat-2.firebasestorage.app",
  messagingSenderId: "415493459871",
  appId: "1:415493459871:web:d121343d8fd0d3e126b7aa",
  measurementId: "G-BZR5QTB6TM",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData.slice(-100)); // Limit to 100 messages
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      await addDoc(collection(db, "messages"), {
        text: input,
        createdAt: serverTimestamp(),
        user: "You", // Replace with actual user name/ID
      });
      setInput("");
      scrollToBottom();
    }
  };

  const deleteMessage = async (id) => {
    await deleteDoc(doc(db, "messages", id));
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="App">
      <header>
        <h1>Psi Chat 2.0</h1>
      </header>
      <main className="chat-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.user === "You" ? "sent" : "received"}`}
            onClick={() => document.getElementById(`details-${message.id}`).classList.toggle("visible")}
          >
            <p>{message.text}</p>
            <div id={`details-${message.id}`} className="message-details">
              <span>
                {message.createdAt
                  ? new Date(message.createdAt.seconds * 1000).toLocaleString()
                  : "Sending..."}
              </span>
              <button className="delete-button" onClick={() => deleteMessage(message.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <div ref={scrollRef}></div> {/* Scrolls to the latest message */}
      </main>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">
          <FaRocket />
        </button>
      </form>
    </div>
  );
}

export default App;
