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
// @ts-nocheck

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'


// ** Import Custom hooks
import useToggleDrawer from 'src/@core/hooks/useToggleDrawer'

// ** Types Imports
import { IUser } from 'src/types/apps/user'

import { useCertificate } from 'src/@core/hooks/form/useCertificate'
import { Button } from '@mui/material'


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
  // title
  {
    flex: 0.2,
    minWidth: 200,
    field: 'title',
    headerName: 'title',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.title}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'course',
    headerName: 'course',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.course?.title}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'require_test',
    headerName: 'require test',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.require_test ? 'Yes' : 'No'}
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
    // renderCell: ({ row }: CellType) => <RowOptions id={row._id} />
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {
            row.require_test ?
              <Link href={`/update-certificate-test/${row._id}`}>
                <Button
                  variant='contained'
                  color='secondary'
                  size='small'
                  id={row._id}
                >
                  Update Test
                </Button>
              </Link>
              : ''
          }
        </Typography>
      )
    }
  }

]

const RowOptions = ({ id }: { id: string }) => {

  const { deleteCertificate } = useCertificate(null);
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
    deleteCertificate(id)
    // console.log('id ',id);
    handleRowOptionsClose()
  }

  const handleUpdate = () => {
    handleRowOptionsClose()
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
  const { getCertificates, store: { certificates } } = useCertificate(null);

  useEffect(() => {
    getCertificates();
  }, [])


  console.log('certificates ', certificates)

  return (
    <DataGrid
      autoHeight
      getRowId={(row) => row?._id}
      rows={certificates || []}
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
