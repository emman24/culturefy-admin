// ** React Imports
import React, { useEffect, useState } from 'react'

import json from '../../components/survey-json'
import dynamic from 'next/dynamic'

// ** MUI Imports
import Grid from '@mui/material/Grid'
// import SurveyCreatorWidget from './SurveyCreator/SurveyCreator'
import { useRouter } from 'next/router'

const DynamicComponentWithNoSSR = dynamic(() => import('src/views/apps/certificate-test/components/TestCreater'), {
    ssr: false
})

// import { useBusinessQuestions } from 'src/@core/hooks/form/useBusinessQuestions'
import { useCertificate } from 'src/@core/hooks/form/useCertificate'

const Page = () => {
    const [jsonData, setJsonData] = useState(null);
    const router = useRouter();
    const { id } = router.query || null || '';
    // const { getBusinessQuestions, store: { businessQuestions } } = useBusinessQuestions(null);

    const { getCertificateTest, store: { certificate_test } } = useCertificate(null);
    // console.log('businessId ', id)

    const certificateTestJSON = () => {
        if (typeof id !== 'string') return;
        getCertificateTest(id);
    }
    useEffect(() => {
        certificateTestJSON();
    }, [id])

    console.log('certificate_test ', certificate_test);


    useEffect(() => {
        // @ts-ignore
        if (!certificate_test?.survey) return;
        // @ts-ignore
        const dynJSON = JSON.parse(certificate_test?.survey)
        setJsonData(dynJSON);
    }, [certificate_test])

    console.log("jsonData ", jsonData)

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <h2>Update Certificate Test</h2>
                {
                    jsonData ?
                        <DynamicComponentWithNoSSR json={jsonData} />
                        :
                        'Loading...'
                    // <DynamicComponentWithNoSSR json={json} />
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
