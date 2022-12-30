import React from 'react'

// ** Store Imports
import { useSelector } from 'react-redux'

// ** Types import
import { RootState } from 'src/store'

// ** Custom
import { SingleFileUploader } from 'src/@core/components/form'
import ReportStatusBar from 'src/views/apps/report/components/Status'
import LabelUpdateCard from 'src/views/apps/report/components/LabelUpdate'
// import PDF from './report.pdf'

// ** Custom hooks
import { useReport } from 'src/@core/hooks/form/useReport'

// ** MUI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    '& > :not(style) + :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

const ReportVersion = () => {

    const { updateVersionLabel, updateVersionMeta } = useReport(null)
    const report_store = useSelector((state: RootState) => state.report)
    const report: any = report_store.report

    // console.log('====================================');
    // console.log(report);
    // console.log('====================================');

    const handleUpdateAssesst = async (id: string, data: any) => {
        await updateVersionMeta(id, data)
    }

    return (
        <>
            {
                (report.versions && report.versions.length) && report.versions.filter((version: any) => version.type === "default").map((version: any, i: any) => (
                    <Card sx={{ p: 5, marginTop: 10 }} id={`report-version-${version.id}`} >
                        <ReportStatusBar report={version} />
                        {/* <Typography variant='h4' >Update ({version.name}) #{(report.versions.length - 1) - i}</Typography> */}
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
                                    (version.labels && version.labels.length) && version.labels.map((item) => (
                                        <LabelUpdateCard
                                            key={item.id}
                                            label={item}
                                            onSave={(label: any) => {
                                                updateVersionLabel(label.id, { details: label.details })
                                            }}
                                        />
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
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "image").map((item) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 200 }} >
                                                <SingleFileUploader
                                                    maxFiles={1}
                                                    maxSize={5000000}
                                                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                                    existFile={item}
                                                    onUpload={(file) => {
                                                        handleUpdateAssesst(item.id, { source: file.source })
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

                            {/* @Videos */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Videos" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "video").map((item) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 200 }} >
                                                <SingleFileUploader
                                                    maxFiles={1}
                                                    maxSize={5000000}
                                                    accept={{ 'video/*': ['.mp4'] }}
                                                    existFile={item}
                                                    onUpload={(file) => {
                                                        handleUpdateAssesst(item.id, { source: file.source })
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

                            {/* @Documents */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Documents" />
                                    </Divider>
                                </Grid>
                                {
                                    (version.meta && version.meta.length) && version.meta.filter((i: any) => i.type === "doc").map((item: any) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 200 }} >
                                                <SingleFileUploader
                                                    maxFiles={1}
                                                    maxSize={5000000}
                                                    accept={{ 'doc/*': ['.pdf'] }}
                                                    existFile={item}
                                                    onUpload={(file) => {
                                                        handleUpdateAssesst(item.id, { source: file.source })
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

                        </Root>
                    </Card>
                ))
            }


            {
                (report.versions && report.versions.length) && report.versions.filter((version: any) => version.type !== "default").map((version: any, i: any) => (
                    <Card sx={{ p: 5, marginTop: 10 }} id={`report-version-${version.id}`} >
                        <ReportStatusBar report={version} />
                        <Typography variant='h4' >Update ({version.name}) #{(report.versions.length - 1) - i}</Typography>
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
                                    (version.labels && version.labels.length) && version.labels.map((item) => (
                                        <LabelUpdateCard
                                            key={item.id}
                                            label={item}
                                            onSave={(label: any) => {
                                                updateVersionLabel(label.id, { details: label.details })
                                            }}
                                        />
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
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "image").map((item) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 200 }} >
                                                <SingleFileUploader
                                                    maxFiles={1}
                                                    maxSize={5000000}
                                                    accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                                                    existFile={item}
                                                    onUpload={(file) => {
                                                        handleUpdateAssesst(item.id, { source: file.source })
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

                            {/* @Videos */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Videos" />
                                    </Divider>
                                </Grid>
                                {
                                    // @ts-ignore
                                    (version.meta && version.meta.length) && version.meta.filter((i) => i.type === "video").map((item) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 200 }} >
                                                <SingleFileUploader
                                                    maxFiles={1}
                                                    maxSize={5000000}
                                                    accept={{ 'video/*': ['.mp4'] }}
                                                    existFile={item}
                                                    onUpload={(file) => {
                                                        handleUpdateAssesst(item.id, { source: file.source })
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

                            {/* @Documents */}
                            <Grid container columnSpacing={10} rowSpacing={3} >
                                <Grid item xs={12} >
                                    <Divider>
                                        <Chip label="Required Documents" />
                                    </Divider>
                                </Grid>
                                {
                                    (version.meta && version.meta.length) && version.meta.filter((i: any) => i.type === "doc").map((item: any) => (
                                        <Grid item xs="auto" key={item.id} >
                                            <Box style={{ width: 200 }} >
                                                <SingleFileUploader
                                                    maxFiles={1}
                                                    maxSize={5000000}
                                                    accept={{ 'doc/*': ['.pdf'] }}
                                                    existFile={item}
                                                    onUpload={(file) => {
                                                        handleUpdateAssesst(item.id, { source: file.source })
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

                        </Root>
                    </Card>
                ))
            }
            {/* <PDF /> */}
        </>
    )
}

export default ReportVersion
