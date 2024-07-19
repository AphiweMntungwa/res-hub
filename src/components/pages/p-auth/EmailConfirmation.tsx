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

type Inputs = {
    code: string;
};

const validationSchema = Yup.object().shape({
    code: Yup.string()
        .required('Please Enter The Code Sent To Your Email')
        .matches(/^\d{5}$/, 'The Code Must Be Five(5) Digits Long')
});


const EmailConfirm = () => {
    const [errorMessage, setErrorMessage] = React.useState("");
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        console.log(data);
    }

    return (
        <React.Fragment>
            <Typography variant="h6" component="div">
                Enter Your Verification Code
            </Typography>
            <form style={{ minWidth: "50%" }} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <TextField
                        fullWidth
                        label="X-X-X-X-X"
                        type="text"
                        margin="normal"
                        {...register("code")}
                        error={!!errors.code}
                        helperText={errors.code?.message}
                    />
                </div>
                <Button type="submit" variant="outlined" color="primary">
                    Verify
                </Button>
            </form>
            {/* {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : null} */}
        </React.Fragment >
    );
};

export default EmailConfirm;
