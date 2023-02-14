// // @ts-nocheck
// // ** MUI Imports
// import Drawer from '@mui/material/Drawer'
// import Button from '@mui/material/Button'
// import LoadingButton from '@mui/lab/LoadingButton'
// import { styled } from '@mui/material/styles'
// import Typography from '@mui/material/Typography'
// import Box, { BoxProps } from '@mui/material/Box'
// import MenuItem from '@mui/material/MenuItem'

// import { useSelector } from 'react-redux'

// // ** Third Party Imports

// import { useCourseVideo } from 'src/@core/hooks/form/useCourseVideo'


// // ** import form support components
// import { InputField, Select } from 'src/@core/components/form'
// import { SingleFileUploader, FileUploader } from 'src/@core/components/form'


// // ** Icons Imports
// import Close from 'mdi-material-ui/Close'

// // ** Types Imports
// import { Grid } from '@mui/material'

// // ** Types Imports
// import { RootState, AppDispatch } from 'src/store'
// import { Trumpet } from 'mdi-material-ui'
// import { useEffect, useState } from 'react'
// import FieldArrayCustom from 'src/@core/components/form/FieldArray'

// interface SidebarAddUserType {
//   open: boolean
//   toggle: () => void
//   serviceId: string | null
// }

// const Header = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(3, 4),
//   justifyContent: 'space-between',
//   backgroundColor: theme.palette.background.default
// }))

// const Footer = styled(Box)<BoxProps>(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(3, 4),
//   justifyContent: 'space-between',
//   backgroundColor: theme.palette.background.default
// }))

// const CourseVideoDrawer = (props: SidebarAddUserType) => {

//   // ** Props
//   const { open, toggle, serviceId } = props

//   // ** Hooks
//   const {
//     form: { control, getValues, reset, handleSubmit, formState: { errors } },
//     addCourse, updateCourse,
//     store,
//   } = useCourseVideo(serviceId)


//   const onSubmit =  (data: any) => {
//     console.log('data in if ', data);
//     if (serviceId) {
//       // await updateAssignmentType(serviceId, data)
//       // await updateCourse(serviceId, data);
//       console.log('data in if ', data);
//     } else {
//       // await addCourse(data);
//       console.log('data in else ', data);
//     }
//     console.log('data out ', data);
//   }


//   const handleClose = () => {
//     reset();
//     toggle();
//   }


//   return (
//     <Drawer
//       open={open}
//       anchor='right'
//       variant='temporary'
//       onClose={handleClose}
//       ModalProps={{ keepMounted: true }}
//       sx={{ '& .MuiDrawer-paper': { width: 600 } }}
//     >
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <Header>
//           <Typography variant='h6'>
//             {!serviceId ? "Add Possescard" : "Update Possescard"}
//           </Typography>
//           <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
//         </Header>
//         <Box sx={{ p: 5 }}>
//           <Grid container spacing={4} >

//             <Grid item xs={12}>
//               <InputField
//                 name='videoTitle'
//                 label='Course Video Title'
//                 placeholder='Enter Video Title'
//                 //  @ts-ignore
//                 control={control}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <FileUploader
//                 name='source'
//                 //@ts-ignore
//                 control={control}
//                 label='source'
//               />
//             </Grid>

//           </Grid>

//         </Box>
//         <Footer>
//           <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
//             Cancel
//           </Button>
//           <LoadingButton
//             sx={{ mr: 3 }}
//             // loading={store.status === 'pending'}
//             // disabled={store.status === 'pending'}
//             loadingPosition="end"
//             size='large'
//             variant="contained"
//             type='submit'
//           >
//             Submit
//           </LoadingButton>
//         </Footer>
//       </form>
//     </Drawer>
//   )
// }

// export default CourseVideoDrawer




















// @ts-nocheck
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

import FallbackSpinner from 'src/@core/components/spinner'

