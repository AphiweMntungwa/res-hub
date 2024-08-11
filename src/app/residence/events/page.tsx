import type { Metadata } from 'next';
import React from 'react';
import Events from '@/components/pages/p-events/Events';
import { cookies } from 'next/headers';
import axiosInstance from '@/lib/axiosInstance';

export const metadata: Metadata = {
    title: 'Events',
    description: "Res events platform for the specific residence",
}

interface Event {
    id: number;
    eventName: string;
    dateOfEvent: string;
    type: string;
}

async function fetchEvents(token : string | undefined): Promise<Event[]> {
    try {
        const response = await axiosInstance.get('/Events', {headers : {
            'Authorization': `Bearer ${token}`
        }});
        return response.data.$values;
    } catch (error) {
        console.log(error)
        return []
    }
}

const EventPage = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt-token')?.value;
    const events = await fetchEvents(token);

    return (
        <section className="flex min-h-screen flex-column items-center flex-col pt-20 px-8">
            <Events events={events} />
        </section>
    );
};

export default EventPage;