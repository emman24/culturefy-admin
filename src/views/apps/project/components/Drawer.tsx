// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
// import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

import Map from 'src/@core/components/map'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useProject } from 'src/@core/hooks/form/useProject'

// ** import form support components
import { InputField, Select, FileUploader } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { addEmployeeAction } from 'src/store/apps/employee'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

interface SidebarAddUserType {
  open: boolean
  toggle: () => void
  serviceId: string | null
}

const Header = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const Footer = styled(Box)<BoxProps>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const ProjectDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // console.log('===========ClientDrawer===========');
  // console.log(serviceId);
  // console.log('====================================');

  // ** Hooks
  const client_store = useSelector((state: RootState) => state.client)
  const project_store = useSelector((state: RootState) => state.project)

  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors },
      setValue
    },
    addProject,
    updateProject
  } = useProject(serviceId)

  const onSubmit = async (data: any) => {
    delete data.API_ERROR
    if (serviceId) {
      await updateProject(serviceId, data)
    } else {
      await addProject(data)
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 500, sm: 600 } } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>{!serviceId ? 'Add Project' : 'Update Project'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <CardContent>
            <Grid container spacing={5}>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='name'
                  label='Project name'
                  placeholder='Enter project name'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='phone'
                  label='Contract Number'
                  placeholder='Enter contact number'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name='discription'
                  label='Project discription'
                  placeholder='Enter discription'
                  type='text-area'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <Select
                  name='clientId'
                  label='Select Client'
                  //  @ts-ignore
                  control={control}
                >
                  {
                    client_store.clients.map((client) => (
                      <MenuItem value={client.id}>{client.client_name}</MenuItem>
                    ))
                  }
                </Select>
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 3 }}>
                  Project image
                </Typography>
                <FileUploader
                  name='image'
                  //@ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} >
                <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 3 }}>
                  Project Location
                </Typography>
                <Map
                  onSelectLocation={(e: any) => {
                    setValue('longitude', `${e.lng}`)
                    setValue('latitude', `${e.lat}`)
                  }}
                />
                {(errors.latitude || errors.longitude) && (
                  <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-location`}>
                    Location required
                  </FormHelperText>
                )}
              </Grid>

            </Grid>
          </CardContent>
        </Box>
        <Footer>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          {/* <Button size='large' type='submit' variant='contained' sx={{ mr: 3 }}>
            Submit
          </Button> */}
          <LoadingButton
            sx={{ mr: 3 }}
            loading={project_store.status === 'pending'}
            disabled={project_store.status === 'pending'}
            loadingPosition="end"
            size='large'
            variant="contained"
            type='submit'
          >
            Submit
          </LoadingButton>
        </Footer>
      </form>
    </Drawer>
  )
}

export default ProjectDrawer
