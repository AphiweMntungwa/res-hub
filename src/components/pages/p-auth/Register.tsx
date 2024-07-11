'use client'
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { TextField, Autocomplete, Button, Typography, Stepper, StepLabel, Step, Box } from '@mui/material';
import Input from '@mui/joy/Input';
import { useRouter } from 'next/navigation';

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
        .required('Email is required')
        .test('emailMatch', 'Email must match student number format', function (value) {
            const { studentNumber } = this.parent;
            const emailRegex = new RegExp(`^${studentNumber}@dut4life\\.ac\\.za$`);
            return emailRegex.test(value);
        }),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string().required('password confirmation is required')
        .oneOf([Yup.ref('password')], 'Passwords must match')
});

const steps = ['Add Residence Information', 'Create Account'];

const Register: React.FC<ResidenceProps> = ({ residences }) => {
    const router = useRouter();
    const [activeStep, setActiveStep] = React.useState(0);
    const [res, setRes] = React.useState<any | null>(residences[0]);
    const [roomNumber, setRoomNumber] = React.useState<number | null>(1);

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

    const onSubmit: SubmitHandler<Inputs> = data => {
        console.log({ ...data, resName: res.name, resId: res.resId, roomNumber });
        router.push(`/residence?${res.resId}`);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" component="h6">
                Create Reshub Account
            </Typography>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: {
                        optional?: React.ReactNode;
                    } = {};

                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === 0 ? (<Box className="pt-5">
                <Autocomplete
                    id="grouped-demo"
                    options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                    groupBy={(option) => option.firstLetter}
                    getOptionLabel={(option) => option.name}
                    sx={{ width: 300 }}
                    value={res}
                    onChange={(event, newValue) => {
                        setRes(newValue);
                    }}
                    isOptionEqualToValue={(option, value) => option.name === value.name}
                    renderInput={(params) => <TextField {...params} label="Residences With categories" />}
                />
                <Input
                    className='mt-5'
                    sx={{ height: 20 }}
                    type="number"
                    value={roomNumber?.toString()}
                    onChange={(event) => setRoomNumber(parseInt(event.target.value))}
                    slotProps={{
                        input: {
                            min: 1,
                            max: 4000,
                            step: 1,
                        },
                    }}
                />
            </Box>) :
                (<form style={{ minWidth: "50%" }} onSubmit={handleSubmit(onSubmit)}>
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
                    <div>
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            type="password"
                            margin="normal"
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />
                    </div>
                    <Button type="submit" variant="outlined" color="primary">
                        Register
                    </Button>
                </form>)}
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                >
                    Back
                </Button>

                <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                    Next
                </Button>
            </Box>
        </React.Fragment >
    );
};

export default Register;
