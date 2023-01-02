// ** React Imports
import { useState, Fragment, useContext, ReactNode } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Stepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        minWidth: '550px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}))

// ** Custom Components Imports
import StepperCustomDot from 'src/@core/components/signup/StepperDot'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Hooks
// import { useAuth } from 'src/hooks/useAuth'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'

// ** Step Form
import CompanyDetails from 'src/@core/components/signup/Company'
import PersnolDetails from 'src/@core/components/signup/Persnol'
import Subscriptions from 'src/@core/components/signup/Subscription'
import SuccessMsg from 'src/@core/components/signup/Success'

// ** Contexts 
import { AuthContext } from 'src/context/AuthContext'

const Signup = () => {

    const { steps, activeStep, handleBack, handleNext, handleReset } = useContext(AuthContext)
    // const auth = useAuth()

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <PersnolDetails step={step} />
                )
            case 1:
                return (
                    <CompanyDetails step={step} />
                )
            case 2:
                return <Subscriptions step={step} />
            default:
                return 'Unknown Step'
        }
    }

    const renderContent = () => {
        if (activeStep === steps.length) {
            return (
                <Fragment>
                    <Typography>All steps are completed!</Typography>
                    <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button size='large' variant='contained' onClick={handleReset}>
                            Reset
                        </Button>
                    </Box>
                </Fragment>
            )
        } else {
            return (
                <>
                    <Grid container rowGap={8} >
                        <Grid item xs={12} >
                            <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                                {steps[activeStep].title}
                            </Typography>
                            <Typography variant='caption' component='p'>
                                {steps[activeStep].subtitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} style={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                            {getStepContent(activeStep)}
                        </Grid>
                    </Grid>
                </>
            )
        }
    }

    return (
        <Box className='content-center' style={{ flexDirection: 'column', justifyContent: "start" }} >
            <StepperWrapper style={{ width: "100%" }} >
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((step, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel StepIconComponent={StepperCustomDot}>
                                    <div className='step-label'>
                                        <div>
                                            <Typography className='step-title'>{step.title}</Typography>
                                            <Typography className='step-subtitle'>{step.subtitle}</Typography>
                                        </div>
                                    </div>
                                </StepLabel>
                            </Step>
                        )
                    })}
                </Stepper>
            </StepperWrapper>
            <Card sx={{ mt: 10 }}>
                <CardContent>{renderContent()}</CardContent>
            </Card>
        </Box>
    )
}

Signup.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Signup.guestGuard = true

export default Signup
