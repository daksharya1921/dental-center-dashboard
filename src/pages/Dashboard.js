// import React from 'react';
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Grid,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Avatar,
//   Badge,
//   Paper,
//   useTheme
// } from '@mui/material';
// import {
//   Event as EventIcon,
//   Add as AddIcon,
//   Person as PersonIcon,
//   LocalHospital as TreatmentIcon,
//   AttachMoney as RevenueIcon,
//   CheckCircle as CompletedIcon
// } from '@mui/icons-material';

// const Dashboard = () => {
//   const theme = useTheme();

//   const stats = {
//     appointments: 24,
//     patients: 56,
//     revenue: 12500,
//     completed: 18,
//   };

//   const upcomingAppointments = [
//     { id: 1, patient: 'John Doe', procedure: 'Cleaning', time: 'Today, 10:00 AM', priority: 'high' },
//     { id: 2, patient: 'Sarah Smith', procedure: 'Filling', time: 'Tomorrow, 2:30 PM', priority: 'medium' },
//   ];

//   const recentPatients = [
//     { id: 1, name: 'Michael Brown', lastVisit: '2 days ago', nextAppointment: 'June 15' },
//     { id: 2, name: 'Emily Johnson', lastVisit: '1 week ago', nextAppointment: 'July 2' },
//   ];

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
//         <Typography variant="h4" fontWeight={600}>Welcome Back, Dr. Smith</Typography>
//         <Button variant="contained" startIcon={<AddIcon />} size="medium">
//           New Appointment
//         </Button>
//       </Box>

//       {/* Stats Cards */}
//       <Grid container spacing={3} mb={4}>
//         {[
//           { label: 'Appointments', value: stats.appointments, icon: <EventIcon />, color: 'primary' },
//           { label: 'Patients', value: stats.patients, icon: <PersonIcon />, color: 'secondary' },
//           { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: <RevenueIcon />, color: 'success' },
//           { label: 'Completed', value: stats.completed, icon: <CompletedIcon />, color: 'info' },
//         ].map((stat, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Card sx={{ transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
//               <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
//                 <Avatar sx={{ bgcolor: `${stat.color}.main`, mr: 2 }}>{stat.icon}</Avatar>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight={500}>{stat.label}</Typography>
//                   <Typography variant="h5" fontWeight={700}>{stat.value}</Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Main Sections */}
//       <Grid container spacing={3}>
//         {/* Upcoming Appointments */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography variant="h6" fontWeight={600}>Upcoming Appointments</Typography>
//               <Badge badgeContent={upcomingAppointments.length} color="primary" />
//             </Box>
//             <List>
//               {upcomingAppointments.map((appt, idx) => (
//                 <React.Fragment key={appt.id}>
//                   <ListItem>
//                     <ListItemText
//                       primary={
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                           <Typography fontWeight={600}>{appt.patient}</Typography>
//                           <Typography color="textSecondary">{appt.time}</Typography>
//                         </Box>
//                       }
//                       secondary={
//                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//                           <Typography variant="body2">{appt.procedure}</Typography>
//                           <Typography
//                             fontWeight={600}
//                             color={appt.priority === 'high' ? 'error.main' : 'warning.main'}
//                           >
//                             {appt.priority.toUpperCase()}
//                           </Typography>
//                         </Box>
//                       }
//                     />
//                   </ListItem>
//                   {idx < upcomingAppointments.length - 1 && <Divider />}
//                 </React.Fragment>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Recent Patients */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography variant="h6" fontWeight={600}>Recent Patients</Typography>
//               <Badge badgeContent={recentPatients.length} color="primary" />
//             </Box>
//             <List>
//               {recentPatients.map((patient, idx) => (
//                 <React.Fragment key={patient.id}>
//                   <ListItem>
//                     <Avatar sx={{ mr: 2 }}>{patient.name[0]}</Avatar>
//                     <ListItemText
//                       primary={<Typography fontWeight={600}>{patient.name}</Typography>}
//                       secondary={
//                         <>
//                           <Typography variant="body2">Last Visit: {patient.lastVisit}</Typography>
//                           <Typography variant="body2">Next: {patient.nextAppointment}</Typography>
//                         </>
//                       }
//                     />
//                   </ListItem>
//                   {idx < recentPatients.length - 1 && <Divider />}
//                 </React.Fragment>
//               ))}
//             </List>
//           </Paper>
//         </Grid>

//         {/* Active Treatment Plans */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//               <Typography variant="h6" fontWeight={600}>Active Treatment Plans</Typography>
//               <Button startIcon={<AddIcon />} size="small">Add Plan</Button>
//             </Box>
//             <List>
//               <ListItem>
//                 <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}><TreatmentIcon /></Avatar>
//                 <ListItemText
//                   primary="John Doe - Root Canal"
//                   secondary="Started 2 weeks ago | 3 sessions left"
//                 />
//               </ListItem>
//               <Divider />
//               <ListItem>
//                 <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}><TreatmentIcon /></Avatar>
//                 <ListItemText
//                   primary="Sarah Smith - Whitening"
//                   secondary="Started 1 week ago | Next session: Tomorrow"
//                 />
//               </ListItem>
//             </List>
//           </Paper>
//         </Grid>

