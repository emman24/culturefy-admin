// @ts-nocheck
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'


// ** Third Party Imports
import { useBrandAssets } from 'src/@core/hooks/form/useBrandAssets'


// ** import form support components
import { Select } from 'src/@core/components/form'
import { FileUploader } from 'src/@core/components/form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

// ** Types Imports
import { useEffect, useState } from 'react'
import FieldArrayCustom from 'src/@core/components/form/FieldArray'
import { useBusiness } from 'src/@core/hooks/form/useBusiness'

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

  const [colorsArray, setColorsArray] = useState(['']);

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: { control, reset, handleSubmit, formState: { errors } },
     addBrandAssets, updateBrandAssets,
    store: { brand_asset },
  } = useBrandAssets(serviceId)

  const { getBusiness, store:{ businesses } } = useBusiness();


  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      colors: colorsArray
    }
    console.log('body ', body);
    if (serviceId) {
      await updateBrandAssets(serviceId, body);
    } else {
      await addBrandAssets(body);
    }
  }


  useEffect(()=>{
    if(!serviceId) return;
    setColorsArray(brand_asset.colors);
     
  },[serviceId])

  const handleClose = () => {
    reset()
    toggle()
    setColorsArray([''])
  }

  // console.log('colorsArray ', colorsArray);


  useEffect(()=>{
    getBusiness();
  },[])


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
            {!serviceId ? "Add Brand Assets" : "Update Brand Assets"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12}>
              <Select
                name='business'
                label='Select Business'
                //  @ts-ignore
                control={control}
              // disabled={true}
              >
                {businesses?.map(item => (
                  <MenuItem key={item.name} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid item xs={12}>
              <div style={{ margin: '10px 0 10px 10px' }}>Colors</div>
              <FieldArrayCustom fieldsArray={colorsArray} setFieldsArray={setColorsArray} />
            </Grid>

            <Grid item xs={12}>
              <div style={{ margin: '10px 0 10px 10px' }}>Logos</div>
              <FileUploader
                name='logos'
                //@ts-ignore
                multiple
                maxFiles={5}
                control={control}
              />

            </Grid>


            <Grid item xs={12}>
              <div style={{ margin: '10px 0 10px 10px' }}>Fonts</div>
              <FileUploader
                name='fonts'
                //@ts-ignore
                maxFiles={5}
                multiple
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
            loadingPosition="end"
            size='large'
            variant="contained"
            type='submit'
          >
            Submit ss
          </LoadingButton>
        </Footer>
      </form>
    </Drawer>
  )
}

export default EmployeeDrawer
