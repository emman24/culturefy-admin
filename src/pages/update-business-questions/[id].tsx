// ** React Imports
import React, { useState } from 'react'

import json from './survey-json'
import dynamic from 'next/dynamic'

// ** MUI Imports
import Grid from '@mui/material/Grid'
// import SurveyCreatorWidget from './SurveyCreator/SurveyCreator'
import { useRouter } from 'next/router'

const DynamicComponentWithNoSSR = dynamic(() => import('./SurveyCreator/SurveyCreator'), {
    ssr: false
})


// import { useBusinessQuestions } from 'src/@core/hooks/form/useBusinessQuestions'

const Page = () => {
    // const router = useRouter();
    // const { getBusinessQuestions } = useBusinessQuestions(null);
    // let businessId = router.query
    // console.log('businessId ', businessId.id)
    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <h2>Update Business Question</h2>
                <DynamicComponentWithNoSSR json={json} />
            </Grid>
        </Grid>
    )
}

Page.acl = {
    action: 'itsHaveAccess',
    subject: 'assignment-type-page'
}

export default Page
