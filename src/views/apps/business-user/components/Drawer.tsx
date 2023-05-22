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

import axios from 'axios'
const v1API = 'https://api.us.amity.co/v1'
const v3API = 'https://api.us.amity.co/api/v3'
const v4API = 'https://api.us.amity.co/api/v4'

// const xAPIKey = 'b0efed533f8df46c18628b1c515e43dd835fd8e6bc366b2c'
// const xServerKey =
//   '138fbb2f22e5af367025ee9d6ff02c0d903fd74f560f87b71119197aa125645cd01015cd7b7236193b8fcc7a42a114864a399cd85b55dd2c88d6447055'

const xAPIKey = 'b0e8ee0b6c8af3304437df19040c408d810e8ee3ee313c2a'
const xServerKey =
  'd011cd21fa1fa78503c6bcf79e8af877331ac4e76653e4e95835acb814a7b3f186d35791bcc5c3535d2a8c6e5c840a07d0db9b02f948610173ff6d0762'

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
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors }
    },
    addBusinessUser,
    updateBusinessUser
    // store,
  } = useBusinessUser(serviceId)

  const { getBusiness, store } = useBusiness(null)

  useEffect(() => {
    getBusiness()
  }, [])
  // console.log('store getBusiness ', store.businesses);

  const handleUpdateAssesst = async (file: any) => {
    // console.log(file.url);
    // setFileUrl(file.url)
    // await updateReportAssesst(assesstId, { source })
  }

  const onSubmit = async (data: any) => {
    if (serviceId) {
      // await updateAssignmentType(serviceId, data)
      await updateBusinessUser(serviceId, data)
    } else {
      // await addAssignmentType(data);

      data = { ...data, permissions: ['VOTE_IN_POLLS', 'CREATE_FOLDERS'] }

      console.log('data', data)

      const urlAuth = `${v3API}/authentication/token`
      const configAuth = {
        headers: {
          'x-server-key': xServerKey
        },
        params: {
          userId: data.email
        }
      }
      const responseAuth = await axios(urlAuth, configAuth)

      console.log('responseAuth', responseAuth)

      const url = `${v3API}/sessions`
      const response = await axios.post(
        url,
        {
          authToken: responseAuth.data,
          userId: data.email,
          deviceId: data.email,
          displayName: data.first_name
        },
        {
          headers: {
            'x-api-key': xAPIKey
          }
        }
      )

      console.log('response', response)

      const selectedBusiness = store?.businesses?.filter(item => item._id === data.business)

      const urlCommunties = `${v3API}/communities/${selectedBusiness[0]?.community_id}/join`
      const responseCommunties = await axios.post(
        urlCommunties,
        { communityId: selectedBusiness[0].community_id },
        {
          headers: {
            'x-api-key': xAPIKey,
            Authorization: 'Bearer ' + response?.data?.accessToken
          }
        }
      )

      console.log('responseCommunties', responseCommunties)

      await addBusinessUser(data)
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
      value: 'ADMIN'
    },
    {
      id: 0,
      name: 'User',
      value: 'USER'
    }
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
          <Typography variant='h6'>{!serviceId ? 'Add Business User' : 'Update Business User'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
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
                options={[
                  { label: 'Male', value: 'MALE' },
                  { label: 'Female', value: 'FEMALE' }
                ]}
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
                {store?.businesses?.map(business => (
                  <MenuItem key={business._id} value={business._id}>
                    {business.name}
                  </MenuItem>
                ))}
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
                {rolesSelect.map(role => (
                  <MenuItem key={role.id} value={role.value}>
                    {role.name}
                  </MenuItem>
                ))}
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
            loadingPosition='end'
            size='large'
            variant='contained'
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
