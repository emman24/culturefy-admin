// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import FormHelperText from '@mui/material/FormHelperText'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'

// ** Third Party Imports
import { useClient } from 'src/@core/hooks/form/useClient'

// ** import form support components
import { InputField, CountrySelect, FileUploader } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'

import Map from 'src/@core/components/map'

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

const ClientDrawer = (props: SidebarAddUserType) => {
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const {
    form: {
      control,
      reset,
      handleSubmit,
      formState: { errors, touchedFields },
      setValue,
    },
    store,
    addClient,
    updateClient
  } = useClient(serviceId)

  const onSubmit = async (data: any) => {
    if (serviceId) {
      await updateClient(serviceId, data)
    } else {
      await addClient(data)
    }
  }

  const handleClose = () => {
    toggle()
    reset()
  }
  // console.log("control data", control)
  // AIzaSyBKQvrSPY-utxecgP6d95esqkS4SM0neSs
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
          <Typography variant='h6'>{!serviceId ? 'Add Client' : 'Update Client'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5, marginBottom: 60 }}>
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Client Details
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='client_name'
                  label='Client name'
                  placeholder='Enter client name'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='client_email'
                  label='Client email'
                  placeholder='Enter client email'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='client_phone'
                  label='Client phone'
                  placeholder='Enter client phone'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='website'
                  label='Client Website'
                  placeholder='Enter client website'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600, marginBottom: 3 }}>
                  Client image / logo
                </Typography>
                <FileUploader
                  name='client_image'
                  //@ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  Address Details
                </Typography>
              </Grid>

              {/* <Grid item xs={12} sm={6}>
                <InputField
                  name='business_name'
                  label='Business name'
                  placeholder='Enter business name'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <InputField
                  name='business_website'
                  label='Business website'
                  placeholder='Enter business website'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name='business_address'
                  label='Business address'
                  placeholder='Enter business address'
                  //  @ts-ignore
                  control={control}
                />
              </Grid> */}

              <Grid item xs={12}>
                <CountrySelect
                  name='country'
                  label='Country'
                  placeholder='Enter country'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name='state'
                  label='State'
                  placeholder='Enter state'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name='city'
                  label='City'
                  placeholder='Enter city'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12}>
                <InputField
                  name='zip'
                  label='Zip code'
                  placeholder='Enter zip'
                  //  @ts-ignore
                  control={control}
                />
              </Grid>

              <Grid item xs={12} >
                <Map
                  onSelectLocation={(e: any) => {
                    setValue('longitude', `${e.lng}`)
                    setValue('latitude', `${e.lat}`)
                  }}
                />
                {(errors.latitude || errors.longitude) && (
                  <FormHelperText sx={{ color: 'error.main' }} id={`validation-schema-location`}>
                    Location required
                  </FormHelperText>
                )}
              </Grid>

              {/* <CountrySelect
                name='country'
                //  @ts-ignore
                control={control}
              />
              <StateSelect
                name='state'
                //  @ts-ignore
                control={control}
                selectedCountry={getValues('country')}
              /> */}
            </Grid>
          </CardContent>
        </Box>
        <Footer sx={{ marginTop: 'calc(10% + 60px)', position: 'fixed', bottom: 0, width: "700px", zIndex: 10 }}>
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

export default ClientDrawer
