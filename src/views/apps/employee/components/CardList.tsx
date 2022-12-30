import { Avatar, Button, Card, CardContent, CardHeader, CardMedia, Grid, Typography, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton"
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { RootState } from "src/store";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import BorderColorIcon from '@mui/icons-material/BorderColor';

import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { EmployeeType } from 'src/types/apps/employeeTypes';

// ** Import Custom hooks
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"
import { useEmployee } from 'src/@core/hooks/form/useEmployee'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'

const DeleteButton = styled(Button)({
  backgroundColor: '#bc1818',
  borderRadius: '20px',
  height: '30px'
})

const EmployeeCardList = () => {

  // ** Hooks
  const { handleDrawer, handleModal } = useToggleDrawer();
  // const store = useSelector((state: RootState) => state.employee)
  // ** Hooks
  const { updateEmployee, store } = useEmployee(null)

  return (
    <>
      <Grid container spacing={10} xs={12}>
        {
          store.employees.map((emp: EmployeeType) => (
            <Grid item xs={6} md={6}>
              <Card sx={{ display: 'flex' }}>
                {/* <CardHeader
                avatar={
                  <Avatar alt="profile_picture" variant="rounded" src={emp.profile_picture}/>
                }
                action={
                  <DeleteButton variant="contained">Delete</DeleteButton>
                }
                title={`${emp.first_name} ${emp.last_name}`}
                subhear={emp.email}
              />*/}
                <CardContent>
                  <Grid container spacing={5}>
                    <Grid container item xs={12}>
                      <Grid item xs={4}>
                        {
                          emp.image ? (
                            <CardMedia
                              component="img"
                              image={emp.image}
                              sx={{ width: 100 }}
                              alt={`${emp.first_name} ${emp.last_name}`}
                            />
                          ) : (
                            <CustomAvatar
                              skin='light'
                              color={emp.avatarColor || 'primary'}
                              sx={{ width: 100, height: 100, fontSize: '3rem' }}
                            >
                              {getInitials(emp.fullName ? emp.fullName : 'John Doe')}
                            </CustomAvatar>
                          )
                        }
                      </Grid>
                      <Grid item xs={8}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 'bold' }}>
                              {`${emp.first_name} ${emp.last_name}`}
                            </Typography>
                            <Typography>
                              {emp.email}
                            </Typography>
                            <hr />
                          </Box>
                          <DeleteButton onClick={() => handleModal(emp.id)} variant="contained">Delete</DeleteButton>
                        </Box>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          <span>Status:</span> <span style={{ color: `${emp.status ? "green" : "red"}` }}>  {emp.status ? "Active" : "InActive"}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          <span>Role:</span> <span style={{ color: 'blue' }}>{emp.role_code}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          <span>Phone No:</span> {emp.phone}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={4}>
                      <Grid item xs={6}>
                        <Button onClick={() => handleDrawer(emp.id)} variant="outlined" startIcon={<PencilOutline />} fullWidth>
                          Update Account
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        {/* <Button
                          variant="contained"
                          startIcon={<DeleteOutline />}
                          fullWidth
                          onClick={() => {
                            updateEmployee(emp.id, { status: !emp.status })
                          }}
                        >
                          Disable User
                        </Button> */}
                        <LoadingButton
                          loading={store.status === 'pending'}
                          disabled={store.status === 'pending'}
                          startIcon={<DeleteOutline />}
                          loadingPosition="end"
                          variant="contained"
                          fullWidth
                          onClick={() => {
                            updateEmployee(emp.id, { status: !emp.status })
                          }}
                        >
                          {emp.status ? "Disable" : "Enable"} Employee
                        </LoadingButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
                {/* <CardContent>
                <Grid>
                  <Grid item xs={12} justifyContent="space-between">
                    <Grid xs={6}>
                      <Avatar alt="profileimage" src={emp.profile_picture} variant="rounded"/>
                      <Typography>{emp.first_name}</Typography>
                      <Typography>{emp.email}</Typography>
                    </Grid>
                    <Button color="error" variant="contained">Delete</Button>
                  </Grid>
                </Grid>
              </CardContent> */}
              </Card>
            </Grid>
          ))
        }
      </Grid>
    </>
  )
}
export default EmployeeCardList;
