"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DownloadIcon from "@mui/icons-material/CloudDownload";
import BuildIcon from "@mui/icons-material/Build";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import PaletteIcon from "@mui/icons-material/Palette";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import { motion } from "framer-motion";

const StyledCard = styled(motion(Card))(({ theme }) => ({
    transition: "0.3s",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textDecoration: "none",
    borderRadius: "16px",
    overflow: "hidden",
    background: theme.palette.background.paper,
    "&:hover": {
        boxShadow: "0px 4px 20px rgba(0, 123, 255, 0.5)",
        transform: "scale(1.05)",
    },
}));

const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    padding: "16px",
});

const options = [
    { title: "Admins", description: "Manage user roles, permissions, and oversee the system's security and operations.", icon: <DownloadIcon />, link: "/admin" },
    { title: "Bus Coordinator", description: "Oversee transportation logistics, manage schedules, and ensure smooth transit operations.", icon: <BuildIcon />, link: "/bus-coordinator" },
    { title: "Residence Event Organizers", description: "Plan and execute events within residences, ensuring engagement and participation.", icon: <ViewInArIcon />, link: "/residence-events" },
    { title: "Sports Events", description: "Coordinate sporting events, schedule tournaments, and manage event logistics.", icon: <PaletteIcon />, link: "/sports-events" },
    { title: "Open Polls", description: "Create and manage polls, gather feedback, and analyze results to improve engagement.", icon: <DesignServicesIcon />, link: "/polls" },
];

export default function RolesMenu() {
    return (
        <Grid container spacing={3} justifyContent="flex-start">
            {options.map((option, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Link href={`roles${option.link}`} passHref>
                        <StyledCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <CardHeader
                                avatar={<IconButton>{option.icon}</IconButton>}
                                title={<Typography variant="h6" fontWeight="bold">{option.title}</Typography>}
                            />
                            <StyledCardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {option.description}
                                </Typography>
                            </StyledCardContent>
                        </StyledCard>
                    </Link>
                </Grid>
            ))}
        </Grid>
    );
}
