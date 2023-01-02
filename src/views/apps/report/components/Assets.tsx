
import React, { useId } from 'react'

// ** MUI
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'

import Download from '@mui/icons-material/Download';

import { download } from 'src/@core/utils/download'

import toast from 'react-hot-toast'

interface ReportAssest {
    [x: string]: any
}

interface IAssesstStatus {
    reportAssesst: ReportAssest
    onStatusUpdate: (reportAssesst: ReportAssest) => ReportAssest,
    title: string
}

const Assets = ({ reportAssesst, onStatusUpdate, title }: IAssesstStatus) => {

    const renderFilePreview = (file: any) => {
        if (!file || !file.source) {
            return (
                <CardMedia
                    component="img"
                    width="100%"
                    height="auto"
                    image={"/images/banners/No-data-cuate.png"}
                    alt={"Not Found"}
                />
            )
        } else if (file && file.type === "image") {
            return <img width={"100%"} height={"auto"} alt={"report image"} src={file.source} />
        } else if (file && file.type === "video") {
            return (
                <video width={"100%"} height={"auto"} controls>
                    <source src={file.source} />
                </video>
            )
        } else if (file && file.type === "doc") {
            return <iframe width={"100%"} height={"auto"} src={file.source} title={"Report Doc"}></iframe>
        } else {
            "Invalid File"
        }
    }

    return (
        <Card id={reportAssesst.id} sx={{ maxWidth: 400 }} >
            <Box style={{ marginBottom: 5 }} >
                <Chip
                    variant="filled"
                    size="medium"
                    label={title ?? "Undefined"}
                    sx={{ width: "100%" }}
                />
            </Box>
            {renderFilePreview(reportAssesst)}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {reportAssesst.description}
                </Typography>
            </CardContent>
            <CardActions>
                <FormControl fullWidth>
                    <Select
                        labelId={`status-change-${reportAssesst.id}`}
                        id="status-change"
                        value={reportAssesst.status}
                        label=""
                        variant={'outlined'}
                        size='small'
                        onChange={(e) => {
                            onStatusUpdate({ ...reportAssesst, status: e.target.value })
                        }}
                    >
                        <MenuItem value={"PENDING"}>Pending</MenuItem>
                        <MenuItem value={"ACCEPT"}>Accept</MenuItem>
                        <MenuItem value={"REJECT"}>Reject</MenuItem>
                    </Select>
                </FormControl>
                {
                    reportAssesst.source && (
                        <IconButton size="medium" onClick={() => download(reportAssesst.source, `${Date.now()}`)}>
                            <Download />
                        </IconButton>
                    )
                }
                {/* download("https://get.geojs.io/v1/ip/geo.json", "geoip.json")
    download("data:text/html,HelloWorld!", "helloWorld.txt"); */}
                {/* <Button
                    variant={'contained'}
                    size="small"
                    color={reportAssesst.status === "ACCEPT" ? "success" : reportAssesst.status === "REJECT" ? "error" : "info"}
                    onClick={() => {
                        if (reportAssesst.status === "PENDING") {
                            onStatusUpdate({ ...reportAssesst, status: "ACCEPT" })
                        } else if (reportAssesst.status === "REJECT") {
                            onStatusUpdate({ ...reportAssesst, status: "ACCEPT" })
                        } else if (reportAssesst.status === "ACCEPT") {
                            onStatusUpdate({ ...reportAssesst, status: "REJECT" })
                        } else {
                            toast("Invalid status")
                        }
                    }}
                    fullWidth
                >
                    {reportAssesst.status}
                </Button> */}
            </CardActions>
        </Card>
    )
}

export default Assets
