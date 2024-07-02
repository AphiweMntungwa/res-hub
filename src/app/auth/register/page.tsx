'use client'

import React, { useState, FormEvent } from 'react';
import axiosInstance from '@/lib/axiosInstance';

interface RegisterStudentProps {}

const RegisterStudent: React.FC<RegisterStudentProps> = () => {
  const [studentNumber, setStudentNumber] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userName = `${studentNumber}@dut4life.ac.za`;

    const newStudentResident = {
      studentNumber,
      firstName,
      lastName,
      userName,
      email,
      password,
    };

    try {
      const response = await axiosInstance.post<any>('/StudentResidents', newStudentResident);
      console.log('Student registered successfully', response.data);
    } catch (error) {
      console.error('There was an error registering the student!', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Student Number:</label>
        <input type="text" value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} required />
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterStudent;
