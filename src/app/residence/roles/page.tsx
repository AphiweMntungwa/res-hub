import type { Metadata } from 'next';
import React from 'react';
import RolesMenu from '@/components/pages/p-roles/RolesMenu';
// import Important from '@/components/pages/p-general/Important';

export const metadata: Metadata = {
  title: 'Roles',
  description: "Different Roles and Permissions in the residence",
}


interface RolesProps {
  // You can define any props if needed
}

const Roles: React.FC<RolesProps> = (props) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-10">
      <RolesMenu />
    </section>
  );
};

export default Roles;
