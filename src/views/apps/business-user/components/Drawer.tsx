// @ts-nocheck
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
import { InputField, RadioField, Select } from 'src/@core/components/form'
import { SingleFileUploader, FileUploader } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { Trumpet } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import { useBusiness } from 'src/@core/hooks/form/useBusiness'

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
    addBusinessUser, updateBusinessUser,
    // store,
  } = useBusinessUser(serviceId)

  const { getBusiness , store } = useBusiness(null);

  useEffect(()=>{
    getBusiness();
  },[])
  // console.log('store getBusiness ', store.businesses);
  

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
      
      data = { ...data, permissions: ["VOTE_IN_POLLS", "CREATE_FOLDERS"] };
      await addBusinessUser(data);
    }
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  const rolesSelect = [
    {
      id: 0,
      name: 'Admin',
      value: 'ADMIN',
    },
    {
      id: 0,
      name: 'User',
      value: 'USER',
    },
  ]

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
                label='First Name'
                placeholder='Enter first_name'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='last_name'
                label='Last Name'
                placeholder='Enter last_name'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='email'
                label='Email'
                placeholder='Enter email'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='date_of_birth'
                label='Date of Birth'
                placeholder='Enter date_of_birth'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='phone'
                label='Phone'
                placeholder='Enter Phone'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name='password'
                label='Password'
                placeholder='Enter Password'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <RadioField
                name='gender'
                label='Gender'
                options={[{ label: "Male", value: "MALE" }, { label: "Female", value: "FEMALE" }]}
                //  @ts-ignore
                control={control}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <InputField
                name='location'
                label='Location'
                placeholder='Enter Location'
                //  @ts-ignore
                control={control}
              />
            </Grid> */}

            <Grid item xs={12}>
              <Select
                name='business'
                label='Business Name'
                //  @ts-ignore
                control={control}
              // disabled={true}
              >
                {
                  store?.businesses?.map((business) => (
                    <MenuItem key={business._id} value={business._id}>{business.name}</MenuItem>
                  ))
                }
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Select
                name='role'
                label='Role'
                //  @ts-ignore
                control={control}
              // disabled={true}
              >
                {
                  rolesSelect.map((role) => (
                    <MenuItem key={role.id} value={role.value}>{role.name}</MenuItem>
                  ))
                }
              </Select>
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
