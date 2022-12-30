
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

// ** Third Party Imports
import { useAssignment } from 'src/@core/hooks/form/useAssignment'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'
import ManagerMultiSelect from 'src/views/apps/employee/components/ManagerMultiSelect'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'

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

const AssignmentDrawer = (props: SidebarAddUserType) => {

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const project_store = useSelector((state: RootState) => state.project)
  const employee_store = useSelector((state: RootState) => state.employee)
  const type_store = useSelector((state: RootState) => state.assignment_type)
  const {
    form: { control, reset, handleSubmit, formState: { errors }, setValue },
    addAssignment,
    updateAssignment,
    store,
  } = useAssignment(serviceId)

  useEffect(() => {
    // @ts-ignore
    setValue("projectId", project_store?.project?.id)
  }, [project_store.project])


  const onSubmit = async (data: any) => {
    delete data.confirm_password;
    if (serviceId) {
      await updateAssignment(serviceId, data)
    } else {
      await addAssignment(data);
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
            {!serviceId ? "Add Assignment" : "Update Assignment"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12} sm={6}>
              <InputField
                name='name'
                label='Assignment name'
                placeholder='Enter Name'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name='description'
                label='description'
                placeholder='Enter description'
                type='text-area'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              {/* <Select
                name='managerId'
                label='Select manager'
                //  @ts-ignore
                control={control}
              >
                {
                  employee_store.employees.filter((emp) => emp.role_code === "MANAGER").map((employee) => (
                    <MenuItem key={employee.id} value={employee.id}>{employee.fullName}</MenuItem>
                  ))
                }
              </Select> */}
              <ManagerMultiSelect
                managers={[]}
                // @ts-ignore
                setManagers={(managers) => {
                  // @ts-ignore
                  setValue("managers", managers.map((m) => ({ managerId: m.id })))
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                name='projectId'
                label='Select project'
                //  @ts-ignore
                control={control}
              // disabled={true}
              >
                {
                  project_store.projects.map((project) => (
                    <MenuItem key={project.id} value={project.id}>{project.name}</MenuItem>
                  ))
                }
              </Select>
            </Grid>

            <Grid item xs={12}>
              <Select
                name='assignmentTypeId'
                label='Select type'
                //  @ts-ignore
                control={control}
              >
                {
                  type_store.types.map((type) => (
                    <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>
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

export default AssignmentDrawer
