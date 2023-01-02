
// ** React Imports
import { useState, useEffect, useMemo, useContext, ReactElement } from 'react'

// ** Next Import
import Link from 'next/link'
import { useRouter } from 'next/router'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
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
import { fetchData, deleteUser } from 'src/store/apps/user'
import { fetchAssignmentsAction } from 'src/store/apps/assignment'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { ThemeColor } from 'src/@core/layouts/types'
import { EmployeeType } from 'src/types/apps/employeeTypes'

// ** Custom Components Imports
import TableHeader from 'src/views/apps/report/components/TableHeader'
import ReportCard from 'src/views/apps/report/components/CardList'
import AssignmentCard from 'src/views/apps/assignment/components/CardView'

import Drawer from 'src/views/apps/report/components/Drawer'
import LocationBreadCrumb from 'src/@core/components/common/LocationBreadCrumb'


// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useAssignment } from 'src/@core/hooks/form/useAssignment'
import { useProject } from 'src/@core/hooks/form/useProject'
import { useReport } from 'src/@core/hooks/form/useReport'
import EmployeeCardList from 'src/views/apps/employee/components/CardList'
import { FormControlLabel, Stack, Switch } from '@mui/material'

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

const Page = () => {
  // ** State
  const [value, setValue] = useState<string>('')

  // ** Hooks
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { project } = useSelector((state: RootState) => state.project)
  const { serviceId, isDrawerOpen, handleDrawer } = useToggleDrawer();
  const { fetchAssignment } = useAssignment(null)
  const { store, getReports, exportReport, handleReportQuery } = useReport(null)

  useMemo(() => {
    if (store.params.query?.slice(13)) {
      fetchAssignment(store.params.query?.slice(13))
    }
    if (store.params.query) {
      getReports({ query: store.params.query })
    }
  }, [dispatch, store.params.query])

  // const handleDelete = () => {
  //   serviceId && deleteAssignment(serviceId)
  // }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <LocationBreadCrumb />
        <Card style={{ marginBottom: 10, marginTop: 5 }} >
          <TableHeader
            value={value}
            //@ts-ignore
            handleAssignment={(assignment) => handleReportQuery(`assignmentId=${assignment.id}`)}
            handleExport={() => exportReport()}
            toggle={() => handleDrawer(null)}
          />
        </Card>
        <Grid container spacing={6}>
          <Grid item xs={9} >
            {/* <Table /> */}
            <ReportCard />
          </Grid>
          <Grid item xs={3}>
            <Card style={{ marginBottom: 10 }} >
              <CardMedia
                component="img"
                height="auto"
                // @ts-ignore
                image={project?.client?.client_image}
                alt="client logo"
              />
            </Card>
            <Card>
              <AssignmentCard />
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Drawer open={isDrawerOpen} serviceId={serviceId} toggle={() => handleDrawer(null)} />
    </Grid>
  )
}

Page.acl = {
  action: 'itsHaveAccess',
  subject: 'project-page'
}

export default Page
