import React, { useState } from 'react';
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
  Fade,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert
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
  CalendarToday as CalendarIcon,
  Warning as IncidentIcon,
  ReportProblem as AlertIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [openIncidentDialog, setOpenIncidentDialog] = useState(false);
  const [newIncident, setNewIncident] = useState({
    patientId: '',
    title: '',
    description: '',
    comments: '',
    priority: 'medium'
  });

  const stats = {
    appointments: 24,
    patients: 56,
    revenue: 12500,
    completed: 18,
    incidents: 3
  };

  const patients = [
    { id: 'p1', name: 'John Doe' },
    { id: 'p2', name: 'Sarah Smith' },
    { id: 'p3', name: 'Michael Brown' },
    { id: 'p4', name: 'Emily Johnson' }
  ];

  const [incidents, setIncidents] = useState([
    {
      id: "i1",
      patientId: "p1",
      patientName: "John Doe",
      title: "Toothache",
      description: "Upper molar pain",
      comments: "Sensitive to cold",
      priority: "high",
      status: "active",
      reportedAt: "2 hours ago"
    },
    {
      id: "i2",
      patientId: "p2",
      patientName: "Sarah Smith",
      title: "Gum Inflammation",
      description: "Swollen gums around implant area",
      comments: "Patient reports bleeding during brushing",
      priority: "medium",
      status: "under review",
      reportedAt: "1 day ago"
    },
    {
      id: "i3",
      patientId: "p3",
      patientName: "Michael Brown",
      title: "Crown Discomfort",
      description: "New crown feels uncomfortable",
      comments: "Adjustment needed",
      priority: "low",
      status: "resolved",
      reportedAt: "3 days ago"
    }
  ]);

  const upcomingAppointments = [
    { id: 1, patient: 'John Doe', procedure: 'Emergency Check', time: 'Today, 10:00 AM', priority: 'high' },
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
    { label: 'Report Incident', icon: <IncidentIcon />, color: 'error', onClick: () => setOpenIncidentDialog(true) },
  ];

  const handleAddIncident = () => {
    if (newIncident.title && newIncident.description && newIncident.patientId) {
      const patientName = patients.find(p => p.id === newIncident.patientId)?.name || 'Unknown';
      const incident = {
        id: `i${Date.now()}`,
        ...newIncident,
        patientName,
        status: 'active',
        reportedAt: 'Just now'
      };
      setIncidents([incident, ...incidents]);
      setNewIncident({ patientId: '', title: '', description: '', comments: '', priority: 'medium' });
      setOpenIncidentDialog(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return { bg: '#ffebee', color: '#d32f2f' };
      case 'medium': return { bg: '#fff8e1', color: '#ff8f00' };
      case 'low': return { bg: '#e8f5e9', color: '#2e7d32' };
      default: return { bg: '#f5f5f5', color: '#666' };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: '#ffebee', color: '#d32f2f' };
      case 'under review': return { bg: '#fff8e1', color: '#ff8f00' };
      case 'resolved': return { bg: '#e8f5e9', color: '#2e7d32' };
      default: return { bg: '#f5f5f5', color: '#666' };
    }
  };

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
          { label: 'Incidents', value: stats.incidents, icon: <IncidentIcon />, color: 'error' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
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
        {/* Patient Incidents */}
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
                  Patient Incidents
                </Typography>
                <Badge 
                  badgeContent={incidents.filter(i => i.status === 'active').length} 
                  color="error"
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
                {incidents.slice(0, 3).map((incident, idx) => (
                  <React.Fragment key={incident.id}>
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
                          bgcolor: incident.priority === 'high' ? '#ffebee' : '#fff8e1', 
                          mr: 2,
                          color: incident.priority === 'high' ? '#d32f2f' : '#ff8f00'
                        }}>
                          {incident.priority === 'high' ? <AlertIcon /> : <IncidentIcon />}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 0.5
                          }}>
                            <Typography fontWeight={600}>{incident.title}</Typography>
                            <Stack direction="row" spacing={1}>
                              <Chip
                                label={incident.priority.toUpperCase()}
                                size="small"
                                sx={{
                                  backgroundColor: getPriorityColor(incident.priority).bg,
                                  color: getPriorityColor(incident.priority).color,
                                  fontWeight: 600
                                }}
                              />
                              <Chip
                                label={incident.status.toUpperCase()}
                                size="small"
                                sx={{
                                  backgroundColor: getStatusColor(incident.status).bg,
                                  color: getStatusColor(incident.status).color,
                                  fontWeight: 600
                                }}
                              />
                            </Stack>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Patient: {incident.patientName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            {incident.description}
                          </Typography>
                          {incident.comments && (
                            <Typography variant="body2" color="text.secondary" sx={{ 
                              fontStyle: 'italic',
                              mb: 0.5
                            }}>
                              "{incident.comments}"
                            </Typography>
                          )}
                          <Typography variant="caption" color="text.secondary">
                            Reported: {incident.reportedAt}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    {idx < incidents.length - 1 && (
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
                  View All Incidents
                </Button>
              </Box>
            </Paper>
          </Fade>
        </Grid>

        {/* Upcoming Appointments */}
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
                      onClick={action.onClick}
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

      {/* Add Incident Dialog */}
      <Dialog open={openIncidentDialog} onClose={() => setOpenIncidentDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IncidentIcon color="error" />
          Report New Incident
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Patient</InputLabel>
                <Select
                  value={newIncident.patientId}
                  onChange={(e) => setNewIncident({...newIncident, patientId: e.target.value})}
                  label="Patient"
                >
                  {patients.map(patient => (
                    <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={newIncident.priority}
                  onChange={(e) => setNewIncident({...newIncident, priority: e.target.value})}
                  label="Priority"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Incident Title"
                value={newIncident.title}
                onChange={(e) => setNewIncident({...newIncident, title: e.target.value})}
                placeholder="e.g., Toothache, Gum inflammation"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={newIncident.description}
                onChange={(e) => setNewIncident({...newIncident, description: e.target.value})}
                placeholder="Describe the incident in detail"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Comments"
                value={newIncident.comments}
                onChange={(e) => setNewIncident({...newIncident, comments: e.target.value})}
                placeholder="Additional comments or observations"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenIncidentDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleAddIncident} 
            variant="contained" 
            color="error"
            disabled={!newIncident.title || !newIncident.description || !newIncident.patientId}
          >
            Report Incident
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
