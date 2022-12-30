
import { useEffect } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';


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

const labels = [
  {
    "id": "8b66a536-44bc-449f-824a-d2333b66bdb2",
    "name": "label 5",
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2022-10-23T00:07:54.977Z",
    "updatedAt": "2022-10-23T00:07:54.977Z"
  },
  {
    "id": "12285f3f-32a2-42cd-86e4-a2d68d67febc",
    "name": "label 4",
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2022-10-23T00:07:42.969Z",
    "updatedAt": "2022-10-23T00:07:42.969Z"
  },
  {
    "id": "cbde8236-5949-4e33-93d0-2dcbec997696",
    "name": "label 3",
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2022-10-23T00:07:37.214Z",
    "updatedAt": "2022-10-23T00:07:37.214Z"
  },
  {
    "id": "f05403a3-6e08-4830-a7fe-8245be93b18b",
    "name": "label 2",
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2022-10-23T00:07:31.332Z",
    "updatedAt": "2022-10-23T00:07:31.332Z"
  },
  {
    "id": "2ac9d7c7-d0cc-4613-ae20-7aa82aca0777",
    "name": "label 1",
    "isActive": true,
    "isDeleted": false,
    "createdAt": "2022-10-23T00:07:22.391Z",
    "updatedAt": "2022-10-23T00:07:22.391Z"
  }
]

const ReportDrawer = (props: SidebarAddUserType) => {

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const assignment_store = useSelector((state: RootState) => state.assignment)
  const {
    form: { control, reset, handleSubmit, setValue, getValues },
    images_handler,
    videos_handler,
    docs_handler,
    addReport,
    updateReport,
    store,
  } = useReport(serviceId)

  useEffect(() => {
    // @ts-ignore
    setValue("assignmentId", assignment_store?.assignment?.id)
  }, [assignment_store.assignment])

  const onSubmit = async (data: any) => {
    data.inspectors = data.inspectors.map((inspector: any) => ({ inspectorId: inspector.id }))
    if (serviceId) {
      // data.inspectorId = 
      // delete data.inspectors
      delete data.images
      delete data.videos
      delete data.docs
      await updateReport(serviceId, data)
    } else {
      await addReport(data);
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
      sx={{ '& .MuiDrawer-paper': { width: 700 } }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Header>
          <Typography variant='h6'>
            {!serviceId ? "Add Report" : "Update Report"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12}>
              <InputField
                name='name'
                label='Report name'
                placeholder='Enter Name'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <Select
                name='labelId'
                label='Select Label'
                //  @ts-ignore
                control={control}
              >
                {
                  labels.map((label) => (
                    <MenuItem key={label.id} value={label.id}>{label.name}</MenuItem>
                  ))
                }
              </Select>
            </Grid> */}

            <Grid item xs={12}>
              <Select
                name='assignmentId'
                label='Select Assignment'
                //  @ts-ignore
                control={control}
              >
                {
                  assignment_store.assignments.map((assignment) => (
                    <MenuItem key={assignment.id} value={assignment.id}>{assignment.name}</MenuItem>
                  ))
                }
              </Select>
            </Grid>

            <Grid item xs={12}>
              <InspectorMultiSelect
                inspectors={getValues('inspectors')}
                // @ts-ignore
                setInspectors={(inspectors) => {
                  // @ts-ignore
                  setValue("inspectors", inspectors)
                }}
              />
            </Grid>

            {
              (!_.isString(serviceId)) && (
                <Grid item xs={12}>
                  <Typography variant='h6'>Report Labels</Typography>
                  <LabelMultiSelect
                    labels={[]} // getValues('inspectors')
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
              (!_.isString(serviceId)) && (
                <Grid item xs={6}>
                  <Typography variant='h6'>Report Images</Typography>
                  {images_handler.fields.map((field, index) => (
                    <Grid key={field.id} item xs={12} style={{ marginTop: 8 }} >
                      <div style={{ display: 'flex' }} >
                        <InputField
                          key={index}
                          name={`images.${index}.description`}
                          label='Image description'
                          placeholder='Enter Image description'
                          type='text-area'
                          //  @ts-ignore
                          control={control}
                        />
                        <IconButton aria-label="delete" size='medium' onClick={() => images_handler.remove(index)} >
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </div>
                    </Grid>
                  ))}
                  <Button
                    sx={{ marginY: 3 }}
                    fullWidth
                    size='small'
                    variant="contained"
                    type='button'
                    onClick={() => images_handler.append({ description: "" })}
                  >
                    +
                  </Button>
                </Grid>
              )
            }


            {
              (!_.isString(serviceId)) && (
                <Grid item xs={6}>
                  <Typography variant='h6'>Report Video</Typography>
                  {videos_handler.fields.map((field, index) => (
                    <Grid item xs={12} style={{ marginTop: 8 }} >
                      <div style={{ display: 'flex' }} >
                        <InputField
                          key={field.id}
                          name={`videos.${index}.description`}
                          label='video description'
                          placeholder='Enter video description'
                          type='text-area'
                          //  @ts-ignore
                          control={control}
                        />
                        <IconButton aria-label="delete" size='medium' onClick={() => videos_handler.remove(index)} >
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </div>
                    </Grid>
                  ))}
                  <Button
                    sx={{ marginY: 3 }}
                    fullWidth
                    size='small'
                    variant="contained"
                    type='button'
                    onClick={() => videos_handler.append({ description: "" })}
                  >
                    +
                  </Button>
                </Grid>
              )
            }

            {
              (!_.isString(serviceId)) && (
                <Grid item xs={6}>
                  <Typography variant='h6'>Report Documents</Typography>
                  {docs_handler.fields.map((field, index) => (
                    <Grid item xs={12} style={{ marginTop: 8 }} >
                      <div style={{ display: 'flex' }} >

                        <InputField
                          key={field.id}
                          name={`docs.${index}.description`}
                          label='Documents description'
                          placeholder='Enter documents description'
                          type='text-area'
                          //  @ts-ignore
                          control={control}
                        />
                        <IconButton aria-label="delete" size='medium' onClick={() => docs_handler.remove(index)} >
                          <DeleteIcon fontSize="medium" />
                        </IconButton>
                      </div>
                    </Grid>
                  ))}
                  <Button
                    sx={{ marginY: 3 }}
                    fullWidth
                    size='small'
                    variant="contained"
                    type='button'
                    onClick={() => docs_handler.append({ description: "" })}
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
