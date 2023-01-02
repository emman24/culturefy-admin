import React, { useId, useState } from 'react'

import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'

import { IReport, LabelsOnReports } from 'src/types/apps/report'

const LabelUpdateCard = (
    { label, onSave }: { label: any, onSave: any }
) => {

    const [details, setDetails] = useState<string>(label.details || "")

    return (
        <Grid item xs="auto" >
            <Box style={{ width: 300 }} >
                <Box style={{ marginTop: 5, padding: 5 }} >
                    <Chip
                        variant="outlined"
                        size="medium"
                        label={label?.label?.name}
                        sx={{ width: "100%" }}
                    />
                </Box>
                <Box style={{ marginTop: 5, marginBottom: 5 }} >
                    <TextField
                        label="Enter label details"
                        fullWidth
                        multiline
                        value={details}
                        minRows={4}
                        onChange={(e) => setDetails(e.target.value)}
                    />
                </Box>
                <Box style={{ marginTop: 5, padding: 5 }} >
                    <Chip
                        variant="outlined"
                        color={label.status === "ACCEPT" ? "success" : label.status === "REJECT" ? "error" : "info"}
                        size="small"
                        label={label.status}
                    />
                </Box>
                <Box>
                    <LoadingButton
                        fullWidth
                        loading={false}
                        variant="contained"
                        disabled={label.details === details}
                        onClick={() => onSave({ ...label, details })}
                    >
                        {label.details !== details ? "Save changes" : "Save"}
                    </LoadingButton>
                </Box>
            </Box>
        </Grid>
    )
}

export default LabelUpdateCard

