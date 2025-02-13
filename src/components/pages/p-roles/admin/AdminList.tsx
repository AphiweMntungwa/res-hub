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
  { title: "Admins", description: "Manage user roles, permissions, and oversee the system's security and operations.", icon: <DownloadIcon /> },
];

export default function AdminList() {
  return (
    <Grid container spacing={3} justifyContent="center">
      {options.map((option, index) => (
        <Grid item xs={12} sm={12} md={12} key={index}>
            <StyledCard component="a">
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
        </Grid>
      ))}
    </Grid>
  );
}
