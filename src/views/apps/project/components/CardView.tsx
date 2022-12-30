import React from 'react'

// ** utils
import { useSelector } from 'react-redux'

// ** types
import { RootState } from 'src/store'

// ** MUI
import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const CardView = () => {

    const { project } = useSelector((state: RootState) => state.project)

    return (
        <Card>
            <Grid container>
                <CardContent>
                    {
                        !project ? (
                            <Typography>Not Found</Typography>
                        ) : (
                            <Grid container xs={12} spacing={6}>
                                <Grid item xs={12}>
                                    {/* @ts-ignore */}
                                    <CardMedia component='img' height='auto' image={project?.image} alt='Project Picture' />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item xs={12} paddingTop={3}>
                                        {/* @ts-ignore */}
                                        <Typography sx={{ fontWeight: 'bold' }}>Name: {project?.name}</Typography>
                                        {/* @ts-ignore */}
                                        <Typography>Phone: {project?.phone}</Typography>
                                        <Typography>Details:</Typography>
                                        {/* @ts-ignore */}
                                        <Typography>{project?.discription}</Typography>
                                    </Grid>
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