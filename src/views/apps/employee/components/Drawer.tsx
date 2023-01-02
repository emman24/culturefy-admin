
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

import { Controller } from 'react-hook-form'

// ** Third Party Imports
import { useEmployee } from 'src/@core/hooks/form/useEmployee'

// ** import form support components
import { InputField, RadioField, FileUploader } from 'src/@core/components/form'

import InputPassword from 'src/@core/components/ControllForm/InputPassword'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

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

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: { control, reset, handleSubmit, formState: { errors }, setValue, getValues },
    addEmployee,
    updateEmployee,
    store
  } = useEmployee(serviceId)

  const onSubmit = async (data: any) => {
    delete data.confirm_password;
    if (serviceId) {
      await updateEmployee(serviceId, data)
    } else {
      await addEmployee(data);
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
          <Typography variant='h6'>
            {!serviceId ? "Add Employee" : "Update Employee"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12} sm={6}>
              <InputField
                name='first_name'
                label='first name'
                placeholder='Enter first name'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name='last_name'
                label='last name'
                placeholder='Enter last name'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name='email'
                label='Email'
                placeholder='Enter email'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <InputField
                name='phone'
                label='Phone Number'
                placeholder='Enter Phone Number'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <InputField
                name='password'
                label='Password'
                placeholder='Enter Password'
                //  @ts-ignore
                control={control}
              />
            </Grid> */}

            <Grid item xs={12} sm={6} >
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <InputPassword
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    label='Password'
                    placeholder='Enter password'
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <Controller
                name='confirm_password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
                  <InputPassword
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={Boolean(error)}
                    label='Confirm password'
                    placeholder='Enter Confirm Password'
                  />
                )}
              />
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <InputField
                name="confirm_password"
                label='Confirm Password'
                placeholder='Enter Confirm Password'
                //  @ts-ignore
                control={control}
              />
            </Grid> */}

            <Grid item xs={12} sm={6}>
              <InputField
                name='batchId'
                label='Batch Id #'
                placeholder='Enter batch id'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 3 }}>
                Employee image
              </Typography>
              <FileUploader
                name='image'
                //@ts-ignore
                control={control}
              />
            </Grid>

            {/* <InputField
            name='gender'
            label='gender'
            placeholder='Enter gender'
            //  @ts-ignore
            control={control}
          /> */}
            <Grid item xs={12}>
              <RadioField
                name='gender'
                label='Gender'
                options={[{ label: "Male", value: "MALE" }, { label: "Female", value: "FEMALE" }]}
                //  @ts-ignore
                control={control}
              />
            </Grid>

            {/* <InputField
            name='role'
            label='role'
            placeholder='Enter role'
            //  @ts-ignore
            control={control}
          /> */}
            <Grid item xs={12}>
              <RadioField
                name='role'
                label='Emplyee Role'
                options={[{ label: "Admin", value: "ADMIN" }, { label: "Manager", value: "MANAGER" }, { label: "Inspector", value: "INSPECTOR" }]}
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
