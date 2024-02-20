import type { Metadata } from 'next';
import React from 'react';
import Important from '@/components/pages/p-general/Important';

export const metadata: Metadata = {
  title: 'General',
  description: "important residence notifications about bus times, toilet paper and other issues",
}


interface GeneralProps {
  // You can define any props if needed
}

const General: React.FC<GeneralProps> = (props) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-8">
      <Important/>
    </section>
  );
};

export default General;
