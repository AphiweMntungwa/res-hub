import type { Metadata } from 'next';
import React from 'react';
import ChatList from '@/components/pages/p-inbox/ChatList';

export const metadata: Metadata = {
    title: 'Inbox',
    description: "Chat messaging platform for the residence",
}


interface InboxProps {
    // You can define any props if needed
}

const Inbox: React.FC<InboxProps> = (props) => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-8">
            <ChatList />
        </section>
    );
};

export default Inbox;
