// @ts-nocheck
// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

interface TableHeaderProps {
  value: string
  toggle: () => void
  handleFilter: (val: string) => void
}

const TableHeader = (props: TableHeaderProps) => {
  const { handleFilter, toggle, value } = props;

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'left' }}>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button sx={{ mb: 2 }} onClick={toggle} variant='contained'>
          Create Certificate
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
