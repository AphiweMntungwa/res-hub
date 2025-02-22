import type { Metadata } from 'next';
import React from 'react';
import AdminList from '@/components/pages/p-roles/admin/AdminList';
import axiosInstance from '@/lib/axiosInstance';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import SportsAdminList from '@/components/pages/p-roles/sportsPerson/SportsList';

export const metadata: Metadata = {
    title: 'Sports Administrator',
    description: "Managing of Sports events of the residence",
}

interface SportsAdmin {
    firstName: string;
    id: string;
    lastName: string;
    residenceId: number;
    roomNumber: number;
    studentNumber: string;
    username: string;
    email: string;
}

async function fetchSportsAdmins(token: string | undefined): Promise<SportsAdmin[]> {
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

const SportsAdmins: React.FC<SportsAdmin> = async () => {
    const cookieStore = cookies();
    const token = cookieStore.get('jwt-token')?.value;
    if (!token) {
        redirect('/auth/login');
    }

    const admins = await fetchSportsAdmins(token)

    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-10">
            <SportsAdminList sportsAdmins={admins} />
        </section>
    );
};

export default SportsAdmins;
