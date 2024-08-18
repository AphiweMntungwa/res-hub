import type { Metadata } from 'next';
import React from 'react';
import { cookies } from 'next/headers';
import axiosInstance from '@/lib/axiosInstance';
import EventDetailClient from '@/components/pages/p-events/EventDetailClient';

export const metadata: Metadata = {
    title: 'Event Details',
    description: "More Details About a Residence Event",
}

interface Event {
    id: number;
    eventName: string;
    description: string;
    type: number;
    dateOfEvent: string;
    residenceId: number;
}

async function fetchEvent(token: string | undefined, eventId: string): Promise<Event> {
    try {
        const response = await axiosInstance.get(`/Events/${eventId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        return {
            id: 0,
            eventName: "Unable to fetch event",
            description: "An Error Occurred",
            type: 0,
            dateOfEvent: "",
            residenceId: 0
        }
    }
}

const EventDetails = async ({ params }: { params: { eventId: string } }) => {
    const { eventId } = params;
    const cookieStore = cookies();
    const token = cookieStore.get('jwt-token')?.value;
    const event = await fetchEvent(token, eventId);

    return (
        <section className="flex min-h-screen flex-column items-center flex-col pt-20 px-8">
            <EventDetailClient event={event} />
        </section>
    );
};

export default EventDetails;