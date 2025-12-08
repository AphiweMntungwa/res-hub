'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Autocomplete, Button, Typography, Stepper, StepLabel, Step, Box, Paper } from '@mui/material';
import Input from '@mui/joy/Input';
import axiosInstance from '@/lib/axiosInstance';
// import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { parseCookies } from 'nookies';

const AlertSignUp = React.lazy(() => import('./AlertSignUp'));

type Inputs = {
    studentNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
};

interface Residence {
    resId: number,
    name: string,
    address: string,
    capacity: number,
    busAdmin: string,
    ra: string,
    houseComm: string,
}

interface ResidenceProps {
    residences: Residence[];
}

const validationSchema = Yup.object().shape({
    studentNumber: Yup.string()
        .required('Student Number is required')
        .matches(/^\d{8}$/, 'Student Number must be exactly 8 numerical digits'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
        .min(7, 'Password must be at least 7 characters')
        .matches(/[A-Z]/, 'Passwords must have at least one uppercase letter (A-Z).')
        .matches(/[a-z]/, 'Passwords must have at least one lowercase letter (a-z).')
        .matches(/[0-9]/, 'Passwords must have at least one digit (0-9).')
        .matches(/[^a-zA-Z0-9]/, 'Passwords must have at least one non-alphanumeric character.'),
    confirmPassword: Yup.string().required('password confirmation is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
});

const steps = ['Add Residence Information', 'Create Account'];

const Register: React.FC<ResidenceProps> = ({ residences }) => {

    const router = useRouter();
    const [activeStep, setActiveStep] = React.useState(0);
    const [res, setRes] = React.useState<any | null>(residences[0]);
    const [roomNumber, setRoomNumber] = React.useState<string>("1");
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const cookies = parseCookies();
        const token = cookies['jwt-token']; // Replace with your actual token name
        if (token) {
            // User is authenticated, redirect to another page
            router.push('/residence'); // Replace with the page you want to redirect to
        }
    }, [router]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const options = residences.map((option) => {
        const firstLetter = option.name[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...option,
        };
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log({ ...data, resName: res.name, residenceId: res.resId, roomNumber, userName: data.email });

        try {
            const response = await axiosInstance.post('/StudentResident/register', { ...data, resName: res.name, residenceId: res.resId, roomNumber, userName: data.email });
            console.log(response);
            const { accessToken, residenceId, successful } = response.data;
            // Save the user fields
            localStorage.setItem('residenceId', residenceId);
            // Cookies.set('token', accessToken, { expires: 1 }); // Expires in 1 day
            setIsOpen(successful)
            setRes(residenceId)
            // router.push(`/residence?resId=${residenceId}`);
        } catch (error) {
            console.log(error)
            return [];
        }
    }

    return (
        <Paper
            elevation={6}
            sx={{
                p: 4,
                width: '100%',
                maxWidth: '600px',
                borderRadius: 4,
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
        >
            <Typography variant="h4" component="h1" align="center" sx={{ mb: 4, fontWeight: 700, color: '#333' }}>
                Create Account
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {isOpen ? (
                <Box sx={{ textAlign: 'center', py: 3 }}>
                    <Typography variant="h6" color="success.main" gutterBottom>
                        Registration Successful!
                    </Typography>
                    <Typography variant="body1">
                        You have successfully registered for a Reshub account.
                    </Typography>
                </Box>
            ) : activeStep === 0 ? (
                <Box sx={{ pt: 2 }}>
                    <Autocomplete
                        id="grouped-demo"
                        options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.name}
                        fullWidth
                        value={res}
                        onChange={(event, newValue) => {
                            setRes(newValue);
                        }}
                        isOptionEqualToValue={(option, value) => option.name === value.name}
                        renderInput={(params) => <TextField {...params} label="Select Residence" variant="outlined" />}
                        sx={{ mb: 3 }}
                    />
                    <Typography gutterBottom>Room Number</Typography>
                    <Input
                        sx={{
                            height: 40,
                            borderRadius: '8px',
                            border: '1px solid #ccc'
                        }}
                        type="number"
                        value={roomNumber}
                        onChange={(event) => setRoomNumber(event.target.value)}
                        slotProps={{
                            input: {
                                min: 1,
                                max: 4000,
                                step: 1,
                            },
                        }}
                    />
                </Box>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                        <TextField
                            fullWidth
                            label="Student Number"
                            margin="normal"
                            {...register("studentNumber")}
                            error={!!errors.studentNumber}
                            helperText={errors.studentNumber?.message}
                            sx={{ gridColumn: '1 / -1' }}
                        />
                        <TextField
                            fullWidth
                            label="First Name"
                            margin="normal"
                            {...register("firstName")}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                        <TextField
                            fullWidth
                            label="Last Name"
                            margin="normal"
                            {...register("lastName")}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                        <TextField
                            fullWidth
                            label="School Email"
                            type="email"
                            margin="normal"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{ gridColumn: '1 / -1' }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            margin="normal"
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                    </Box>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                            mt: 3,
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
                        Register
                    </Button>
                </form>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                    disabled={activeStep === 0 || isOpen}
                    onClick={handleBack}
                    sx={{ color: '#666' }}
                >
                    Back
                </Button>

                {!isOpen && activeStep < steps.length - 1 && (
                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{
                            background: 'linear-gradient(45deg, #4ECDC4 30%, #556270 90%)',
                            color: 'white',
                        }}
                    >
                        Next
                    </Button>
                )}
            </Box>
            <AlertSignUp isOpen={isOpen} resId={res} />
        </Paper>
    );
};

export default Register;
