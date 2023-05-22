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
import { useBusiness } from 'src/@core/hooks/form/useBusiness'

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
  const [fileUrl, setFileUrl] = useState('')
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
    addBusiness,
    updateBusiness,
    store
  } = useBusiness(serviceId)

  const handleUpdateAssesst = async (file: any) => {
    console.log(file.url)
    setFileUrl(file.url)
    // await updateReportAssesst(assesstId, { source })
  }

  const onSubmit = async (data: any) => {
    if (serviceId) {
      // await updateAssignmentType(serviceId, data)
      await updateBusiness(serviceId, data)
    } else {
      // await addAssignmentType(data);
      console.log('data addBusiness ', data)

      const urlAuth = `${v3API}/authentication/token`
      const configAuth = {
        headers: {
          'x-server-key': xServerKey
        },
        params: {
          userId: 'tessstt'
        }
      }
      const responseAuth = await axios(urlAuth, configAuth)

      const url = `${v3API}/sessions`
      const response = await axios.post(
        url,
        {
          authToken: responseAuth.data,
          userId: 'tessstt',
          deviceId: 'tessstt',
          displayName: 'tessstt'
        },
        {
          headers: {
            'x-api-key': xAPIKey
          }
        }
      )
      // {
      //   authToken: responseAuth.data,
      //   displayName: data?.name,
      //   isPublic: true,
      //   isOfficial: false,
      //   onlyAdminCanPost: false,
      //   description: 'test',
      //   tags: ['string'],
      //   metadata: {},
      //   avatarFileId: '0',
      //   userIds: [],
      //   categoryIds: [],
      //   isUniqueDisplayName: true,
      //   needApprovalOnPostCreation: false
      // },

      // const urlCommunties = `${v3API}/communities`
      // const responseCommunties = await axios.post(
      //   urlCommunties,
      //   {
      //     authToken: responseAuth.data,
      //     displayName: 'community name',
      //     isPublic: true,
      //     isOfficial: true,
      //     onlyAdminCanPost: false,
      //     description: 'string',
      //     categoryIds: ['string'],
      //     isUniqueDisplayName: false,
      //     needApprovalOnPostCreation: false
      //   },
      //   {
      //     headers: {
      //       'x-api-key': xAPIKey,
      //       Authorization: 'Bearer ' + response?.data?.accessToken
      //     }
      //   }
      // )

      // console.log('responseCommunties', responseCommunties)

      data.logo =
        'https://courses-culturefy.nyc3.digitaloceanspaces.com/Culturefy-Red.png769f0b90-006a-430f-a25b-cbf155ed4910'

      data.community_id = '646afc668565ab99638ec523'
      await addBusiness(data)
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
          <Typography variant='h6'>{!serviceId ? 'Add Business' : 'Update Business'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <InputField
                name='name'
                label='Business Name'
                placeholder='Enter Name'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <InputField
                name='logo'
                label='Business Logo'
                placeholder='Enter logo'
                //  @ts-ignore
                control={control}
              /> */}
              {/* <SingleFileUploader
                maxFiles={1}
                maxSize={5000000}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                existFile={file}
                onUpload={(file) => {
                  handleUpdateAssesst(file)
                }}
              /> */}
              <FileUploader
                name='logo'
                //@ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='email'
                label='Business Email'
                placeholder='Enter Email'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='website'
                label='Business Website'
                placeholder='Enter Website'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='location'
                label='Business Location'
                placeholder='Enter Location'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='facebook_link'
                label='Business Facebook Link'
                placeholder='Enter Facebook Link'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='linkedin_link'
                label='Business Linkedin Link'
                placeholder='Enter Linkedin Link'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='instagram_link'
                label='Business Instagram Link'
                placeholder='Enter Instagram Link'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='twitter_link'
                label='Business Twitter Link'
                placeholder='Enter Twitter Link'
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
