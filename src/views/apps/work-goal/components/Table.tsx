// @ts-nocheck
import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Menu from '@mui/material/Menu'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import CogOutline from 'mdi-material-ui/CogOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { useEmployee } from 'src/@core/hooks/form/useEmployee'

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** Types Imports
import { IPositionGoal } from 'src/types/apps/positionGoal'
import { RootState, AppDispatch } from 'src/store'
import { fetchAllAction } from 'src/store/apps/businessUser'


import { useWorkGoal } from 'src/@core/hooks/form/useWorkGoal'


interface CellType {
  row: IPositionGoal
}


// ** renders client column

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'title',
    headerName: 'title',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.title ? row.title : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'description',
    headerName: 'description',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.description ? row.description : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row._id} />
  }

]

const RowOptions = ({ id }: { id: string }) => {

  const { deleteWorkGoal } = useWorkGoal(null);
  // ** Hooks
  const { handleDrawer, handleModal } = useToggleDrawer()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = async () => {
    deleteWorkGoal(id)
    // console.log('id ',id);
    handleRowOptionsClose()
  }

  const handleUpdate = () => {
    handleRowOptionsClose()
    console.log('id ',id);
    handleDrawer(id)
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <DotsVertical />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleUpdate}>
          <PencilOutline fontSize='small' sx={{ mr: 2 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteOutline fontSize='small' sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Menu>
    </>
  )
}

const EmployeeTable = () => {
  // ** State
  const [pageSize, setPageSize] = useState<number>(10)
  const { getWorkGoal, store: { workGoals } } = useWorkGoal(null);
  
  useEffect(() => {
    getWorkGoal();
  }, [])


  console.log('workGoals ', workGoals)
  // console.log('store2 ', store2 )

  return (
    <DataGrid
      autoHeight
      getRowId={(row) => row?._id}
      rows={ workGoals || []}
      columns={columns}
      checkboxSelection
      pageSize={pageSize}
      disableSelectionOnClick
      rowsPerPageOptions={[10, 25, 50]}
      sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
      onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
      components={{ Toolbar: GridToolbar }}
    />
  )
}

export default EmployeeTable
