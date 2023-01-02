
import React from 'react'
import { useRouter } from 'next/router'

import { useSelector } from "react-redux"

// ** MUI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import ReportStatusBar from 'src/views/apps/report/components/Status'
import ReportMeta from 'src/views/apps/report/components/Meta'
import VersionDrawer from 'src/views/apps/report/components/VersionDrawer'

// ** custom
import CustomAvatar from 'src/@core/components/mui/avatar'
import ReportAssets from 'src/views/apps/report/components/Assets'
import { SingleFileUploader } from 'src/@core/components/form'

// ** Custom hooks
import { useReport } from 'src/@core/hooks/form/useReport'

// ** Utils Import
import { format } from 'date-fns'
import { getInitials } from 'src/@core/utils/get-initials'
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Types import
import { RootState, AppDispatch } from 'src/store'

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

const InspectReport = () => {

    // ** Hooks
    const router = useRouter()
    const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer();
    const { store: { report }, updateVersionLabel, updateVersionMeta } = useReport(`${router.query.id}`)

    // const handleUpdateAssesst = async (assesstId: string, status: string) => {
    //     await updateReportAssesst(assesstId, { status })
    // }

    const handleUpdateAssesst = async (id: string, data: any) => {
        await updateVersionMeta(id, data)
    }

    return (
        <>
            <Card sx={{ p: 5 }} >

                {/* <ReportStatusBar report={report} /> */}
                <ReportMeta report={report} />

                <Divider>
                    <Button
                        variant='contained'
                        // @ts-ignore
                        onClick={() => handleDrawer(report.id)}
                    >
                        Add more updates
                    </Button>
                </Divider>

            </Card>

            {
                (report.versions && report.versions.length) && report.versions.filter((version: any) => version.type === "default").map((version: any, i: any) => (
                    <Card sx={{ p: 5, marginTop: 10 }} id={`report-version-${version.id}`} >
                        <ReportStatusBar report={version} />
                        {/* <Typography variant='h4' >Update ({report.name}) #{report.versions.length - i}</Typography> */}
                        {/* <a href="#report-version-1">My first section</a>
                        <a href="#report-version-2">My second section</a> */}
                        <Root>

                            {/* @labels */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Text" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.labels && version.labels.length) && version.labels.map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >

                                                <Box style={{ marginBottom: 5 }} >
                                                    <Chip
                                                        variant="filled"
                                                        size="medium"
                                                        label={i + 1}
                                                        sx={{ width: "100%" }}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Chip
                                                        variant="filled"
                                                        color='primary'
                                                        size="medium"
                                                        label={item.label?.name}
                                                        sx={{ width: "100%" }}
                                                    />
                                                </Box>
                                                <Box style={{ marginTop: 8, marginBottom: 8 }} >
                                                    <TextField
                                                        label="label details"
                                                        fullWidth
                                                        multiline
                                                        value={item.details || "Not Provided"}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </Box>

                                                <Box>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            labelId={`status-change-${item.id}`}
                                                            id="status-change"
                                                            value={item.status}
                                                            label=""
                                                            variant={'outlined'}
                                                            size='small'
                                                            onChange={(e) => {
                                                                updateVersionLabel(item.id, { status: e.target.value })
                                                            }}
                                                        >
                                                            <MenuItem value={"PENDING"}>Pending</MenuItem>
                                                            <MenuItem value={"ACCEPT"}>Accept</MenuItem>
                                                            <MenuItem value={"REJECT"}>Reject</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>

                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                            {/* @Images */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Images" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "image").map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <ReportAssets
                                                    reportAssesst={item}
                                                    title={i + 1}
                                                    // @ts-ignore
                                                    onStatusUpdate={(version) => {
                                                        handleUpdateAssesst(item.id, { status: version.status })
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                            {/* @Videos */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Videos" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "video").map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <ReportAssets
                                                    reportAssesst={item}
                                                    title={i + 1}
                                                    // @ts-ignore
                                                    onStatusUpdate={(version) => {
                                                        handleUpdateAssesst(item.id, { status: version.status })
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                            {/* @Documents */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Documents" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i: any) => i.type === "doc").map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <ReportAssets
                                                    reportAssesst={item}
                                                    title={i + 1}
                                                    // @ts-ignore
                                                    onStatusUpdate={(version) => {
                                                        handleUpdateAssesst(item.id, { status: version.status })
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Root>
                    </Card>
                ))
            }

            {
                (report.versions && report.versions.length) && report.versions.filter((version: any) => version.type !== "default").map((version: any, i: any) => (
                    <Card sx={{ p: 5, marginTop: 10 }} id={`report-version-${version.id}`} >
                        <ReportStatusBar report={version} />
                        <Typography variant='h4' >Update ({version.name}) #{(report.versions.length - 1) - i} - {format(new Date(version?.createdAt), 'MMM dd yyy')}</Typography>
                        {/* <a href="#report-version-1">My first section</a>{}{}
                        <a href="#report-version-2">My second section</a> */}
                        <Root>

                            {/* @labels */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Text" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.labels && version.labels.length) && version.labels.map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <Box style={{ marginBottom: 5 }} >
                                                    <Chip
                                                        variant="filled"
                                                        size="medium"
                                                        label={i + 1}
                                                        sx={{ width: "100%" }}
                                                    />
                                                </Box>
                                                <Box>
                                                    <Chip
                                                        variant="filled"
                                                        size="medium"
                                                        color='primary'
                                                        label={item.label?.name}
                                                        sx={{ width: "100%" }}
                                                    />
                                                </Box>
                                                <Box style={{ marginTop: 8, marginBottom: 8 }} >
                                                    <TextField
                                                        label="label details"
                                                        fullWidth
                                                        multiline
                                                        value={item.details || "Not Provided"}
                                                        InputProps={{
                                                            readOnly: true,
                                                        }}
                                                    />
                                                </Box>

                                                <Box>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            labelId={`status-change-${item.id}`}
                                                            id="status-change"
                                                            value={item.status}
                                                            label=""
                                                            variant={'outlined'}
                                                            size='small'
                                                            onChange={(e) => {
                                                                updateVersionLabel(item.id, { status: e.target.value })
                                                            }}
                                                        >
                                                            <MenuItem value={"PENDING"}>Pending</MenuItem>
                                                            <MenuItem value={"ACCEPT"}>Accept</MenuItem>
                                                            <MenuItem value={"REJECT"}>Reject</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Box>

                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                            {/* @Images */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Images" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "image").map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <ReportAssets
                                                    reportAssesst={item}
                                                    title={i + 1}
                                                    // @ts-ignore
                                                    onStatusUpdate={(version) => {
                                                        handleUpdateAssesst(item.id, { status: version.status })
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                            {/* @Videos */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Videos" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "video").map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <ReportAssets
                                                    reportAssesst={item}
                                                    title={i + 1}
                                                    // @ts-ignore
                                                    onStatusUpdate={(version) => {
                                                        handleUpdateAssesst(item.id, { status: version.status })
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                            {/* @Documents */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Documents" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i: any) => i.type === "doc").map((item, i) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 350 }} >
                                                <ReportAssets
                                                    reportAssesst={item}
                                                    title={i + 1}
                                                    // @ts-ignore
                                                    onStatusUpdate={(version) => {
                                                        handleUpdateAssesst(item.id, { status: version.status })
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Root>
                    </Card>
                ))
            }

            <VersionDrawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
        </>
    )
}

export default InspectReport
