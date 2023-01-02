
import React, { useId } from 'react'
import { useRouter } from 'next/router'

import { useSelector } from "react-redux"

// ** MUI
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button'

import LabelUpdateCard from 'src/views/apps/report/components/LabelUpdate'
import ReportStatusBar from 'src/views/apps/report/components/Status'
import ReportMeta from 'src/views/apps/report/components/Meta'
import ReportVersions from 'src/views/apps/report/components/ReportVersion'
import VersionDrawer from 'src/views/apps/report/components/VersionDrawer'

// ** custom
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReportAssets from 'src/views/apps/report/components/Assets'
import { SingleFileUploader } from 'src/@core/components/form'

// ** Custom hooks
import { useReport } from 'src/@core/hooks/form/useReport'
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Types import
import { RootState, AppDispatch } from 'src/store'

const shapeStyles = { bgcolor: 'primary.main', width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: '50%' };

const InspectReport = () => {

    // ** Hooks
    const router = useRouter()
    const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer();
    const { store: { report }, updateReportAssesst, updateReportLabel } = useReport(`${router.query.id}`)

    const handleUpdateAssesst = async (assesstId: string, source: string) => {
        await updateReportAssesst(assesstId, { source })
    }

    return (
        <>
            <Card sx={{ p: 5 }} >

                {/* <ReportStatusBar report={report} /> */}
                <ReportMeta report={report} />

            </Card>

            {/* <Card sx={{ p: 5, marginTop: 10 }} >

                @labels
                <Grid container columnSpacing={10} rowSpacing={3} >
                    <Grid item xs={12} >
                        <Typography variant="h6">Required Labels</Typography>
                    </Grid>
                    {
                        // @ts-ignore
                        (report.labels && report.labels.length) && report.labels.map((item) => (
                            <LabelUpdateCard
                                key={item.id}
                                label={item}
                                onSave={(label: any) => {
                                    updateReportLabel(label.reportId, label.labelId, { details: label.details })
                                }}
                            />
                        ))
                    }
                </Grid>
                <hr />

                @Images
                <Grid container columnSpacing={10} rowSpacing={3} >
                    <Grid item xs={12} >
                        <Typography variant="h6">Required Images</Typography>
                    </Grid>
                    {
                        // @ts-ignore
                        (report.images && report.images.length) && report.images.map((item) => (
                            <Grid item xs="auto" key={item.id} >
                                <Box style={{ width: 200 }} >
                                    <SingleFileUploader
                                        maxFiles={1}
                                        maxSize={5000000}
                                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                        existFile={item}
                                        onUpload={(file) => {
                                            handleUpdateAssesst(item.id, file.source)
                                        }}
                                    />
                                    <Box style={{ marginTop: 5, padding: 5 }} >
                                        <Typography>{item.description}</Typography>
                                        <Chip
                                            variant="outlined"
                                            color={item.status === "ACCEPT" ? "success" : item.status === "REJECT" ? "error" : "info"}
                                            size="small"
                                            label={item.status}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
                <hr />

                @Videos
                <Grid container columnSpacing={10} rowSpacing={3} >
                    <Grid item xs={12} >
                        <Typography variant="h6">Required Videos</Typography>
                    </Grid>
                    {
                        // @ts-ignore
                        (report.videos && report.videos.length) && report.videos.map((item) => (
                            <Grid item xs="auto" key={item.id} >
                                <Box style={{ width: 200 }} >
                                    <SingleFileUploader
                                        maxFiles={1}
                                        maxSize={5000000}
                                        accept={{ 'video/*': ['.mp4'] }}
                                        existFile={item}
                                        onUpload={(file) => {
                                            handleUpdateAssesst(item.id, file.source)
                                        }}
                                    />
                                    <Box style={{ marginTop: 5, padding: 5 }} >
                                        <Typography>{item.description}</Typography>
                                        <Chip
                                            variant="outlined"
                                            color={item.status === "ACCEPT" ? "success" : item.status === "REJECT" ? "error" : "info"}
                                            size="small"
                                            label={item.status}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
                <hr />

                @Documents
                <Grid container columnSpacing={10} rowSpacing={3} >
                    <Grid item xs={12} >
                        <Typography variant="h6">Required Documents</Typography>
                    </Grid>
                    {
                        // @ts-ignore
                        (report.docs && report.docs.length) && report.docs.map((item) => (
                            <Grid item xs="auto" key={item.id} >
                                <Box style={{ width: 200 }} >
                                    <SingleFileUploader
                                        maxFiles={1}
                                        maxSize={5000000}
                                        accept={{ 'doc/*': ['.pdf'] }}
                                        existFile={item}
                                        onUpload={(file) => {
                                            handleUpdateAssesst(item.id, file.source)
                                        }}
                                    />
                                    <Box style={{ marginTop: 5, padding: 5 }} >
                                        <Typography>{item.description}</Typography>
                                        <Chip
                                            variant="outlined"
                                            color={item.status === "ACCEPT" ? "success" : item.status === "REJECT" ? "error" : "info"}
                                            size="small"
                                            label={item.status}
                                        />
                                    </Box>
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
                <hr />

            </Card > */}

            <ReportVersions />

            <VersionDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
        </>
    )
}

export default InspectReport
