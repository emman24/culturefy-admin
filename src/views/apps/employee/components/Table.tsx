
import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { useEmployee } from 'src/@core/hooks/form/useEmployee'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Types Imports
import { EmployeeType, IEmployeeRoleIcons } from 'src/types/apps/employeeTypes'
import { RootState, AppDispatch } from 'src/store'

interface CellType {
    row: EmployeeType
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
const EmployeeRoleIcons: IEmployeeRoleIcons = {
    ADMIN: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
    INSPECTOR: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
    MANAGER: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
}

// ** renders client column
export const renderClient = (row: EmployeeType) => {
    if (row.image) {
        return (
            <AvatarWithImageLink href={`/employee/?employee=${row.id}`}>
                <CustomAvatar src={row.image} sx={{ mr: 3, width: 34, height: 34 }} />
            </AvatarWithImageLink>
        )
    } else {
        return (
            <AvatarWithoutImageLink href={`/employee/?employee=${row.id}`}>
                <CustomAvatar
                    skin='light'
                    color={row.avatarColor || 'primary'}
                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                >
                    {getInitials(row.fullName ? row.fullName : 'John Doe')}
                </CustomAvatar>
            </AvatarWithoutImageLink>
        )
    }
}

const columns = [
    {
        flex: 0.2,
        minWidth: 230,
        field: 'fullName',
        headerName: 'User',
        renderCell: ({ row }: CellType) => {
            const { id, fullName, username } = row

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderClient(row)}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Link href={`/apps/user/view/${id}`} passHref>
                            <Typography
                                noWrap
                                component='a'
                                variant='subtitle2'
                                sx={{ color: 'text.primary', textDecoration: 'none' }}
                            >
                                {fullName}
                            </Typography>
                        </Link>
                        <Link href={`/apps/user/view/${id}`} passHref>
                            <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                                @{username}
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 250,
        field: 'email',
        headerName: 'Email',
        renderCell: ({ row }: CellType) => {
            return (
                <Typography noWrap variant='body2'>
                    {row.email}
                </Typography>
            )
        }
    },
    {
        flex: 0.15,
        field: 'role_code',
        minWidth: 150,
        headerName: 'Role',
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {EmployeeRoleIcons[row.role_code]}
                    <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                        {row.role_code}
                    </Typography>
                </Box>
            )
        }
    },
    // {
    //   flex: 0.15,
    //   minWidth: 120,
    //   headerName: 'Plan',
    //   field: 'currentPlan',
    //   renderCell: ({ row }: CellType) => {
    //     return (
    //       <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
    //         {row.currentPlan}
    //       </Typography>
    //     )
    //   }
    // },
    // {
    //   flex: 0.1,
    //   minWidth: 110,
    //   field: 'status',
    //   headerName: 'Status',
    //   renderCell: ({ row }: CellType) => {
    //     return (
    //       <CustomChip
    //         skin='light'
    //         size='small'
    //         label={row.status}
    //         color={userStatusObj[row.status]}
    //         sx={{ textTransform: 'capitalize', '& .MuiChip-label': { lineHeight: '18px' } }}
    //       />
    //     )
    //   }
    // },
    {
        flex: 0.1,
        minWidth: 90,
        sortable: false,
        field: 'actions',
        headerName: 'Actions',
        renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
    }
]

const RowOptions = ({ id }: { id: string }) => {
    // ** Hooks
    const { handleDrawer, handleModal } = useToggleDrawer();

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
        handleModal(id)
        handleRowOptionsClose()
    }

    const handleUpdate = () => handleDrawer(id)

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
                <MenuItem sx={{ p: 0 }}>
                    <Link href={`/apps/user/view/${id}`} passHref>
                        <MenuItemLink>
                            <EyeOutline fontSize='small' sx={{ mr: 2 }} />
                            View
                        </MenuItemLink>
                    </Link>
                </MenuItem>
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

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.employee)

    return (
        <DataGrid
            autoHeight
            rows={store.employees || []}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
            // components={{ Toolbar: GridToolbar }}
        />
    )
}

export default EmployeeTable
