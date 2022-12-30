import { Avatar, Button, Card, CardActionArea, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import React from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { RootState } from 'src/store'
import VisibilityIcon from '@mui/icons-material/Visibility'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import BorderColorIcon from '@mui/icons-material/BorderColor';
const ProjImage = require('src/assets/prject_picture.jpg');

const DeleteButton = styled(Button)({
  backgroundColor: '#bc1818',
  borderRadius: '20px'
})

const ProjectCardList = () => {
  const store = useSelector((state: RootState) => state.project)

  return (
    <Grid container spacing={10} xs={12}>
      {store.projects.map(proj => (
        <Grid key={proj.id} item xs={6} md={6}>
          <Card>
            <Grid container>
              <CardContent>
                <Grid container xs={12} spacing={6}>
                  <Grid item xs={4}>
                    <CardMedia component='img' height='140' image={proj.image} alt='Project Picture' />
                    {/* <Avatar alt="profile_picture" variant="rounded" src={'src/assets/prject_picture.jpg'}/> */}
                  </Grid>
                  <Grid container item xs={8}>
                    <Grid container item xs={12} spacing={2}>
                      <Grid item xs={4}>
                        <Button variant='text' sx={{ fontWeight: 'bold' }} startIcon={<BorderColorIcon />}>
                          Status
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <Button variant='text' sx={{ fontWeight: 'bold' }} startIcon={<BorderColorIcon />}>
                          Edit
                        </Button>
                      </Grid>
                      <Grid item xs={4}>
                        <DeleteButton variant='contained'>Delete</DeleteButton>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} paddingTop={3}>
                      <Typography sx={{ fontWeight: 'bold' }}>{proj.name}</Typography>
                      <Typography>{proj.discription}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <CardActions>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={6}>
                  <Link href={`/project/assignment/?projectId=${proj.id}`} >
                    <Button variant='outlined' startIcon={<VisibilityIcon />} fullWidth>
                      View Assignment
                    </Button>
                  </Link>
                </Grid>
                {/* <Grid item xs={6}>
                  <Button variant='contained' startIcon={<AddCircleIcon />} fullWidth>
                    Add Assignment
                  </Button>
                </Grid> */}
              </Grid>
            </CardActions>
          </Card>
        </Grid>
      ))
      }
    </Grid >
  )
}

export default ProjectCardList
