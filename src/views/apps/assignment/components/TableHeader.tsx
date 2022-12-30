
import { useContext } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { IProject } from 'src/types/apps/project'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'

// ** Custom commponents
import ToggleView from 'src/@core/components/common/ToggleView'
import ProductSelect from 'src/@core/components/common/Filter/Product'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleExport: () => void
  handleProduct: (project: IProject) => Promise<IProject>
}

const TableHeader = (props: TableHeaderProps) => {
  // ** Props
  const { handleExport, handleProduct, toggle, value } = props
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
        ability.can('allow', 'assignment-add') && (
          <Button sx={{ mr: 4 }} onClick={toggle} variant='contained'>
            Add Assignment
          </Button>
        )
      }
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search User'
          onChange={e => handleExport(e.target.value)}
        /> */}



        <ProductSelect onSelect={(p) => handleProduct(p)} />
        {/* <ToggleView /> */}
      </Box>
    </Box>
  )
}

export default TableHeader
