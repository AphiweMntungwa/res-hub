import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Button, TextField, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";


const VotingDialog = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [step, setStep] = useState(1);
    const [voteType, setVoteType] = useState(null);
    // const [reason, setReason] = useState("");

    const handleNext = (type: any) => {
        setVoteType(type);
        setStep(2);
    };

    return (
        <Dialog open={isOpen} onClose={onClose} fullScreen>
            <DialogTitle>
                Vote for a Coordinator
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8 }}
                >
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {step === 1 && (
                    <div className="flex flex-col items-center space-y-4">
                        <p>Would you like to upvote or downvote a Bus Coordinator?</p>
                        <div className="flex space-x-4">
                            <Button
                                variant="outlined"
                                color="success"
                                onClick={() => handleNext("upvote")}
                            >
                                Upvote
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => handleNext("downvote")}
                            >
                                Downvote
                            </Button>
                        </div>
                        {/* <TextField
                            label="Optional: Provide a reason for your vote"
                            multiline
                            fullWidth
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        /> */}
                    </div>
                )}
                {step === 2 && (
                    <div className="flex flex-col items-center space-y-4">
                        <h2 className="text-xl font-bold">Select a {voteType === "upvote" ? "Resident" : "Current Bus Coordinator"}</h2>
                        <p>Choose who you want to {voteType === "upvote" ? "promote" : "demote"}.</p>
                        {/* Fetch and display appropriate data here */}
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                {step === 2 && (
                    <Button onClick={() => setStep(1)} color="secondary">Back</Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default VotingDialog;