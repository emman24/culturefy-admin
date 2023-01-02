import React from 'react'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
    { status: "Send", label: 'Send' },
    { status: "OnGoing", label: 'On Going' },
    { status: "ForReview", label: 'For Review' },
    { status: "Completed", label: 'Complete' },
];

const Status = ({ report }: { report: any }) => {
    return (
        <>
            {
                (report && report.status) && (
                    <Stepper activeStep={steps.findIndex((s) => s.status === report.status)} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label.status}>
                                <StepLabel>{label.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                )
            }
        </>
    )
}

export default Status