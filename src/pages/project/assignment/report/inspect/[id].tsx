
import React from 'react'
import { useRouter } from 'next/router'

// ** MUI
import Grid from '@mui/material/Grid'

// ** Custom
import LocationBreadCrumb from 'src/@core/components/common/LocationBreadCrumb'
import InspectReport from 'src/views/apps/report/components/InspectReport'

// ** Custom hooks
import { useReport } from 'src/@core/hooks/form/useReport'

const Page = () => {

    // // ** Hooks
    // const router = useRouter()
    // const { id } = router.query

    // useReport(`${id}`)

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <LocationBreadCrumb />
            </Grid>

            <Grid container item spacing={6}>
                <Grid item xs={12} >
                    <InspectReport />
                </Grid>
            </Grid>
        </Grid>
    )
}

Page.acl = {
    action: 'itsHaveAccess',
    subject: 'project-page'
}

export default Page
