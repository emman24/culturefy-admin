// @ts-nocheck
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Third Party Imports
import { useCertificate } from 'src/@core/hooks/form/useCertificate'


// ** import form support components
import { InputField, Select } from 'src/@core/components/form'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid, MenuItem } from '@mui/material'

// ** Types Imports
import { useCourse } from 'src/@core/hooks/form/useCourse'
import { useEffect } from 'react'

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
    form: { control, reset, handleSubmit, formState: { errors } },
    addCertificate, updateCertificate,
    store,
  } = useCertificate(serviceId);

  const { getCourses, store: { courses } } = useCourse(null);


  const onSubmit = async (data: any) => {
    if (serviceId) {
      console.log('data ',data);      
      // await updateCertificate(serviceId, data);
    } else {
      console.log('data ',data);      
      // await addCertificate(data);
    }
  }


  const handleClose = () => {
    reset();
    toggle();
  }

  useEffect(() => {
    getCourses()
  }, [])

  console.log('courses ', courses);


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
            {!serviceId ? "Add Certificate" : "Update Certificate"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12}>
              <InputField
                name='title'
                label='Certificate Title'
                placeholder='Enter Title'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                name='course'
                label='Select Course'
                //  @ts-ignore
                control={control}
              // sx={{maxWidth:600, minWidth:600, right: 0, left:'unset !important', background:'red !important'}}
              >
                {courses?.map((course, index) => (
                  <MenuItem key={course._id} value={course._id} sx={{ maxWidth: 560, overflow: 'unset', whiteSpace: 'unset !important', alignItems: 'flex-start', gap: 4 }} >
                    <span>{index + 1}</span> {course.title}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            {/* <Grid item xs={12}>
              <InputField
                name='course'
                label='course'
                placeholder='course'
                //  @ts-ignore
                control={control}
              />
            </Grid> */}

          </Grid>
        </Box>
        <Footer>
          <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button type='submit' size='large' variant='contained' color='secondary'>
            Submit
          </Button>
          {/* <LoadingButton
            sx={{ mr: 3 }}
            // loading={store.status === 'pending'}
            // disabled={store.status === 'pending'}
            loadingPosition="end"
            size='large'
            variant="contained"
            type='submit'
          >
            Submit
          </LoadingButton> */}
        </Footer>
      </form>
    </Drawer>
  )
}

export default CourseDrawer
