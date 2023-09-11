import { useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Replace with your server URL

const SocketClient = ({ onMessageReceived }) => {
    useEffect(() => {
        // Listen for incoming messages from the server
        socket.on('message', (data) => {
            onMessageReceived(data);
        });

        return () => {
            // Clean up the socket connection when the component unmounts
            socket.disconnect();
        };
    }, [onMessageReceived]);

    return null;
};

export default SocketClient;
