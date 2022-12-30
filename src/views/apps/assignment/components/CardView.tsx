import React from 'react'

// ** utils
import { useSelector } from 'react-redux'

// ** types
import { RootState } from 'src/store'

// ** MUI
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

const CardView = () => {

    const { assignment } = useSelector((state: RootState) => state.assignment)

    return (
        <Card>
            <Grid container>
                <CardContent>
                    {
                        !assignment ? (
                            <Typography>Not Found</Typography>
                        ) : (
                            <Grid container xs={12} spacing={6}>
                                <Grid item xs={12}>
                                    {/* @ts-ignore */}
                                    <CardMedia component='img' height='auto' image={assignment?.project?.image} alt='assignment image' />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={12} paddingTop={3}>
                                        {/* @ts-ignore */}
                                        <Typography sx={{ fontWeight: 'bold' }}>Name: {assignment?.name}</Typography>
                                        {/* @ts-ignore */}
                                        <Typography>Type: {assignment?.assignmentType?.name}</Typography>
                                        {/* @ts-ignore */}
                                        <Typography>Project: {assignment?.project?.name}</Typography>
                                        <Typography sx={{ fontWeight: 'bold' }} >Details:</Typography>
                                        {/* @ts-ignore */}
                                        <Typography>{assignment?.description}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography sx={{ fontWeight: 'bold' }} >Assign Managers</Typography>
                                    {
                                        // @ts-ignore
                                        assignment.managers && assignment.managers.map(({ manager }) => (
                                            <Chip
                                                style={{ marginBottom: 5 }}
                                                avatar={<Avatar alt="Inspector" src={manager?.image} />}
                                                label={`${manager?.first_name} ${manager?.last_name}`}
                                                variant="outlined"
                                            />
                                        ))
                                    }
                                </Grid>
                            </Grid>
                        )
                    }

                </CardContent>
            </Grid>
        </Card>
    )
}

export default CardView