import { useCourse } from 'src/@core/hooks/form/useCourse'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'
import { SingleFileUploader, FileUploader } from 'src/@core/components/form'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid, TextField } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import uploadToCloudinary from 'src/@core/utils/cloudinary'
import { useCourseVideo } from 'src/@core/hooks/form/useCourseVideo'
import { minHeight } from '@mui/system'
import { uploadToS3 } from 'src/@core/utils/uploadToS3'
import { object } from 'yup'


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

  const { open, toggle, serviceId } = props
  const [courseVideo, setCourseVideo] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('initial')
  const [currentUploadingId, setCurrentUploadingId] = useState('')

  // ** Hooks
  const {
    form: { control, getValues, reset, handleSubmit, formState: { errors } },
    addCourse, updateCourse,
    store: { course },
  } = useCourse(serviceId)

  const { updateCourseVideo } = useCourseVideo(serviceId);

  console.log(course , "coursecoursecoursecoursecoursecourse")

  useEffect(() => {
    setCourseVideo(course?.courseVideo)
  }, [course])




  const handleClose = () => {
    reset();
    toggle();
  }



  const onValueChange = (e, item) => {
    let index = courseVideo.indexOf(item);
    let arrCourseVideos = [...courseVideo]
    arrCourseVideos[index] = { ...arrCourseVideos[index], [e.target.name]: e.target.name !== 'source' ? e.target.value : e.target.files[0] }
    setCourseVideo(arrCourseVideos);
  }

  const onUpload = async (item) => {
    // console.log('item ',item)
    setCurrentUploadingId(item._id)
    setUploadStatus('pending')
    if( typeof item.source === 'object'){
      const url = await uploadToS3(item.source);
      updateCourseVideo(item._id, { ...item, source: url?.data?.source })
      setUploadStatus('success')
      return;
    }
    updateCourseVideo(item._id, {...item })
    setUploadStatus('success')
  }


  // console.log('course  ', course)
  console.log('uploadStatus  ', uploadStatus)


  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: 600 } }}
    >
      <form>
        <Header>
          <Typography variant='h6'>
            {!serviceId ? "Add Course Video" : "Update Course Video"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>

        {
          courseVideo?.length > 0 ?
            courseVideo?.map((course_video) => {
              return (
                <Box sx={{ p: 5 }} key={course_video._id}>
                  <Grid container spacing={4} >

                    <Grid item xs={6}>
                      <TextField
                        onChange={(e) => onValueChange(e, course_video)}
                        name='videoTitle'
                        value={course_video.videoTitle}
                        label='Title'
                        fullWidth
                      />

                    </Grid>

                    <Grid item xs={6}>
                      <div>
                        <Button
                          sx={{ marginLeft: 'auto', width:'100%', minHeight: '55px' }}
                          size='large'
                          variant="outlined"
                          type='button'
                          color='secondary'
                          fullWidth
                        >
                          <label htmlFor={course_video._id}>
                            <input type='file' name='source' id={course_video._id} style={{ width: '0' }} onChange={(e) => onValueChange(e, course_video)} />
                            Upload Video
                            
                          </label>
                        </Button>
                      </div>
                    </Grid>
                    
                    <Grid item xs={6}>
                      <Button
                        sx={{ marginLeft: 'auto' }}
                        size='large'
                        variant="contained"
                        type='button'
                        onClick={() => onUpload(course_video)}
                      >
                        {
                          uploadStatus === 'pending' && currentUploadingId===course_video._id ? 'Uploading...' : 'Upload'
                        }
                        
                      </Button>
                    </Grid>

                    <Grid item xs={6}>
                    { course_video?.source?.name ? 
                    course_video?.source?.name : 
                    course_video?.source.split('/').pop() 
                    // ''
                    }
                    </Grid>

                  </Grid>
                </Box>
              )
            })
            :
            ''
        }
        {/* {
          uploadStatus === 'pending' ?
          <FallbackSpinner />
          : <FallbackSpinner />
        } */}


      </form>
    </Drawer>
  )
}

export default CourseDrawer

