import React, { useState, useEffect } from 'react';
import axiosInstance from "../../axiosConfig";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx"; // Załóż, że ścieżka jest prawidłowa
import "../styles/UserMessages.css"
const UserMessages = () => {
    const [messages, setMessages] = useState([]);
    const [activeReplyId, setActiveReplyId] = useState(null); // Stan dla ID aktywnej wiadomości do odpowiedzi
    const [replyContent, setReplyContent] = useState(''); // Stan dla treści odpowiedzi

    useEffect(() => {
        const userId = localStorage.getItem('userId'); // Pobierz userId z localStorage
        const fetchMessages = async () => {
            try {
                const response = await axiosInstance.get(`/api/messages/user/${userId}`);
                console.log('Otrzymane wiadomości:', response.data); // Logowanie otrzymanych danych
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages for user', error);
            }
        };

        fetchMessages();
    }, []); // Pusta tablica zależności oznacza, że efekt uruchomi się tylko raz po montażu komponentu

    const sendReply = async (messageId) => {
        if (!replyContent.trim()) return;

        // Znajdź oryginalną wiadomość, aby ustalić, do którego biznesu należy wysłać odpowiedź
        const originalMessage = messages.find(m => m.messageId === messageId);
        if (!originalMessage) {
            console.error('Original message not found');
            return;
        }

        try {
            await axiosInstance.post('/api/messages/send', {
                senderUserId: localStorage.getItem('userId'), // Nadawca odpowiedzi, czyli zalogowany użytkownik
                receiverBusinessId: originalMessage.senderBusinessId, // Odbiorca odpowiedzi, czyli biznes od którego przyszła oryginalna wiadomość
                messageContent: replyContent,
                replyToMessageId: messageId, // Identyfikator wiadomości, na którą jest to odpowiedź
            });

            alert('Odpowiedź została wysłana.');
            setReplyContent('');
            setActiveReplyId(null); // Ukryj formularz odpowiedzi po wysłaniu
        } catch (error) {
            console.error('Error sending reply:', error);
        }
    };


    return (
        <div className="page-container">
            <Header/>
            <div className="messages-container">
                <h2>Wiadomości</h2>
                {messages.length > 0 ? (
                    <ul className="messages-list">
                        {messages.map((message) => (
                            <li key={message.messageId} className="message-item">
                                <p className="message-sender">Od: {message.senderBusinessId ? `Biznes ${message.senderBusinessId}` : `Użytkownik ${message.senderUserId}`}</p>
                                <p className="message-content">Treść: {message.messageContent}</p>
                                <button className="message-action" onClick={() => setActiveReplyId(activeReplyId === message.messageId ? null : message.messageId)}>
                                    {activeReplyId === message.messageId ? 'Anuluj' : 'Odpowiedz'}
                                </button>
                                {activeReplyId === message.messageId && (
                                    <div className="reply-container">
                    <textarea
                        className="reply-textarea"
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Wpisz swoją odpowiedź tutaj..."
                    />
                                        <button className="reply-button" onClick={() => sendReply(message.messageId)}>Wyślij Odpowiedź</button>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-messages">Brak wiadomości.</p>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default UserMessages;
