import type { Metadata } from 'next';
import React from 'react';
import AdminList from '@/components/pages/p-roles/admin/AdminList';
import axiosInstance from '@/lib/axiosInstance';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export const metadata: Metadata = {
    title: 'Residence Admins',
    description: "Admins of this residence",
}


interface Admin {
    firstName: string;
    id: string;
    lastName: string;
    residenceId: number;
    roomNumber: number;
    studentNumber: string;
    username: string;
    email: string;
}

async function fetchAdmins(token: string | undefined): Promise<Admin[]> {
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

const Admins: React.FC<Admin> = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt-token')?.value;
    if (!token) {
        redirect('/auth/login');
    }

    const admins = await fetchAdmins(token)

    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-10">
            <AdminList admins={admins} />
        </section>
    );
};

export default Admins;
