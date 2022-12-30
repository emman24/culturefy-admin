
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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Actions Imports
import { deleteClientAction, fetchClientAction } from 'src/store/apps/client'
import { useProject } from 'src/@core/hooks/form/useProject'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

// ** Types Imports
import { IProject } from 'src/types/apps/project'
import { RootState, AppDispatch } from 'src/store'

// ** Custom Components Imports
import CustomAvatar, { AvatarWithImageLink, AvatarWithoutImageLink } from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface CellType {
    row: IProject
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

// ** renders project column
const renderClient = (row: IProject) => {
    if (row.image) {
        return (
            <AvatarWithImageLink href={`/project/assignment?projectId=${row.id}`}>
                <CustomAvatar src={row.image} sx={{ mr: 3, width: 34, height: 34 }} />
            </AvatarWithImageLink>
        )
    } else {
        return (
            <AvatarWithoutImageLink href={`/project/assignment?projectId=${row.id}`}>
                <CustomAvatar
                    skin='light'
                    color={row.avatarColor || 'primary'}
                    sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
                >
                    {getInitials(row.name ? row.name : 'Project')}
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
                    <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                        {row.name}
                    </Typography>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'phone',
        headerName: 'Contact',
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                        {row.phone}
                    </Typography>
                </Box>
            )
        }
    },
    {
        flex: 0.2,
        minWidth: 230,
        field: 'discription',
        headerName: 'Business',
        renderCell: ({ row }: CellType) => {
            return (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                        {row.discription}
                    </Typography>
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

    const handleUpdate = () => handleDrawer(id);

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

const ProjectsTable = () => {

    // ** State
    const [pageSize, setPageSize] = useState<number>(10)

    // ** Hooks
    const store = useSelector((state: RootState) => state.project)

    return (
        <DataGrid
            autoHeight
            rows={store.projects || []}
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

export default ProjectsTable
