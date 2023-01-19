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

// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** Types Imports
import { IUser } from 'src/types/apps/user'
import { RootState, AppDispatch } from 'src/store'


import { useBusinessUser } from 'src/@core/hooks/form/useBusinessUser'


interface CellType {
  row: IUser
}

// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  padding: theme.spacing(1.5, 4),
  color: theme.palette.text.primary
}))

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// ** Vars
const EmployeeRoleIcons: IUser = {
  ADMIN: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  INSPECTOR: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  MANAGER: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />
}

// ** renders client column
export const renderClient = (row: IUser) => {
  if (row.company && row.company.logo) {
    return (
      <AvatarWithImageLink href={`/users/view/${row.id}`}>
        <CustomAvatar src={row?.company?.logo} sx={{ mr: 3, width: 34, height: 34 }} />
      </AvatarWithImageLink>
    )
  } else {
    return (
      <AvatarWithoutImageLink href={`/users/view/${row.id}`}>
        <CustomAvatar
          skin='light'
          color={row.avatarColor || 'primary'}
          sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
        >
          {getInitials(row?.company?.name)}
        </CustomAvatar>
      </AvatarWithoutImageLink>
    )
  }
}

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'first_name',
    headerName: 'first_name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.first_name ? row.first_name : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'last_name',
    headerName: 'last_name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.last_name ? row.last_name : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'email',
    headerName: 'email',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.email ? row.email : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'date_of_birth',
    headerName: 'date_of_birth',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.date_of_birth ? row.date_of_birth : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'phone',
    headerName: 'phone',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.phone ? row.phone : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'gender',
    headerName: 'gender',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.gender ? row.gender : ``}
        </Typography>
      )
    }
  },
  // {
  //   flex: 0.2,
  //   minWidth: 200,
  //   field: 'location',
  //   headerName: 'location',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap variant='body2'>
  //         {row.location ? row.location : ``}
  //       </Typography>
  //     )
  //   }
  // },
  // {
  //   flex: 0.2,
  //   minWidth: 200,
  //   field: 'permissions',
  //   headerName: 'permissions',
  //   renderCell: ({ row }: CellType) => {
  //     return (
  //       <Typography noWrap variant='body2'>
  //         {row.permissions ? row.permissions : ``}
  //       </Typography>
  //     )
  //   }
  // },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'business',
    headerName: 'business',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.business ? row.business : ``}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'role',
    headerName: 'role',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.role ? row.role.code : ``}
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

  const { deleteBusinessUser } = useBusinessUser(null);
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
    deleteBusinessUser(id)
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
  const { getBusinessUser, store:{ businessUsers:{ users } } } = useBusinessUser(null);
  
  useEffect(() => {
    getBusinessUser();
  }, [])


  console.log('businessUsers ', users)
  // console.log('store2 ', store2 )

  return (
    <DataGrid
      autoHeight
      getRowId={(row) => row?._id}
      rows={ users || []}
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
