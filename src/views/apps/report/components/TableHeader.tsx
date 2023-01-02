
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

import { IAssignment } from 'src/types/apps/assignment'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

// ** Custom commponents
import AssignmentSelect from 'src/@core/components/common/Filter/Assignment'

interface TableHeaderProps {
    value: string
    toggle: () => void
    handleExport: () => void
    handleAssignment: (assignment: IAssignment) => Promise<IAssignment>
}

const TableHeader = (props: TableHeaderProps) => {

    // ** Props
    const { handleExport, handleAssignment, toggle, value } = props
    const ability = useContext(AbilityContext)

    return (
        <Box sx={{ p: 5, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'left' }}>
            <Button
                sx={{ mr: 4 }}
                color='secondary'
                variant='outlined'
                startIcon={<ExportVariant fontSize='small' />}
                onClick={() => handleExport()}
            >
                Export
            </Button>

            {
                ability.can('allow', 'report-add') && (
                    <Button sx={{ mr: 4 }} onClick={toggle} variant='contained'>
                        Add Report
                    </Button>
                )
            }
            <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <AssignmentSelect onSelect={(a) => handleAssignment(a)} />
            </Box>
        </Box>
    )
}

export default TableHeader
