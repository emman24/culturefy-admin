
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

import { usePossescards } from 'src/@core/hooks/form/usePossescards'

// ** import form support components
import { InputField, Select } from 'src/@core/components/form'
import { SingleFileUploader, FileUploader } from 'src/@core/components/form'
import { useReport } from 'src/@core/hooks/form/useReport'


// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Types Imports
import { Grid } from '@mui/material'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { Trumpet } from 'mdi-material-ui'
import { useEffect, useState } from 'react'
import FieldArrayCustom from 'src/@core/components/form/FieldArray'

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

const PossescardsDrawer = (props: SidebarAddUserType) => {

  const [fileUrl, setFileUrl] = useState('')
  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: { control, getValues, reset, handleSubmit, formState: { errors } },
    addPossesCard, updatePossesCard,
    store,
  } = usePossescards(serviceId)

  const handleUpdateAssesst = async (file: any) => {
    console.log(file.url);
    setFileUrl(file.url)
    // await updateReportAssesst(assesstId, { source })
  }

  const onSubmit = async (data: any) => {
    if (serviceId) {
      // await updateAssignmentType(serviceId, data)
      data = { ...data, points: fieldsArray }
      await updatePossesCard(serviceId, data);
    } else {
      data = { ...data, points: fieldsArray }
      await addPossesCard(data);
    }
    console.log('data ', data);
  }


  const handleClose = () => {
    reset()
    toggle()
  }

  const [fieldsArray, setFieldsArray] = useState(['']);

  useEffect(() => {
    if (store?.possescard?.points?.length) {
      setFieldsArray(store?.possescard?.points)
    }
  }, [store?.possescard])

  // console.log('fieldsArray', fieldsArray);  

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
            {!serviceId ? "Add Possescard" : "Update Possescard"}
          </Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4} >

            <Grid item xs={12}>
              <InputField
                name='title'
                label='Possescard Title'
                placeholder='Enter Title'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <FieldArrayCustom fieldsArray={fieldsArray} setFieldsArray={setFieldsArray} />
            </Grid>

            <Grid item xs={12}>

              <FileUploader
                name='image'
                //@ts-ignore
                control={control}
              />

              {/* <SingleFileUploader
                name='image'
                //@ts-ignore
                control={control}
                existFile={store?.possescard?.image}
                onUpload={(file) => {
                  handleUpdateAssesst(file)
                }}
              /> */}

            </Grid>
            <Grid item xs={12}>
              <InputField
                name='description'
                label='Possescard Description'
                placeholder='Enter Description'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='color'
                label='Possescard Color'
                placeholder='Enter Color'
                //  @ts-ignore
                control={control}
              />
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='text_color'
                label='Possescard Text Color'
                placeholder='Enter Text Color'
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

export default PossescardsDrawer
