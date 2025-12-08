import { Metadata } from 'next';
import React from 'react';
import Login from '@/components/pages/p-auth/Login';


export const metadata: Metadata = {
    title: 'Login',
    description: "Login to the Reshub residence group System with credentials",
}


const LoginStudent = () => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4"
            style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            }}
        >
            <Login />
        </section >
    );
};

export default LoginStudent;