//         {/* Quick Actions */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ p: 2, borderRadius: 3 }}>
//             <Typography variant="h6" fontWeight={600} mb={2}>Quick Actions</Typography>
//             <Grid container spacing={2}>
//               {[
//                 { label: 'Schedule', icon: <EventIcon /> },
//                 { label: 'New Patient', icon: <PersonIcon /> },
//                 { label: 'Treatment Plan', icon: <TreatmentIcon /> },
//                 { label: 'Generate Invoice', icon: <RevenueIcon /> },
//               ].map((action, idx) => (
//                 <Grid item xs={6} key={idx}>
//                   <Button
//                     variant="outlined"
//                     fullWidth
//                     startIcon={action.icon}
//                     sx={{ textTransform: 'none', fontWeight: 500 }}
//                   >
//                     {action.label}
//                   </Button>
//                 </Grid>
//               ))}
//             </Grid>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Dashboard;







import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Badge,
  Paper,
  useTheme,
  Fade,
  Chip,
  Stack
} from '@mui/material';
import {
  Event as EventIcon,
  Add as AddIcon,
  Person as PersonIcon,
  LocalHospital as TreatmentIcon,
  AttachMoney as RevenueIcon,
  CheckCircle as CompletedIcon,
  ArrowForward as ArrowForwardIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const theme = useTheme();

  const stats = {
    appointments: 24,
    patients: 56,
    revenue: 12500,
    completed: 18,
  };

  const upcomingAppointments = [
    { id: 1, patient: 'John Doe', procedure: 'Cleaning', time: 'Today, 10:00 AM', priority: 'high' },
    { id: 2, patient: 'Sarah Smith', procedure: 'Filling', time: 'Tomorrow, 2:30 PM', priority: 'medium' },
    { id: 3, patient: 'Michael Brown', procedure: 'Checkup', time: 'Tomorrow, 4:15 PM', priority: 'low' },
  ];

  const recentPatients = [
    { id: 1, name: 'Michael Brown', lastVisit: '2 days ago', nextAppointment: 'June 15' },
    { id: 2, name: 'Emily Johnson', lastVisit: '1 week ago', nextAppointment: 'July 2' },
    { id: 3, name: 'David Wilson', lastVisit: '3 days ago', nextAppointment: 'June 20' },
  ];

  const activeTreatments = [
    { id: 1, patient: 'John Doe', treatment: 'Root Canal', status: 'In Progress', sessionsLeft: 3, nextSession: 'Tomorrow' },
    { id: 2, patient: 'Sarah Smith', treatment: 'Whitening', status: 'In Progress', sessionsLeft: 2, nextSession: 'June 18' },
  ];

  const quickActions = [
    { label: 'Schedule', icon: <EventIcon />, color: 'primary' },
    { label: 'New Patient', icon: <PersonIcon />, color: 'secondary' },
    { label: 'Treatment Plan', icon: <TreatmentIcon />, color: 'success' },
    { label: 'Generate Invoice', icon: <RevenueIcon />, color: 'warning' },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <Fade in timeout={500}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box>
            <Typography variant="h4" fontWeight={700} color="#007c91">
              Welcome Back, Dr. Smith
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Here's what's happening today
            </Typography>
          </Box>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />} 
            size="medium"
            sx={{
              backgroundColor: '#00acc1',
              '&:hover': { backgroundColor: '#00838f' },
              borderRadius: '12px',
              px: 3,
              py: 1.5,
              fontWeight: 600
            }}
          >
            New Appointment
          </Button>
        </Box>
      </Fade>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {[
          { label: 'Appointments', value: stats.appointments, icon: <EventIcon />, color: 'primary' },
          { label: 'Patients', value: stats.patients, icon: <PersonIcon />, color: 'secondary' },
          { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: <RevenueIcon />, color: 'success' },
          { label: 'Completed', value: stats.completed, icon: <CompletedIcon />, color: 'info' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Fade in timeout={(i + 1) * 300}>
              <Card sx={{ 
                borderRadius: '16px',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
                transition: '0.3s',
                '&:hover': { 
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ 
                      bgcolor: `${stat.color}.main`, 
                      mr: 2,
                      width: 48,
                      height: 48,
                      color: 'white'
                    }}>
                      {stat.icon}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="text.primary">
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Main Sections */}
      <Grid container spacing={3}>
        {/* Upcoming Appointments */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={600}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: '16px',
              backgroundColor: 'white',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
              }}>
                <Typography variant="h5" fontWeight={700} color="#007c91">
                  Upcoming Appointments
                </Typography>
                <Badge 
                  badgeContent={upcomingAppointments.length} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -5,
                      top: 10,
                      fontSize: '0.8rem',
                      height: 24,
                      minWidth: 24,
                      padding: '0 6px'
                    }
                  }}
                />
              </Box>
              <List sx={{ p: 0 }}>
                {upcomingAppointments.map((appt, idx) => (
                  <React.Fragment key={appt.id}>
                    <ListItem sx={{ 
                      p: 2,
                      borderRadius: '12px',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        width: '100%'
                      }}>
                        <Avatar sx={{ 
                          bgcolor: '#e0f7fa', 
                          mr: 2,
                          color: '#00acc1'
                        }}>
                          <TimeIcon />
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 0.5
                          }}>
                            <Typography fontWeight={600}>{appt.patient}</Typography>
                            <Chip
                              label={appt.priority.toUpperCase()}
                              size="small"
                              sx={{
                                backgroundColor: appt.priority === 'high' ? '#ffebee' : 
                                               appt.priority === 'medium' ? '#fff8e1' : '#e8f5e9',
                                color: appt.priority === 'high' ? '#d32f2f' : 
                                      appt.priority === 'medium' ? '#ff8f00' : '#2e7d32',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <Typography variant="body2" color="text.secondary">
                              {appt.procedure}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              <CalendarIcon fontSize="small" />
                              {appt.time}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </ListItem>
                    {idx < upcomingAppointments.length - 1 && (
                      <Divider sx={{ my: 0.5 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    color: '#00acc1',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  View All
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Recent Patients */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={700}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: '16px',
              backgroundColor: 'white',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
              }}>
                <Typography variant="h5" fontWeight={700} color="#007c91">
                  Recent Patients
                </Typography>
                <Badge 
                  badgeContent={recentPatients.length} 
                  color="primary"
                  sx={{
                    '& .MuiBadge-badge': {
                      right: -5,
                      top: 10,
                      fontSize: '0.8rem',
                      height: 24,
                      minWidth: 24,
                      padding: '0 6px'
                    }
                  }}
                />
              </Box>
              <List sx={{ p: 0 }}>
                {recentPatients.map((patient, idx) => (
                  <React.Fragment key={patient.id}>
                    <ListItem sx={{ 
                      p: 2,
                      borderRadius: '12px',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}>
                      <Avatar sx={{ 
                        bgcolor: '#e0f7fa', 
                        mr: 2,
                        color: '#00acc1',
                        fontWeight: 600
                      }}>
                        {patient.name[0]}
                      </Avatar>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600}>
                            {patient.name}
                          </Typography>
                        }
                        secondary={
                          <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              <EventIcon fontSize="small" />
                              Last: {patient.lastVisit}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5
                            }}>
                              <CalendarIcon fontSize="small" />
                              Next: {patient.nextAppointment}
                            </Typography>
                          </Stack>
                        }
                      />
                    </ListItem>
                    {idx < recentPatients.length - 1 && (
                      <Divider sx={{ my: 0.5 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button 
                  endIcon={<ArrowForwardIcon />}
                  sx={{ 
                    color: '#00acc1',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  View All
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Active Treatment Plans */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={800}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: '16px',
              backgroundColor: 'white',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)'
            }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3 
              }}>
                <Typography variant="h5" fontWeight={700} color="#007c91">
                  Active Treatment Plans
                </Typography>
                <Button 
                  startIcon={<AddIcon />} 
                  size="small"
                  sx={{
                    color: '#00acc1',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'transparent'
                    }
                  }}
                >
                  Add Plan
                </Button>
              </Box>
              <List sx={{ p: 0 }}>
                {activeTreatments.map((treatment, idx) => (
                  <React.Fragment key={treatment.id}>
                    <ListItem sx={{ 
                      p: 2,
                      borderRadius: '12px',
                      transition: '0.2s',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}>
                      <Avatar sx={{ 
                        bgcolor: '#e0f7fa', 
                        mr: 2,
                        color: '#00acc1'
                      }}>
                        <TreatmentIcon />
                      </Avatar>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography fontWeight={600}>
                              {treatment.patient} - {treatment.treatment}
                            </Typography>
                            <Chip
                              label={treatment.status}
                              size="small"
                              sx={{
                                backgroundColor: '#e8f5e9',
                                color: '#2e7d32',
                                fontWeight: 600
                              }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            mt: 1
                          }}>
                            <Typography variant="body2" color="text.secondary">
                              {treatment.sessionsLeft} sessions left
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Next: {treatment.nextSession}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {idx < activeTreatments.length - 1 && (
                      <Divider sx={{ my: 0.5 }} />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Fade>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Fade in timeout={900}>
            <Paper elevation={0} sx={{ 
              p: 3, 
              borderRadius: '16px',
              backgroundColor: 'white',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.05)'
            }}>
              <Typography variant="h5" fontWeight={700} color="#007c91" mb={3}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {quickActions.map((action, idx) => (
                  <Grid item xs={6} key={idx}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={action.icon}
                      sx={{ 
                        textTransform: 'none', 
                        fontWeight: 600,
                        borderRadius: '12px',
                        py: 2,
                        borderWidth: 2,
                        borderColor: `${action.color}.main`,
                        color: `${action.color}.main`,
                        '&:hover': {
                          borderWidth: 2,
                          backgroundColor: `${action.color}.light`,
                          borderColor: `${action.color}.main`
                        }
                      }}
                    >
                      {action.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;