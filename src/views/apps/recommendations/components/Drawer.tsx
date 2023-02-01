// @ts-nocheck
// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import LoadingButton from '@mui/lab/LoadingButton'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import { TextField } from '@mui/material'
import { Autocomplete, Checkbox } from '@mui/material'

import { useSelector } from 'react-redux'

// ** Third Party Imports

import { usePossescards } from 'src/@core/hooks/form/usePossescards'
import { useRecommendations } from 'src/@core/hooks/form/useRecommendations'
import { usePositionGoal } from 'src/@core/hooks/form/usePositionGoal'

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
import { TextBox, TextBoxMultiple, Trumpet } from 'mdi-material-ui'
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
  const [goals, setGoals] = useState([''])

  // ** Props
  const { open, toggle, serviceId } = props

  // ** Hooks
  const {
    form: {
      control,
      getValues,
      reset,
      handleSubmit,
      formState: { errors }
    },
    addRecommendation,
    deleteRecommendation,
    updateRecommendation,
    store
  } = useRecommendations(serviceId)

  console.log(errors, "==============================");


  const handleUpdateAssesst = async (file: any) => {
    console.log(file.url)
    setFileUrl(file.url)
    // await updateReportAssesst(assesstId, { source })
  }

  const onSubmit = async (data: any) => {
    if (serviceId) {
      await updateAssignmentType(serviceId, data)
      data = { ...data, goals: goals }
      await updateRecommendation(serviceId, data)
      console.log('data updateRecommendation', data);

    } else {
      data = { ...data, goals: goals }
      await addRecommendation(data)
      console.log('data addRecommendation ', data);
    }
    // console.log('data ', data)
  }

  const handleClose = () => {
    reset()
    toggle()
  }

  const [fieldsArray, setFieldsArray] = useState([''])


  // console.log(goals, 'goal;s')
  const {
    getpositionGoal,
    store: { positionGoals }
  } = usePositionGoal(null)

  useEffect(() => {
    getpositionGoal()
  }, [])

  // console.log('fieldsArray', fieldsArray);

  //function
  const functionData = [
    { name: 'Learning', value: 'LEARNING' },
    { name: 'Culture Check', value: 'CULTURE_CHECK' },
    { name: 'Rewards', value: 'REWARDS' },
    { name: 'Community', value: 'COMMUNITY' },
    { name: 'Campaigns', value: 'CAMPAIGNS' }
  ]
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
          <Typography variant='h6'>{!serviceId ? 'Add Recommendation' : 'Update Recommendation'}</Typography>
          <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
        </Header>
        <Box sx={{ p: 5 }}>
          <Grid container spacing={4}>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                id='checkboxes-tags-demo'
                options={positionGoals}
                disableCloseOnSelect
                getOptionLabel={option => option.title}
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props}>
                      <Checkbox
                        // icon={icon}
                        // checkedIcon={Checkbox}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )
                }}
                onChange={(e, val) => setGoals(val.map(item => item._id))}
                style={{ width: '100%' }}
                renderInput={params => <TextField {...params} label='Select Goals' placeholder='Goals' />}
              />
            </Grid>

            <Grid item xs={12}>
              <Select
                name='function'
                label='Select Function'
                //  @ts-ignore
                control={control}
              // disabled={true}
              >
                {functionData?.map(item => (
                  <MenuItem key={item.name} value={item.value}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputField
                name='title'
                label='Action Title'
                placeholder='Enter Title'
                //  @ts-ignore
                control={control}
              />
            </Grid>

            <Grid item xs={12}>
              <InputField
                name='description'
                label='Action Description'
                placeholder='Enter Description'
                type='text-area'
                fullWidth
                multiline={true}
                minRow={5}
                rows={5}
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
            loadingPosition='end'
            size='large'
            variant='contained'
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
