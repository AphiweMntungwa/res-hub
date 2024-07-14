import { Metadata } from 'next';
import React from 'react';
import Login from '@/components/pages/p-auth/Login';


export const metadata: Metadata = {
    title: 'Login',
    description: "Login to the Reshub residence group System with credentials",
  }

  
const LoginStudent = () => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-start pt-5 px-8">
            <Login />
        </section >
    );
};

export default LoginStudent;
