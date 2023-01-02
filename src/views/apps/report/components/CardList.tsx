import { Button, Card, CardContent, CardHeader, CardMedia, CardActions, Grid, Typography, Box } from "@mui/material";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { RootState } from "src/store";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useContext } from 'react'
import { useRouter } from 'next/router'

import { DownLoadReport } from 'src/views/apps/report/components/report.pdf'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

import PencilOutline from 'mdi-material-ui/PencilOutline'
import Share from '@mui/icons-material/Share'
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import UploadOutline from 'mdi-material-ui/UploadOutline'
import { EmployeeType } from 'src/types/apps/employeeTypes';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useEmployee } from 'src/@core/hooks/form/useEmployee'
import { useReport } from 'src/@core/hooks/form/useReport'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

const DeleteButton = styled(Button)({
    backgroundColor: '#bc1818',
    borderRadius: '20px',
    height: '30px'
})

const EmployeeCardList = () => {

    const ability = useContext(AbilityContext)

    // ** Hooks
    const router = useRouter()
    const { store: report_store, deleteReport } = useReport(null)
    const { handleDrawer, handleModal, serviceId } = useToggleDrawer();

    const handleDelete = () => {
        // console.log('====================================');
        // console.log(serviceId);
        // console.log('====================================');
        serviceId && deleteReport(serviceId)
    }

    return (
        <>
            <Grid container spacing={10} xs={12}>
                {
                    report_store.reports.map((report) => (
                        <Grid item xs={12}>
                            <Card sx={{ display: 'flex' }}>
                                {/* paddingX={10}  rowGap={10} */}
                                <Grid item xs={11} paddingX={10} paddingTop={5}>

                                    <Grid item container>
                                        <Grid item xs={6} >
                                            <Typography sx={{ fontSize: "20px" }}>
                                                SN. #{`${report.serial}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Typography sx={{ fontWeight: 'bold' }} variant="h5" >
                                                {report.name}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <hr />

                                    <Grid item container>
                                        <Grid item xs={6} >
                                            Assignment Name
                                        </Grid>
                                        <Grid item xs={6} >
                                            {report?.assignment?.name}
                                        </Grid>
                                    </Grid>

                                    <Grid item container>
                                        <Grid item xs={6}>
                                            Total Labels Requiredd
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={2}>
                                                {report?.total_labels?.total ? <Chip label={report?.total_labels?.total + " Total"} color="default" size="small" variant="outlined" /> : null}
                                                {report?.total_labels?.pending ? <Chip label={report?.total_labels?.pending + " Pending"} color="primary" size="small" variant="outlined" /> : null}
                                                {report?.total_labels?.accept ? <Chip label={report?.total_labels?.accept + " Accept"} color="success" size="small" variant="outlined" /> : null}
                                                {report?.total_labels?.reject ? <Chip label={report?.total_labels?.reject + " Reject"} color="error" size="small" variant="outlined" /> : null}
                                                {/* <Chip label={(report?.total_labels?.total || 0) + " total"} color="default" size="small" variant="outlined" /> */}
                                                {/* <Chip label={(report?.total_labels?.pending || 0) + " pending"} color="primary" size="small" variant="outlined" /> */}
                                                {/* <Chip label={report?.total_labels?.accept || 0} color="success" size="small" variant="outlined" /> */}
                                                {/* <Chip label={report?.total_labels?.reject || 0} color="error" size="small" variant="outlined" /> */}
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Grid item container>
                                        <Grid item xs={6}>
                                            Total Images Required
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={2}>
                                                {report?.total_images?.total ? <Chip label={report?.total_images?.total + " Total"} color="default" size="small" variant="outlined" /> : null}
                                                {report?.total_images?.pending ? <Chip label={report?.total_images?.pending + " Pending"} color="primary" size="small" variant="outlined" /> : null}
                                                {report?.total_images?.accept ? <Chip label={report?.total_images?.accept + " Accept"} color="success" size="small" variant="outlined" /> : null}
                                                {report?.total_images?.reject ? <Chip label={report?.total_images?.reject + " Reject"} color="error" size="small" variant="outlined" /> : null}

                                                {/* <Chip label={report?.total_images?.total || 0} color="default" size="small" variant="outlined" />
                                                <Chip label={report?.total_images?.pending || 0} color="primary" size="small" variant="outlined" />
                                                <Chip label={report?.total_images?.accept || 0} color="success" size="small" variant="outlined" />
                                                <Chip label={report?.total_images?.reject || 0} color="error" size="small" variant="outlined" /> */}
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Grid item container>
                                        <Grid item xs={6}>
                                            Total Videos Required
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={2}>
                                                {report?.total_videos?.total ? <Chip label={report?.total_videos?.total + " Total"} color="default" size="small" variant="outlined" /> : null}
                                                {report?.total_videos?.pending ? <Chip label={report?.total_videos?.pending + " Pending"} color="primary" size="small" variant="outlined" /> : null}
                                                {report?.total_videos?.accept ? <Chip label={report?.total_videos?.accept + " Accept"} color="success" size="small" variant="outlined" /> : null}
                                                {report?.total_videos?.reject ? <Chip label={report?.total_videos?.reject + " Reject"} color="error" size="small" variant="outlined" /> : null}

                                                {/* <Chip label={report?.total_videos?.total || 0} color="default" size="small" variant="outlined" />
                                                <Chip label={report?.total_videos?.pending || 0} color="primary" size="small" variant="outlined" />
                                                <Chip label={report?.total_videos?.accept || 0} color="success" size="small" variant="outlined" />
                                                <Chip label={report?.total_videos?.reject || 0} color="error" size="small" variant="outlined" /> */}
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Grid item container>
                                        <Grid item xs={6}>
                                            Total Documents Required
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Stack direction="row" spacing={2}>
                                                {report?.total_docs?.total ? <Chip label={report?.total_docs?.total + " Total"} color="default" size="small" variant="outlined" /> : null}
                                                {report?.total_docs?.pending ? <Chip label={report?.total_docs?.pending + " Pending"} color="primary" size="small" variant="outlined" /> : null}
                                                {report?.total_docs?.accept ? <Chip label={report?.total_docs?.accept + " Accept"} color="success" size="small" variant="outlined" /> : null}
                                                {report?.total_docs?.reject ? <Chip label={report?.total_docs?.reject + " Reject"} color="error" size="small" variant="outlined" /> : null}

                                                {/* <Chip label={report?.total_docs?.total || 0} color="default" size="small" variant="outlined" />
                                                <Chip label={report?.total_docs?.pending || 0} color="primary" size="small" variant="outlined" />
                                                <Chip label={report?.total_docs?.accept || 0} color="success" size="small" variant="outlined" />
                                                <Chip label={report?.total_docs?.reject || 0} color="error" size="small" variant="outlined" /> */}
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Box sx={{ display: 'flex', flexDirection: "column", marginBottom: "10px", marginTop: "10px" }}>
                                        {/* <Typography marginBottom={2}>
                                            Assign Inspectors
                                        </Typography> */}
                                        <Box>
                                            {
                                                // @ts-ignore
                                                report?.inspectors.map(({ inspector }) => (
                                                    <Chip
                                                        avatar={<Avatar alt="Inspector" src={inspector?.image} />}
                                                        label={`${inspector?.first_name} ${inspector?.last_name}`}
                                                        variant="outlined"
                                                    />
                                                ))
                                            }
                                        </Box>
                                    </Box>
                                    <hr />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-around', }}>
                                        <DownLoadReport report={report} />
                                        <Button onClick={() => handleDrawer(report.id)} fullWidth>
                                            <UploadOutline /> Update
                                        </Button>
                                        <Button onClick={() => handleModal(report.id)} color="error" fullWidth>
                                            <DeleteOutline /> Delete
                                        </Button>
                                    </Box>
                                </Grid>
                                <Grid item xs={1} sx={{ display: "flex", flexDirection: "column" }} >
                                    {
                                        ability.can('allow', 'report-inspect-button') && (
                                            <Button
                                                onClick={() => router.push(`/project/assignment/report/inspect/${report.id}`)}
                                                startIcon={<NavigateNextIcon />}
                                                variant="contained"
                                                fullWidth
                                                style={{ height: "100%", borderRadius: 0 }}
                                            />
                                        )
                                    }
                                    {
                                        ability.can('allow', 'report-manage-button') && (
                                            <Button
                                                onClick={() => router.push(`/project/assignment/report/view/${report.id}`)}
                                                startIcon={<PencilOutline />}
                                                variant="contained"
                                                fullWidth
                                                style={{ height: "100%", borderRadius: 0 }}
                                            />
                                        )
                                    }
                                </Grid>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>

            <DeleteAlert title='report' onAgree={handleDelete} />

        </>
    )
}
export default EmployeeCardList;
