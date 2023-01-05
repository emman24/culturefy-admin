// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
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

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
// import { fetchData, deleteUser } from 'src/store/apps/user'
// import { fetchAssignmentTypesAction } from 'src/store/apps/assignment-type'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
// import { EmployeeType } from 'src/types/apps/employeeTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/business-user/components/TableHeader'
import Table from 'src/views/apps/business-user/components/Table'
import Drawer from 'src/views/apps/business-user/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useAssignmentType } from 'src/@core/hooks/form/useAssignmentType'
import { Switch } from '@mui/material'

interface UserRoleType {
    [key: string]: ReactElement
}

interface UserStatusType {
    [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
    admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
    author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
    editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
    maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
    subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
}

// interface CellType {
//     row: EmployeeType
// }

const userStatusObj: UserStatusType = {
    active: 'success',
    pending: 'warning',
    inactive: 'secondary'
}

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
    marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    marginRight: theme.spacing(3)
}))


// ** Styled component for the link inside menu
const MenuItemLink = styled('a')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    padding: theme.spacing(1.5, 4),
    color: theme.palette.text.primary
}))

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
        '& .MuiSwitch-thumb': {
            width: 15,
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },
    '& .MuiSwitch-switchBase': {
        padding: 2,
        '&.Mui-checked': {
            transform: 'translateX(12px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
        width: 12,
        height: 12,
        borderRadius: 6,
        transition: theme.transitions.create(['width'], {
            duration: 200,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
        opacity: 1,
        backgroundColor:
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        boxSizing: 'border-box',
    },
}));



const Page = () => {
    // ** State
    const [role, setRole] = useState<string>('')
    const [plan, setPlan] = useState<string>('')
    const [value, setValue] = useState<string>('')
    const [status, setStatus] = useState<string>('')

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const { serviceId, isDrawerOpen, handleDrawer, view } = useToggleDrawer();
    // const { deleteAssignmentType } = useAssignmentType(null)

    // useEffect(() => {
    //     dispatch(fetchAssignmentTypesAction({}))
    // }, [dispatch, plan, role, status, value])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const handleDelete = () => {
        // serviceId && deleteAssignmentType(serviceId)
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card style={{ marginBottom: 10 }} >
                    <TableHeader value={value} handleFilter={handleFilter} toggle={() => handleDrawer(null)} />
                </Card>
                <Card>
                    <Table />
                </Card>
            </Grid>

            <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
            {/* <DeleteAlert title='assignment type' onAgree={handleDelete} /> */}
        </Grid>
    )
}

Page.acl = {
    action: 'itsHaveAccess',
    subject: 'assignment-type-page'
}

export default Page
