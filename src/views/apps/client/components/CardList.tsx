import { Avatar, Button, Card, CardContent, CardHeader, Grid, Typography, Box, CardMedia } from "@mui/material";
import { useSelector } from "react-redux";
import { styled } from '@mui/material/styles';
import { RootState } from "src/store";
import PencilOutline from 'mdi-material-ui/PencilOutline'
import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import { IClient } from 'src/types/apps/client';
// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import CustomAvatar from 'src/@core/components/mui/avatar'
import useToggleDrawer from "src/@core/hooks/useToggleDrawer"

const DeleteButton = styled(Button)({
  backgroundColor: '#bc1818',
  borderRadius: '20px',
  height: '30px'
})

const ClientCardList = () => {

  const { handleDrawer, handleModal } = useToggleDrawer();
  const store = useSelector((state: RootState) => state.client)

  return (
    <>
      <Grid container spacing={10} xs={12}>
        {
          store.clients.map((client: IClient) => (
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
                        {/* <CardMedia
                          component="img"
                          image={client.client_image}
                          sx={{ width: 100 }}
                          alt="profile_picture"
                        /> */}
                        {
                          client.client_image ? (
                            <CardMedia
                              component="img"
                              image={client.client_image}
                              sx={{ width: 100 }}
                              alt={`${client.client_name}`}
                            />
                          ) : (
                            <CustomAvatar
                              skin='light'
                              color={client.avatarColor || 'primary'}
                              sx={{ width: 100, height: 100, fontSize: '3rem' }}
                            >
                              {getInitials(client.client_name ? client.client_name : 'Client')}
                            </CustomAvatar>
                          )
                        }
                      </Grid>
                      <Grid item xs={8}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                          <Box>
                            <Typography sx={{ fontWeight: 'bold' }}>
                              {client.client_name}
                            </Typography>
                            <Typography>
                              {client.client_email}
                            </Typography>
                            <hr />
                          </Box>
                          {/* <DeleteButton variant="contained">Delete</DeleteButton> */}
                        </Box>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          <span>Total Projects:</span> <span style={{ color: 'green' }}> {client.projects.length}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          <span>Business Address:</span> <span style={{ color: 'blue' }}>{client.country}</span>
                        </Typography>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          <span>Phone No:</span> {client.client_phone}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs={12} spacing={4}>
                      <Grid item xs={6}>
                        <Button onClick={() => handleDrawer(client.id)} variant="outlined" startIcon={<PencilOutline />} fullWidth>
                          Update
                        </Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button onClick={() => handleModal(client.id)} variant="contained" startIcon={<DeleteOutline />} fullWidth>
                          Delete
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
export default ClientCardList;