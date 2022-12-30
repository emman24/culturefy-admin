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
import { fetchProjectsAction } from 'src/store/apps/project'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { IClient } from 'src/types/apps/client'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/project/components/TableHeader'
import ProjectsTable from 'src/views/apps/project/components/Table'
import Drawer from 'src/views/apps/project/components/Drawer'
import DeleteAlert from 'src/@core/components/common/deleteAlert'
import ClientCard from 'src/views/apps/client/components/CardView';
import LocationBreadCrumb from 'src/@core/components/common/LocationBreadCrumb'

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useProject } from 'src/@core/hooks/form/useProject'
import { Stack, Switch } from '@mui/material'
import ProjectCardList from 'src/views/apps/project/components/CardList'

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
  const { serviceId, isDrawerOpen, handleDrawer, view } = useToggleDrawer();
  const { store, deleteProject, exportProjects } = useProject(null)

  useEffect(() => {
    dispatch(fetchProjectsAction({ query: store.params.query }))
  }, [dispatch])

  const handleDelete = () => {
    serviceId && deleteProject(serviceId)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LocationBreadCrumb />
        <Card style={{ marginBottom: 10, marginTop: 5 }} >
          <TableHeader
            value={value}
            handleExport={() => exportProjects()}
            toggle={() => handleDrawer(null)}
          />
        </Card>
        <Grid container spacing={6}>
          <Grid item xs={12} >
            {
              view === 'TABLE' ?
                <Card>
                  <ProjectsTable />
                </Card>
                : (
                  <>
                    <ProjectCardList />
                  </>
                )
            }
          </Grid>
          {/* <Grid item xs={3} >
            <ClientCard />
          </Grid> */}
        </Grid>
      </Grid>

      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
      <DeleteAlert title='project' onAgree={handleDelete} />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'project-page'
}

export default Page
