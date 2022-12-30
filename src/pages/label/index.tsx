// ** React Imports
import { useState, useEffect, MouseEvent, useCallback, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'

// ** import form support components
import { InputField } from 'src/@core/components/form'


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
import { useDispatch } from 'react-redux'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchLabelsAction } from 'src/store/apps/label'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { EmployeeType } from 'src/types/apps/employeeTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/label/components/TableHeader'
import Table from 'src/views/apps/label/components/Table'
import Drawer from 'src/views/apps/assignmentType/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useAssignmentType } from 'src/@core/hooks/form/useAssignmentType'
import { Button, Switch } from '@mui/material'
import { useLabel } from 'src/@core/hooks/form/useLabel'

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

interface CellType {
    row: EmployeeType
}

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
    const [labelInput, setLabelInput] = useState<boolean>(false)

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const { serviceId } = useToggleDrawer();
    const { form: { control, handleSubmit }, updateLabel, addLabel, deleteLabel } = useLabel(serviceId)

    const handleLabelInput = () => {
        setLabelInput(!labelInput)
    }

    const onSubmit = async (data: any) => {
        if (serviceId) {
            await updateLabel(serviceId, data)
        } else {
            await addLabel(data);
        }
    }

    useEffect(() => {
        dispatch(fetchLabelsAction({}))
    }, [dispatch, plan, role, status, value])

    const handleFilter = useCallback((val: string) => {
        setValue(val)
    }, [])

    const handleDelete = () => {
        serviceId && deleteLabel(serviceId)
    }

    return (
        <Grid container spacing={6}>
            <Grid item xs={12}>
                <Card style={{ marginBottom: 10 }} >
                    <Grid item container>
                        <Grid item xs={2}>
                            <TableHeader value={value} text={!labelInput ? "Add Label" : "Cancel"} handleFilter={handleFilter} toggle={handleLabelInput} />
                        </Grid>
                        <Grid item xs={10} >
                            {
                                labelInput ?
                                    (
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <Box sx={{ display: 'flex', padding: "10px" }}>
                                                <Box sx={{ width: "50%" }}>
                                                    <InputField
                                                        name='name'
                                                        label='Name'
                                                        placeholder='Enter Label Name'
                                                        //  @ts-ignore
                                                        control={control}
                                                    />
                                                </Box>
                                                &nbsp;
                                                <Box sx={{ marginTop: "auto", marginBottom: "auto" }}>
                                                    <Button type='submit' variant='outlined' color='secondary'>Submit</Button>
                                                </Box>
                                            </Box>
                                        </form>
                                    )
                                    :
                                    null
                            }
                        </Grid>

                    </Grid>
                </Card>
                <Card>
                    <Table />
                </Card>
            </Grid>

            <DeleteAlert title='report label' onAgree={handleDelete} />
        </Grid>
    )
}

Page.acl = {
    action: 'itsHaveAccess',
    subject: 'report-label-page'
}

export default Page
