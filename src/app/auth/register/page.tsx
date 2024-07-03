'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';

type Inputs = {
  studentNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  studentNumber: Yup.string()
  .matches(/^\d{8}$/, 'Student Number must be exactly 8 digits')
  .required('Student Number is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterStudent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: yupResolver(validationSchema)
  });

  const onSubmit: SubmitHandler<Inputs> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextField
          label="Student Number"
          margin="normal"
          {...register("studentNumber")}
          error={!!errors.studentNumber}
          helperText={errors.studentNumber?.message}
        />
      </div>
      <div>
        <TextField
          label="First Name"
          margin="normal"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
        />
      </div>
      <div>
        <TextField
          label="Last Name"
          margin="normal"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
        />
      </div>
      <div>
        <TextField
          label="Email"
          type="email"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </div>
      <div>
        <TextField
          label="Password"
          type="password"
          margin="normal"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Register
      </Button>
    </form>
  );
};

export default RegisterStudent;
