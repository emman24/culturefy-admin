
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

import { useSelector } from 'react-redux'

// ** Third Party Imports
import { useBusinessUser } from 'src/@core/hooks/form/useBusinessUser'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'
import { SingleFileUploader, FileUploader } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { Trumpet } from 'mdi-material-ui'
import { useState } from 'react'

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

const EmployeeDrawer = (props: SidebarAddUserType) => {

  // const [fileUrl, setFileUrl] = useState('')
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: { control, reset, handleSubmit, formState: { errors } },
    addBusinessUser , updateBusinessUser,
    store,
  } = useBusinessUser(serviceId)

  const handleUpdateAssesst = async (file: any) => {
    // console.log(file.url);
    // setFileUrl(file.url)
    // await updateReportAssesst(assesstId, { source })
  }

  const onSubmit = async (data: any) => {

    if (serviceId) {
      // await updateAssignmentType(serviceId, data)
      await updateBusinessUser(serviceId, data);
    } else {
      // await addAssignmentType(data);
      // data = { ...data, logo: fileUrl };
      await addBusinessUser(data);
    }
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 600 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>
            {!serviceId ? "Add Business User" : "Update Business User"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12}>
              <InputField
                name='first_name'
                label='first_name'
                placeholder='Enter first_name'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='last_name'
                label='last_name'
                placeholder='Enter last_name'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='email'
                label='email'
                placeholder='Enter email'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='date_of_birth'
                label='date_of_birth'
                placeholder='Enter date_of_birth'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='phone'
                label='phone'
                placeholder='Enter phone'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name='password'
                label='password'
                placeholder='Enter password'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='gender'
                label='gender'
                placeholder='Enter gender'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='location'
                label='location'
                placeholder='Enter location'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='permissions'
                label='permissions'
                placeholder='Enter permissions'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='business_id'
                label='business_id'
                placeholder='Enter business_id'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='role'
                label='role'
                placeholder='Enter role'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            

          </Grid>

        </Box>
        <Footer>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <LoadingButton
            sx={{ mr: 3 }}
            // loading={store.status === 'pending'}
            // disabled={store.status === 'pending'}
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

export default EmployeeDrawer
