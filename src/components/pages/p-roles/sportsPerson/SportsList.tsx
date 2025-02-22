"use client";

import React, { lazy, Suspense } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";

interface SportsAdmin {
    firstName: string;
    id: string;
    lastName: string;
    residenceId: number;
    roomNumber: number;
    studentNumber: string;
    username: string;
    email: string;
}

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

const OptionsPanel = styled(Paper)({
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0",
    marginBottom: "15px",
    boxShadow: "none",
    borderRadius: 0,
});

const VotingDialog = lazy(() => import('@/components/pages/p-roles/sportsPerson/VoteSportsAdmin').then(module => ({ default: module.default })));;

export default function SportsAdminList(props: { sportsAdmins: SportsAdmin[] }) {
    const [openVotingDialog, setOpenVotingDialog] = React.useState(false);

    const openVotingDialogHandler = () => {
        setOpenVotingDialog(true)
    }
    
    const closeVotingDialogHandler = () => {
        setOpenVotingDialog(false)
    }

    return (
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
                <OptionsPanel>
                    <Tooltip title="Vote For Sports Admins" arrow>
                        <IconButton color="primary" onClick={openVotingDialogHandler}>
                            <PersonAddIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </OptionsPanel>
            </Grid>
            {props.sportsAdmins.map((admin, i) => (
                <Grid item xs={12} sm={12} md={12} key={i}>
                    <StyledCard>
                        <CardHeader
                            avatar={<IconButton><AccountCircleIcon /></IconButton>}
                            title={
                                <Typography variant="h6" component="div">
                                    name + surname
                                </Typography>
                            }
                            subheader={<div>
                                email
                                <Typography variant="body2" color="text.secondary">
                                    Room: number
                                </Typography>
                            </div>
                            }
                        />
                    </StyledCard>
                </Grid>
            ))}
            <Suspense fallback={<div>Loading...</div>}>
                {openVotingDialog && (
                    <VotingDialog isOpen={openVotingDialog} onClose={closeVotingDialogHandler} />
                )}
            </Suspense>
        </Grid>
    );
}
