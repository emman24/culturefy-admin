// ** React Imports
import React from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import Table from 'src/views/apps/businessQuestions/components/Table'

const Page = () => {

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card>
                    <Table />
                </Card>
            </Grid>
        </Grid>
    )
}

Page.acl = {
    action: 'itsHaveAccess',
    subject: 'assignment-type-page'
}

export default Page
