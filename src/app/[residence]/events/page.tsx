import type { Metadata } from 'next';
import React from 'react';
 

export const metadata: Metadata = {
    title: 'Events',
    description: "Res events platform for the specific residence",
}


interface EventsProps {
    // You can define any props if needed
}

const Events: React.FC<EventsProps> = (props) => {
    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-8">
          <h3>events</h3>  
        </section>
    );
};

export default Events;
