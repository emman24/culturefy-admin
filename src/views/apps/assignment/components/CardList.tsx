import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { RootState } from "src/store";
// import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
// import BorderColorIcon from '@mui/icons-material/BorderColor';

import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'

const DeleteButton = styled(Button)({
  backgroundColor: '#bc1818',
  borderRadius: '20px'
})

const EmployeeCardList = () => {

  const store = useSelector((state: RootState) => state.employee)
  return (
    <>
      <Grid container spacing={10} xs={12}>
      {
        store.employees.map(emp => (
          <Grid item xs={6} md={6}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar alt="profile_picture" variant="rounded" src={emp.profile_picture}/>
                }
                action={
                  <DeleteButton variant="contained">Delete</DeleteButton>
                }
                title={`${emp.first_name} ${emp.last_name}`}
                subheader={emp.email}
              />
              <CardContent>
                
                <Grid container spacing={5}>
                  <Grid item xs={12}>
                    <Typography sx={{fontWeight: 'bold'}}>
                      <span>Status:</span> <span style={{color: 'green'}}>  Active</span>
                    </Typography>
                    <Typography sx={{fontWeight: 'bold'}}>
                      <span>Role:</span> <span style={{color: 'blue'}}>{emp.role_code}</span>
                    </Typography>
                    <Typography sx={{fontWeight: 'bold'}}>
                      <span>Phone No:</span> {emp.phone}
                    </Typography>
                  </Grid>
                  <Grid item container xs={12}>
                    <Grid item xs={6}>
                      <Button variant="outlined" startIcon={<PencilOutline />}>
                        Update Account
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button variant="contained" startIcon={<DeleteOutline/>} fullWidth>
                        Delete User
                      </Button>
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