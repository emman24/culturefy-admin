
import { useState, MouseEvent } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Menu from '@mui/material/Menu'
import { DataGrid } from '@mui/x-data-grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import DotsVertical from 'mdi-material-ui/DotsVertical'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

// ** Custom Components Imports
import CustomAvatar, { AvatarWithImageLink, AvatarWithoutImageLink } from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Store Imports
import { useSelector } from 'react-redux'


// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Types Imports
import { IAssignmentType } from 'src/types/apps/assignment-type'
import { RootState } from 'src/store'

interface CellType {
    row: IAssignmentType
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

// ** renders client column
const renderClient = (row: IAssignmentType) => {
    if (row.image) {
        return (
            <AvatarWithImageLink href={`/assignment-type/?id=${row.id}`}>
                <CustomAvatar src={row.image} sx={{ mr: 3, width: 34, height: 34 }} />
            </AvatarWithImageLink>
        )
    } else {
        return (
            <AvatarWithoutImageLink href={`/assignment-type/?id=${row.id}`}>
                <CustomAvatar
                    skin='light'
                    color={row.avatarColor || 'primary'}
                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                >
                    {getInitials(row.name ? row.name : 'Assignment')}
                </CustomAvatar>
            </AvatarWithoutImageLink>
        )
    }
}

const columns = [
    {
        flex: 0.2,
        minWidth: 230,
        field: 'name',
        headerName: 'Name',
        renderCell: ({ row }: CellType) => {

            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderClient(row)}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                        <Link href={`/assignment-type/?id=${row.id}`} passHref>
                            <Typography
                                noWrap
                                component='a'
                                variant='subtitle2'
                                sx={{ color: 'text.primary', textDecoration: 'none' }}
                            >
                                {row.name}
                            </Typography>
                        </Link>
                    </Box>
                </Box>
            )
        }
    },

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
                    <Link href={`/assignment-type/?assignment-type=${id}`} passHref>
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

const Table = () => {

    // ** State
    const [pageSize, setPageSize] = useState<number>(10)

    // ** Hooks
    const store = useSelector((state: RootState) => state.assignment_type)

    return (
        <DataGrid
            autoHeight
            rows={store.types || []}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
        />
    )
}

export default Table
