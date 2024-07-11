import { Metadata } from 'next';
import React from 'react';
import Register from '@/components/pages/p-auth/Register';
import axiosInstance from '@/lib/axiosInstance';


export const metadata: Metadata = {
    title: 'Register',
    description: "Create a new Reshub account and join residence group",
  }


  interface Residence {
    resId: number,
    name: string,
    address: string,
    capacity: number,
    busAdmin: string,
    ra: string,
    houseComm: string,
}


async function fetchResidences(): Promise<Residence[]> {
    try {
        const response = await axiosInstance.get('/Residence');
        return response.data.$values;
    } catch (error) {
        return []
    }
}

  
const RegisterStudent = async () => {
    const residences = await fetchResidences();

    return (
        <section className="flex min-h-screen flex-col items-center justify-start pt-5 px-16">
            <Register residences={residences} />
        </section >
    );
};


export default RegisterStudent;
