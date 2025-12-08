'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Button, Typography, Alert, Link, Paper, Box } from '@mui/material';
import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

type Inputs = {
    email: string;
    password: string;
};

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
});


const Login = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axiosInstance.post('StudentResident/login', data);
            console.log(response);
            setErrorMessage("");
            setIsOpen(response.data.successful)
        } catch (error: any) {
            setErrorMessage(error?.response?.data);
        }
    }

    React.useEffect(() => {
        if (isOpen) {
            window.location.href = `/residence`;
        }
    }, [isOpen])

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                width: '100%',
                maxWidth: '450px',
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
        >
            <Typography variant="h4" component="h1" align="center" sx={{ mb: 1, fontWeight: 700, color: '#333' }}>
                Welcome Back
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 4, color: '#666' }}>
                Sign in to Residence Hub
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        label="School Email"
                        type="email"
                        variant="outlined"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        sx={{
                            '& .MuiOutlinedInput-root': { borderRadius: 2 }
                        }}
                    />
                </Box>
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        variant="outlined"
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        sx={{
                            '& .MuiOutlinedInput-root': { borderRadius: 2 }
                        }}
                    />
                </Box>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        py: 1.5,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        textTransform: 'none',
                        background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                        transition: 'transform 0.2s',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #FF8E8E 30%, #6EE7DE 90%)',
                            transform: 'scale(1.02)',
                        },
                    }}
                >
                    Sign In
                </Button>
            </form>

            {isOpen && (
                <Alert variant="filled" severity="success" sx={{ mt: 3, borderRadius: 2 }}>
                    Login successful! Redirecting...
                </Alert>
            )}

            {errorMessage && (
                <Alert variant="filled" severity="error" sx={{ mt: 3, borderRadius: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            <Box sx={{ mt: 4, textAlign: 'center' }}>
                <Typography variant="body2" color="textSecondary">
                    Don&apos;t have an account?{' '}
                    <Link
                        component={NextLink}
                        href="/auth/register"
                        sx={{
                            fontWeight: 600,
                            color: '#4ECDC4',
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                    >
                        Create one
                    </Link>
                </Typography>
            </Box>
        </Paper>
    );
};

export default Login;
