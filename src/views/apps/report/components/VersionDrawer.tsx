
import { useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'

import { useSelector } from 'react-redux'
import _ from 'lodash'

// ** Third Party Imports
import { useReport } from 'src/@core/hooks/form/useReport'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

import ManagerMultiSelect from 'src/views/apps/employee/components/ManagerMultiSelect'
import InspectorMultiSelect from 'src/views/apps/employee/components/InspectorMultiSelect'
import LabelMultiSelect from 'src/views/apps/label/components/LabelMultiSelect'

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


const ReportDrawer = (props: SidebarAddUserType) => {

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    version_form: { control, reset, handleSubmit, setValue, getValues },
    version_images_handler,
    version_videos_handler,
    version_docs_handler,

    addReportVersion,

    store,
  } = useReport(null)

  const onSubmit = async (data: any) => {
    // console.log('====================================');
    // console.log(data, store.report.id);
    // console.log('====================================');
    // @ts-ignore
    await addReportVersion(store.report.id, data)
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
      sx={{ '& .MuiDrawer-paper': { width: 1000 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>
            {!serviceId ? "Add" : "Update"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12} style={{ marginTop: 8 }} >
              <InputField
                name={"name"}
                label='Update Name'
                placeholder='Enter name'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            {
              (_.isString(serviceId)) && (
                <Grid item xs={12}>
                  <Typography variant='h6'>Report Labels</Typography>
                  <LabelMultiSelect
                    labels={getValues('labels')}
                    // @ts-ignore
                    setLabels={(labels) => {
                      // @ts-ignore
                      setValue("labels", labels)
                    }}
                  />
                </Grid>
              )
            }

            {
              (_.isString(serviceId)) && (
                <Grid item xs={6}>
                  <Typography variant='h6'>Report Images</Typography>
                  {version_images_handler.fields.map((field, index) => (
                    <Grid item xs={12} style={{ marginTop: 8 }} >
                      <InputField
                        key={index}
                        name={`images.${index}.description`}
                        label='Image description'
                        placeholder='Enter Image description'
                        type='text-area'
                        //  @ts-ignore
                        control={control}
                      />
                    </Grid>
                  ))}
                  <Button
                    sx={{ marginY: 3 }}
                    fullWidth
                    size='small'
                    variant="contained"
                    type='button'
                    onClick={() => version_images_handler.append({ description: "" })}
                  >
                    +
                  </Button>
                </Grid>
              )
            }


            {
              (_.isString(serviceId)) && (
                <Grid item xs={6}>
                  <Typography variant='h6'>Report Video</Typography>
                  {version_videos_handler.fields.map((field, index) => (
                    <Grid item xs={12} style={{ marginTop: 8 }} >
                      <InputField
                        key={index}
                        name={`videos.${index}.description`}
                        label='video description'
                        placeholder='Enter video description'
                        type='text-area'
                        //  @ts-ignore
                        control={control}
                      />
                    </Grid>
                  ))}
                  <Button
                    sx={{ marginY: 3 }}
                    fullWidth
                    size='small'
                    variant="contained"
                    type='button'
                    onClick={() => version_videos_handler.append({ description: "" })}
                  >
                    +
                  </Button>
                </Grid>
              )
            }

            {
              (_.isString(serviceId)) && (
                <Grid item xs={6}>
                  <Typography variant='h6'>Report Documents</Typography>
                  {version_docs_handler.fields.map((field, index) => (
                    <Grid item xs={12} style={{ marginTop: 8 }} >
                      <InputField
                        key={index}
                        name={`docs.${index}.description`}
                        label='Documents description'
                        placeholder='Enter documents description'
                        type='text-area'
                        //  @ts-ignore
                        control={control}
                      />
                    </Grid>
                  ))}
                  <Button
                    sx={{ marginY: 3 }}
                    fullWidth
                    size='small'
                    variant="contained"
                    type='button'
                    onClick={() => version_docs_handler.append({ description: "" })}
                  >
                    +
                  </Button>
                </Grid>
              )
            }

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

export default ReportDrawer
