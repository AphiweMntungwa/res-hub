'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Checkbox, Button, Typography, FormControlLabel, Alert, Link } from '@mui/material';
import Input from '@mui/joy/Input';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link'; // Import NextLink
import Cookies from 'js-cookie';

type Inputs = {
    email: string;
    password: string;
    rememberMe: boolean;
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
    rememberMe: Yup.boolean().required()
});


const Login = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
        try {
            const response = await axiosInstance.post('StudentResident/login', data);
            console.log(response);
            const { token } = response.data;
            Cookies.set('token', token, { expires: 1 }); // Expires in 1 day
        } catch (error: any) {
            setErrorMessage(error?.response?.data);
        }
    }

    return (
        <React.Fragment>
            <Typography variant="h6" component="h6">
                Sign In Reshub
            </Typography>
            <form style={{ minWidth: "50%" }} onSubmit={handleSubmit(onSubmit)}>
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
                <div>
                    <FormControlLabel control={<Checkbox
                        {...register("rememberMe")}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />} label="Remember Me?" />

                </div>
                <Button type="submit" variant="outlined" color="primary">
                    Sign In
                </Button>
            </form>
            {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null}
            <Typography variant="body2" component="p" style={{ marginTop: '10px' }}>
                Don&apos;t have an account?
                <Link component={NextLink} href="/auth/register">
                    Create one
                </Link>
            </Typography>
        </React.Fragment >
    );
};

export default Login;
