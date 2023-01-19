// ** React Imports
import React, { useEffect, useState } from 'react'

import json from './survey-json'
import dynamic from 'next/dynamic'

// ** MUI Imports
import Grid from '@mui/material/Grid'
// import SurveyCreatorWidget from './SurveyCreator/SurveyCreator'
import { useRouter } from 'next/router'

const DynamicComponentWithNoSSR = dynamic(() => import('./SurveyCreator/SurveyCreator'), {
    ssr: false
})

import { useBusinessQuestions } from 'src/@core/hooks/form/useBusinessQuestions'

const Page = () => {
    const [ jsonData , setJsonData] = useState(null);
    const router = useRouter();
    const { id } = router.query || null || '';
    const { getBusinessQuestions, store: { businessQuestions } } = useBusinessQuestions(null);
    // console.log('businessId ', id)

    const businessQuesJSON = () => {
        if (!id) return;
        getBusinessQuestions(id);
    }
    useEffect(()=>{
        businessQuesJSON();
    },[id])

    useEffect(() => {
        if(businessQuestions !== ''){
            // @ts-ignore
            const dynJSON = JSON.parse(businessQuestions?.question) 
            setJsonData(dynJSON);
        }else return;
    }, [businessQuestions])


    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <h2>Update Business Question</h2>
                {
                    jsonData !== null ?  
                    <DynamicComponentWithNoSSR json={jsonData} />
                    :
                    // <DynamicComponentWithNoSSR json={json} />
                    'Loading...'
                }
            </Grid>
        </Grid>
    )
}

Page.acl = {
    action: 'itsHaveAccess',
    subject: 'assignment-type-page'
}

export default Page
