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
import DescriptionIcon from "@mui/icons-material/Description";
import DesignServicesIcon from "@mui/icons-material/DesignServices";

const StyledCard = styled(Card)(({ theme }) => ({
  transition: "0.3s",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  textDecoration: "none",
  "&:hover": {
    boxShadow: "0px 4px 20px rgba(0, 123, 255, 0.5)",
    transform: "scale(1.02)",
  },
}));

const StyledCardContent = styled(CardContent)({
  flexGrow: 1,
});

const options = [
  { title: "Admins", description: "Manage user roles, permissions, and oversee the system's security and operations.", icon: <DownloadIcon />, link: "/admin" },
  { title: "Bus Coordinator", description: "Oversee transportation logistics, manage schedules, and ensure smooth transit operations.", icon: <BuildIcon />, link: "/bus-coordinator" },
  { title: "Residence Event Organizers", description: "Plan and execute events within residences, ensuring engagement and participation.", icon: <ViewInArIcon />, link: "/residence-events" },
  { title: "Sports Events", description: "Coordinate sporting events, schedule tournaments, and manage event logistics.", icon: <PaletteIcon />, link: "/sports-events" },
  { title: "Sports", description: "Manage sports facilities, teams, and oversee athlete participation in competitions.", icon: <DescriptionIcon />, link: "/sports" },
  { title: "Open Polls", description: "Create and manage polls, gather feedback, and analyze results to improve engagement.", icon: <DesignServicesIcon />, link: "/polls" },
];

export default function RolesMenu() {
  return (
    <Grid container spacing={3} justifyContent="center">
      {options.map((option, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Link href={`roles${option.link}`} passHref>
            <StyledCard>
              <CardHeader
                avatar={<IconButton>{option.icon}</IconButton>}
                title={<Typography variant="h6">{option.title}</Typography>}
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
