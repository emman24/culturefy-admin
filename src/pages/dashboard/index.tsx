// ** React Imports
import { useContext, useEffect } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { useEmployee } from 'src/@core/hooks/form/useEmployee'
import { useClient } from 'src/@core/hooks/form/useClient'
import { useAssignmentType } from 'src/@core/hooks/form/useAssignmentType'
import { useLabel } from 'src/@core/hooks/form/useLabel'

const ACLPage = () => {

    // ** Hooks
    const ability = useContext(AbilityContext)

    const { getEmployees } = useEmployee(null)
    const { getClients } = useClient(null)
    const { getAssignmentTypes } = useAssignmentType(null)
    const { getReportLabels } = useLabel(null)

    useEffect(() => {
        (function () {
            Promise.all([getEmployees({}), getClients({}), getAssignmentTypes({}), getReportLabels({})])
                .then(() => {
                    console.log('====================================');
                    console.log("Meta API done");
                    console.log('====================================');
                })
        })()
    }, [])

    return (
        <Grid container spacing={6}>
            <Grid item md={6} xs={12}>
                <Card>
                    <CardHeader title='Common' />
                    <CardContent>
                        <Typography sx={{ mb: 4 }}>Dashboard</Typography>
                        <Typography sx={{ color: 'primary.main' }}>Squabble</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

ACLPage.acl = {
    action: 'itsHaveAccess',
    subject: 'dashboard-page'
}

export default ACLPage
