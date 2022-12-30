// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

// ** Custom commponents
import ToggleView from 'src/@core/components/common/ToggleView'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleExport: () => void
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleExport, toggle, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'left' }}>
      <Button
        sx={{ mr: 4, mb: 2 }}
        color='secondary'
        variant='outlined'
        startIcon={<ExportVariant fontSize='small' />}
        onClick={() => handleExport()}
      >
        Export
      </Button>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search User'
          onChange={e => handleExport(e.target.value)}
        /> */}

        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          Add Client
        </Button>
        <ToggleView />
      </Box>
    </Box>
  )
}

export default TableHeader
