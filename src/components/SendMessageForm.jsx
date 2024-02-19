import { useState } from 'react';
import axiosInstance from "../../axiosConfig.js";
import {useLocation} from "react-router-dom";

const SendMessageForm = () => {
    const [messageContent, setMessageContent] = useState('');
    const location = useLocation();
    const receiverBusinessId = location.state?.receiverBusinessId;
    const replyToMessageId = location.state?.replyToMessageId;

    console.log(receiverBusinessId)

    const sendMessage = async (e) => {
        e.preventDefault();
        const senderUserId = localStorage.getItem('userId');
        const messageData = {
            senderUserId: senderUserId/* ID nadawcy, np. zalogowanego użytkownika */,
            receiverBusinessId: receiverBusinessId/* ID odbiorcy, np. wybranego biznesu */,
            messageContent: messageContent/* Treść wiadomości */,
            replyToMessageId: replyToMessageId
        };

        console.log("Wysyłanie wiadomości z danymi:", JSON.stringify(messageData, null, 2));

        try {
            const response = await axiosInstance.post('/api/messages/send', messageData);
            console.log("Odpowiedź z serwera:", response.data);
            setMessageContent(''); // Czyszczenie formularza po wysłaniu
            alert('Wiadomość została wysłana.'); // Informacja o sukcesie
        } catch (error) {
            console.error('Błąd podczas wysyłania wiadomości:', error);
            alert('Nie udało się wysłać wiadomości.'); // Informacja o błędzie
        }
    };


    return (
        <form onSubmit={sendMessage}>
      <textarea
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          required
      />
            <button type="submit">Wyślij Wiadomość</button>
        </form>
    );
};


export default SendMessageForm;
