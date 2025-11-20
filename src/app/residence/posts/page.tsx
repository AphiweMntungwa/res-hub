import type { Metadata } from 'next';
import React from 'react';
import Posts from '@/components/pages/p-general/Posts';

export const metadata: Metadata = {
  title: 'General',
  description: "important residence notifications about bus times, toilet paper and other issues",
}


interface GeneralProps {
  // You can define any props if needed
}

const General: React.FC<GeneralProps> = (props) => {
  return (
    <section className="post-searchbar flex min-h-screen flex-col items-center justify-between pt-20 px-16">
      <Posts/>
    </section>
  );
};

export default General;
