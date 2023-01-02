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

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchClientsAction } from 'src/store/apps/client'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { IClient } from 'src/types/apps/client'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/client/components/TableHeader'
import ClientsTable from 'src/views/apps/client/components/Table'
import Drawer from 'src/views/apps/client/components/Drawer'
import ClientCardList from 'src/views/apps/client/components/CardList';
import DeleteAlert from 'src/@core/components/common/deleteAlert'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useClient } from 'src/@core/hooks/form/useClient'

interface UserRoleType {
  [key: string]: ReactElement
}

interface UserStatusType {
  [key: string]: ThemeColor
}

const Page = () => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)


  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.client)
  const { serviceId, isDrawerOpen, handleDrawer, view } = useToggleDrawer();
  const { deleteClient, exportClients } = useClient(null)

  useEffect(() => {
    dispatch(
      fetchClientsAction({})
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  // const handleRoleChange = useCallback((e: SelectChangeEvent) => {
  //   setRole(e.target.value)
  // }, [])

  // const handlePlanChange = useCallback((e: SelectChangeEvent) => {
  //   setPlan(e.target.value)
  // }, [])

  // const handleStatusChange = useCallback((e: SelectChangeEvent) => {
  //   setStatus(e.target.value)
  // }, [])

  // const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)
  const handleDelete = () => {
    serviceId && deleteClient(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card style={{ marginBottom: 10 }} >
          <TableHeader
            value={value}
            handleExport={() => exportClients()}
            toggle={() => handleDrawer(null)}
          />
        </Card>
        {
          view === 'TABLE' ?
            <Card>
              <ClientsTable />
            </Card>
            : (
              <>
                <ClientCardList />
              </>
            )
        }
      </Grid>

      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='client' onAgree={handleDelete} />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'client-page'
}

export default Page
