import type { Metadata } from 'next';
import React from 'react';
import axios from 'axios';
import Events from '@/components/pages/p-events/Events';


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

// Create an axios instance with SSL configuration
const axiosInstance = axios.create({
    baseURL: 'https://localhost:7217/api',
    httpsAgent: new (require('https').Agent)({
        rejectUnauthorized: false
    })
});


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