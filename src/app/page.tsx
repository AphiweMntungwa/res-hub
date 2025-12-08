'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Button, Container, Typography, Box, Stack } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleGetStarted = () => {
        setIsLoading(true)
        const token = Cookies.get('jwt-token')

        if (token) {
            router.push('/residence')
        } else {
            router.push('/auth/login')
        }
    }

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#0a0a0a', // Dark background
                color: 'white',
            }}
        >
            {/* Background Animations */}
            <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 0,
                    overflow: 'hidden',
                }}
            >
                {/* Floating Orbs */}
                {[...Array(5)].map((_, i) => (
                    <Box
                        key={i}
                        component={motion.div}
                        animate={{
                            x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                            y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                        sx={{
                            position: 'absolute',
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${200 + Math.random() * 300}px`,
                            height: `${200 + Math.random() * 300}px`,
                            borderRadius: '50%',
                            background: `radial-gradient(circle, ${['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'][i % 5]
                                }22 0%, transparent 70%)`,
                            filter: 'blur(40px)',
                        }}
                    />
                ))}
            </Box>

            {/* Content */}
            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '3rem', md: '5rem' },
                            mb: 2,
                            background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Residence Hub
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                >
                    <Typography
                        variant="h5"
                        component="p"
                        sx={{
                            mb: 6,
                            color: 'rgba(255, 255, 255, 0.8)',
                            lineHeight: 1.6,
                            maxWidth: '800px',
                            mx: 'auto',
                        }}
                    >
                        Your central hub for university residence life in South Africa. Seamlessly manage school buses,
                        track schedules, view residence positions, participate in voting, and much more.
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleGetStarted}
                        endIcon={<ArrowForwardIcon />}
                        disabled={isLoading}
                        sx={{
                            px: 5,
                            py: 2,
                            fontSize: '1.2rem',
                            borderRadius: '50px',
                            textTransform: 'none',
                            background: 'linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)',
                            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                            transition: 'transform 0.2s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                                background: 'linear-gradient(45deg, #FF8E8E 30%, #6EE7DE 90%)',
                            },
                        }}
                    >
                        Get Started
                    </Button>
                </motion.div>
            </Container>
        </Box>
    )
}
