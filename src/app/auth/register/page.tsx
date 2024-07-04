'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Typography } from '@mui/material';

type Inputs = {
    studentNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

const validationSchema = Yup.object().shape({
    studentNumber: Yup.string()
        .required('Student Number is required')
        .matches(/^\d{8}$/, 'Student Number must be exactly 8 numerical digits'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address')
        .required('Email is required')
        .test('emailMatch', 'Email must match student number format', function (value) {
            const { studentNumber } = this.parent;
            const emailRegex = new RegExp(`^${studentNumber}@dut4life\\.ac\\.za$`);
            return emailRegex.test(value);
        }),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
});

const RegisterStudent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log(data);
    }

    return (
        <section className="flex min-h-screen flex-col items-center justify-between pt-20 px-16">
            <form style={{ minWidth: "50%" }} onSubmit={handleSubmit(onSubmit)}>
                <Typography sx={{ textDecoration: "underline" }} variant="h4" component="h4">
                    Register
                </Typography>
                <div>
                    <TextField
                        fullWidth
                        label="Student Number"
                        margin="normal"
                        {...register("studentNumber")}
                        error={!!errors.studentNumber}
                        helperText={errors.studentNumber?.message}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="First Name"
                        margin="normal"
                        {...register("firstName")}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Last Name"
                        margin="normal"
                        {...register("lastName")}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="School Email"
                        type="email"
                        margin="normal"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />
                </div>
                <div>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                </div>
                <Button type="submit" variant="outlined" color="primary">
                    Register
                </Button>
            </form>
        </section>
    );
};

export default RegisterStudent;
