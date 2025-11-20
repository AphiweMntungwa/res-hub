import type { Metadata } from 'next';
import React from 'react';
import ChatSpace from '@/components/pages/p-userchat/ChatSpace';

export const metadata: Metadata = {
    title: 'Chat',
    description: "Chat messaging platform for the residence",
}

interface UserChatProps {
    params: { userChat: string }
}

const UserChat: React.FC<UserChatProps> = (props) => {
    return (
        <section style={{paddingTop: "60px"}} className="flex min-h-screen flex-col items-center justify-between">
            <ChatSpace receiverId={props.params.userChat}  />
        </section>
    );
};

export default UserChat;
