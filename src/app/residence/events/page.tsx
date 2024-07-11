import type { Metadata } from 'next';
import React from 'react';
import Events from '@/components/pages/p-events/Events';
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


async function fetchEvents(): Promise<Event[]> {
    try {
        const response = await axiosInstance.get('/Events');
        return response.data.$values;
    } catch (error) {
        return []
    }
}

const EventPage = async () => {
    const events = await fetchEvents();

    return (
        <section className="flex min-h-screen flex-column items-center flex-col pt-20 px-8">
            <Events events={events} />
        </section>
    );
};

export default EventPage;