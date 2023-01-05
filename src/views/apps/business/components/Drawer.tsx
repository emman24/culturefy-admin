
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
import { SingleFileUploader } from 'src/@core/components/form'

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

  const [fileUrl , setFileUrl] = useState('')
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: { control, reset, handleSubmit, formState: { errors } },
    addBusiness,
    store,
  } = useBusiness(serviceId)

  const handleUpdateAssesst = async (file:any) => {
    console.log(file.url);
    setFileUrl(file.url)
    // await updateReportAssesst(assesstId, { source })
  }

  const onSubmit = async (data: any) => {
    // if (serviceId) {
    //   await updateAssignmentType(serviceId, data)
    // } else {
    //   await addAssignmentType(data);
    // }
    data = {...data,logo:fileUrl}
    addBusiness(data)
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
            {!serviceId ? "Add Assignment Type" : "Update Assignment Type"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

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
              <SingleFileUploader
                maxFiles={1}
                maxSize={5000000}
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                existFile={true}
                onUpload={(file) => {
                  handleUpdateAssesst(file)
                }}
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
            loading={store.status === 'pending'}
            disabled={store.status === 'pending'}
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
