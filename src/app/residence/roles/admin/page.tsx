import type { Metadata } from 'next';
import React from 'react';
import AdminList from '@/components/pages/p-roles/admin/AdminList';

export const metadata: Metadata = {
  title: 'Roles',
  description: "Different Roles and Permissions in the residence",
}


interface AdminProps {
  // You can define any props if needed
}

const Admins: React.FC<AdminProps> = (props) => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-10">
        <AdminList />
    </section>
  );
};

export default Admins;
