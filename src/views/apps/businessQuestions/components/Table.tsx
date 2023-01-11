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
import { IUser } from 'src/types/apps/user'
import { RootState, AppDispatch } from 'src/store'
import { fetchAllAction } from 'src/store/apps/business'


import { useBusiness } from 'src/@core/hooks/form/useBusiness'
import { Button } from '@mui/material'
import { useRouter } from 'next/router'


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


// const setBusinessIdInParam = (id: string) => {
//   const router = useRouter();
//   router.push(`businesses?id:${id}`)
// }

const columns = [
  {
    flex: 0.2,
    minWidth: 250,
    minHeight: 100,
    field: 'logo',
    headerName: 'logo',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          <div className='business-logo'>
            <img src={row.logo} alt='business_logo' />
          </div>
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: 'name',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.name}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'location',
    headerName: 'Location',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.location ? row.location : `No Location`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'website',
    headerName: 'website',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.website ? row.website : `No Website`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'facebook_link',
    headerName: 'Facebook Link',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.facebook_link ? row.facebook_link : `No Facebook Link`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'instagram_link',
    headerName: 'Instagram Link',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.instagram_link ? row.instagram_link : `No Instagram Link`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'linkedin_link',
    headerName: 'Linkedin Link',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.linkedin_link ? row.linkedin_link : `No Linkedin Link`}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'twitter_link',
    headerName: 'twitter_link',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.twitter_link ? row.twitter_link : `No Twitter Link`}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 250,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          <Link href={`/update-business-questions/${row._id}`}>
            <Button
              variant='contained'
              color='secondary'
              size='small'
              id={row._id}
            >
              Update Questions
            </Button>
          </Link>
        </Typography>
      )
    }
  }

]



const BusinessQuestionsTable = () => {
  const [pageSize, setPageSize] = useState<number>(10)
  const { getBusiness, store } = useBusiness(null);

  useEffect(() => {
    getBusiness();
  }, [])

  return (
    <DataGrid
      autoHeight
      getRowId={(row) => row?._id}
      rows={store?.businesses || []}
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

export default BusinessQuestionsTable
