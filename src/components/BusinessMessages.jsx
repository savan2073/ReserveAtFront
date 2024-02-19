import React, { useState, useEffect } from 'react';
import axiosInstance from "../../axiosConfig"; // Upewnij się, że ścieżka jest prawidłowa dla Twojej konfiguracji axios

const BusinessMessages = () => {
    const [messages, setMessages] = useState([]);
    const [activeReplyId, setActiveReplyId] = useState(null); // Stan dla ID aktywnej wiadomości do odpowiedzi
    const [replyContent, setReplyContent] = useState(''); // Stan dla treści odpowiedzi

    useEffect(() => {
        const businessId = localStorage.getItem('businessId');
        const fetchMessages = async () => {
            try {
                const response = await axiosInstance.get(`/api/messages/business/${businessId}`);
                console.log('Otrzymane wiadomości:', response.data); // Logowanie otrzymanych danych
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching messages', error);
            }
        };

        if (businessId) {
            fetchMessages();
        }
    }, []);

    const sendReply = async (messageId) => {
        if (!replyContent.trim()) return;

        const businessId = localStorage.getItem('businessId'); // ID biznesu odpowiadającego na wiadomość
        const originalMessage = messages.find(m => m.messageId === messageId); // Znajdź oryginalną wiadomość, aby uzyskać ID nadawcy
        const receiverUserId = originalMessage.senderUserId; // ID użytkownika, który jest odbiorcą odpowiedzi

        try {
            await axiosInstance.post('/api/messages/send', {
                senderBusinessId: businessId, // Ustawiamy ID biznesu jako nadawcę odpowiedzi
                receiverUserId, // Ustawiamy ID użytkownika jako odbiorcę odpowiedzi
                messageContent: replyContent,
                replyToMessageId: messageId, // ID wiadomości, na którą jest to odpowiedź
            });

            alert('Odpowiedź została wysłana.');
            setReplyContent('');
            setActiveReplyId(null); // Ukryj formularz odpowiedzi po wysłaniu
        } catch (error) {
            console.error('Błąd podczas wysyłania odpowiedzi:', error);
        }
    };


    return (
        <div>
            <h2>Wiadomości</h2>
            {messages.length > 0 ? (
                <ul>
                    {messages.map((message) => (
                        <li key={message.messageId}>
                            <p>Message ID: {message.messageId}</p> {/* Dodane wyświetlanie messageId */}
                            <p>Od: {message.senderUserId ? `Użytkownik ${message.senderUserId}` : `Biznes ${message.senderBusinessId}`}</p>
                            <p>Treść: {message.messageContent}</p>
                            <button onClick={() => setActiveReplyId(activeReplyId === message.messageId ? null : message.messageId)}>
                                {activeReplyId === message.messageId ? 'Anuluj' : 'Odpowiedz'}
                            </button>
                            {activeReplyId === message.messageId && (
                                <div>
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Wpisz swoją odpowiedź tutaj..."
                                    />
                                    <button onClick={() => sendReply(message.messageId)}>Wyślij Odpowiedź</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak wiadomości.</p>
            )}
        </div>
    );
};

export default BusinessMessages;
