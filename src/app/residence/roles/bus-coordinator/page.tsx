import type { Metadata } from 'next';
import React from 'react';
import AdminList from '@/components/pages/p-roles/admin/AdminList';
import axiosInstance from '@/lib/axiosInstance';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import CoordinatorList from '@/components/pages/p-roles/bus-coordinator/CoordinatorList';

export const metadata: Metadata = {
    title: 'Bus Co-ordinators',
    description: "Bus co-ordinators of the residence",
}


interface BusAdmin {
    firstName: string;
    id: string;
    lastName: string;
    residenceId: number;
    roomNumber: number;
    studentNumber: string;
    username: string;
    email: string;
}

async function fetchBusAdmins(token: string | undefined): Promise<BusAdmin[]> {
    try {
        const response = await axiosInstance.get('/roles/admins', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.$values;
    } catch (error) {
        console.log(error)
        return []
    }
}

const BusAdmins: React.FC<BusAdmin> = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt-token')?.value;
    if (!token) {
        redirect('/auth/login');
    }

    const admins = await fetchBusAdmins(token)

    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-10">
            <CoordinatorList busAdmins={admins} />
        </section>
    );
};

export default BusAdmins;
