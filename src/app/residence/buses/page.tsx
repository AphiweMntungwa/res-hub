import React from 'react';
import Buses from '@/components/pages/p-buses/Buses';
import axios from 'axios';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import axiosInstance from '@/lib/axiosInstance';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Bus Announcements',
    description: "Bus times, numbers and other bus announcements",
};

const General: React.FC = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt-token')?.value;
    if (!token) {
        redirect('/auth/login');
    }
    const response = await axiosInstance.get('/bus', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const busData = response.data.$values;

    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-8">
            <Buses busData={busData} />
        </section>
    );
};

export default General;
