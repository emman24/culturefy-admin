import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'
import { format } from 'date-fns'

const Meta = ({ report }: { report: any }) => {
    return (
        <Grid container >
            <Grid item xs={12} >
                <Box sx={{ width: '100%', marginTop: 6 }}>
                    <Typography variant="h6" gutterBottom>
                        #{report?.serial} - {format(new Date(report?.createdAt), 'MMM dd yyy')}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Title: {report?.name}
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Assignment: {report?.assignment?.name}
                    </Typography>
                </Box>
            </Grid>

            <Grid item xs={12} >
                <Typography variant="h6">Inspectors</Typography>
                <Box sx={{ width: '100%', display: 'flex' }}>
                    {
                        // @ts-ignore
                        report.inspectors && report.inspectors.map(({ inspector }) => (
                            <Tooltip followCursor title={`${inspector?.first_name} ${inspector?.last_name}`}>
                                <Chip
                                    style={{ marginBottom: 5 }}
                                    avatar={<Avatar alt="Inspector" src={inspector?.image} />}
                                    label={`${inspector?.first_name} ${inspector?.last_name}`}
                                    variant="outlined"
                                />
                            </Tooltip>
                        ))
                    }
                </Box>
            </Grid>
        </Grid>
    )
}

export default Meta
