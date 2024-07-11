import type { Metadata } from 'next';
import React from 'react';
import Buses from '@/components/pages/p-buses/Buses';

export const metadata: Metadata = {
    title: 'Bus Announcements',
    description: "Bus times, numbers and other bus announcements",
}


interface BusesProps {
    // You can define any props if needed
}

const General: React.FC<BusesProps> = (props) => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-8">
            <Buses/>
        </section>
    );
};

export default General;
