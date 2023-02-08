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

import { useCourse } from 'src/@core/hooks/form/useCourse'


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
import { useEffect, useState } from 'react'
import FieldArrayCustom from 'src/@core/components/form/FieldArray'
import { useAuth } from 'src/hooks/useAuth'

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

const CourseDrawer = (props: SidebarAddUserType) => {

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: { control, getValues, reset, handleSubmit, formState: { errors } },
    addCourse, updateCourse,
    store,
  } = useCourse(serviceId)

  const { user } = useAuth();

  // console.log('user ', user._id)

  const onSubmit =  async (data: any) => {
    if (serviceId) {
      // await updateAssignmentType(serviceId, data)
      await updateCourse(serviceId, {...data, status: 'PUBLIC', isPublish: true, instructor: user._id});
    } else {
      await addCourse({...data, status: 'PUBLIC', isPublish: true, instructor: user._id});
    }
  }


  const handleClose = () => {
    reset();
    toggle();
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
            {!serviceId ? "Add Course" : "Update Course"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12}>
              <InputField
                name='title'
                label='Course Title'
                placeholder='Enter Title'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name='number_of_lessons'
                label='Number Of Lessons'
                placeholder='Enter Number Of Lessons'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name='duration'
                label='Course Duration'
                placeholder='Enter Duration'
                //  @ts-ignore
                control={control}
              />
            </Grid>


            {/* <Grid item xs={12}>
              <InputField
                name='instructor'
                label='Course Instructor'
                placeholder='Enter Instructor'
                //  @ts-ignore
                control={control}
              />
            </Grid> */}

            <Grid item xs={12}>
              <InputField
                name='details'
                label='Course Details'
                placeholder='Enter Details'
                //  @ts-ignore
                control={control}
              />
            </Grid>


            <Grid item xs={12}>
              <FileUploader
                name='thumbnail'
                //@ts-ignore
                control={control}
                label='Thumbnail'
              />
            </Grid>

            {/* <Grid item xs={12}>
              <FileUploader
                name='attachment'
                //@ts-ignore
                control={control}
                label='Attachment'
              />
            </Grid> */}


            {/* <Grid item xs={12}>
              <Select
                name='function'
                label='Select Function'
                //  @ts-ignore
                control={control}
              >
                <MenuItem value={true}>
                  True
                </MenuItem>
                <MenuItem value={false}>
                  False
                </MenuItem>
              </Select>
            </Grid> */}

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

export default CourseDrawer
