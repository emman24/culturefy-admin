// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import TableHeader from 'src/@core/components/apps/users/components/TableHeader'
import Table from 'src/pages/businesses/table/Table'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'
import { useUser } from 'src/@core/hooks/apps/useUser'
import { Button } from '@mui/material'
import CustomModal from '@/components/modal'
import CreateBusiness from '@/components/forms/createBusiness'
import { useBusiness } from 'src/@core/hooks/apps/useBusiness'

const Page = () => {
  // ** Hooks
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer()
  const { getUsers, deleteUser, store } = useUser(null)
  const { addBusiness } = useBusiness(null);

  const [body, setBody] = useState({
    name: "Culturefy",
    logo: "https://outsourcingprojectscrm.com/uploads/settings/Inverse_Logo.png",
    email: "Culturefy@gmail.com",
    website: "Culturefy.com",
    location: "Pakistan",
    facebook_link: "facebook/Culturefy.com",
    linkedin_link: "linkedin/Culturefy.com",
    instagram_link: "instagram/Culturefy.com",
    twitter_link: "twitter/Culturefy.com"
  })

  const createBusiness = (body:any) => {
    addBusiness(body);
  }

  useEffect(() => {
    getUsers({ query: '' })
    return () => { }
  }, [])

  const handleDelete = () => {
    serviceId && deleteUser(serviceId)
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card style={{ marginBottom: 10 }}>
            <TableHeader value={''} handleFilter={() => { }} />
          </Card>
          <div className='d-flex justify-content-end'>
            <Button onClick={handleOpen} color="primary">Create Business</Button>
          </div>
          <Table />
        </Grid>
        <DeleteAlert title='user & company' onAgree={handleDelete} />
      </Grid>
      {/* <CustomModal handleOpen={handleOpen} open={open} handleClose={handleClose} component={ <CreateBusiness onClick={()=>createBusiness(body)} />} /> */}

      <CustomModal 
        handleOpen={handleOpen} 
        open={open} 
        handleClose={handleClose} 
        component={ <CreateBusiness />} 
      />

    </>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'employee-page'
}

export default Page