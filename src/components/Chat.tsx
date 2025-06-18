// src/components/MemeChat.tsx
import React, { useState, useEffect, useRef } from 'react';

interface ChatMessage {
    id: string;
    text: string;
    timestamp: string;
}

export const ChatComponent: React.FC<{ coinId: string }> = ({ coinId }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const chatRef = useRef<HTMLDivElement>(null);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/chat/${coinId}`);
            if (!response.ok) throw new Error('Failed to fetch messages');
            const data = await response.json();
            setMessages(data.replies);
        } catch (error) {
            console.error('Error fetching chat messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages(); // Initial fetch
        const interval = setInterval(fetchMessages, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, [coinId]);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="fixed right-0 top-12 bottom-0 max-h-full w-80 bg-white/10 backdrop-blur-sm text-white p-4 overflow-hidden flex flex-col">
            <h3 className="text-xl font-bold mb-4">pump.fun Chat</h3>

            <div
                ref={chatRef}
                className="flex flex-col flex-1 overflow-y-auto mb-4 custom-scrollbar gap-4"
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className="bg-amber-900/50 rounded-lg p-3"
                    >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs text-gray-300">
                            {new Date(message.timestamp).toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};