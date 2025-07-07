import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Avatar,
  Button,
  Tabs,
  Tab,
  Paper,
  Grid,
  IconButton,
  Fade,
  Stack,
  LinearProgress,
  Skeleton
} from '@mui/material';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as TreatmentIcon,
  AttachMoney as BillingIcon,
  Description as FilesIcon,
  Email as MessageIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Work as WorkIcon,
  Email as EmailIcon,
  Favorite as PulseIcon,
  Scale as WeightIcon,
  Straighten as HeightIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  Schedule as ScheduleIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
  Cake as CakeIcon,
  Badge as BadgeIcon,
  MedicalServices as MedicalIcon,
  Assignment as AssignmentIcon
} from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Fade in timeout={300}>
          <Box sx={{ p: 3 }}>{children}</Box>
        </Fade>
      )}
    </div>
  );
}

const PatientView = () => {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Mock data matching the new structure
  useEffect(() => {
    setTimeout(() => {
      const mockPatients = [
        {
          id: "p1",
          name: "John Doe",
          dob: "1990-05-10",
          contact: "1234567890",
          healthInfo: "No allergies",
          // Additional fields for completeness
          email: "john.doe@email.com",
          address: "123 Main Street, Downtown, City 12345",
          bloodType: "A+",
          emergencyContact: "Jane Doe - +1 (555) 111-2222",
          insuranceProvider: "HealthCare Plus",
          weight: "75 kg",
          height: "180 cm",
          pulse: "72 bpm"
        }
      ];

      const mockIncidents = [
        {
          id: "i1",
          patientId: "p1",
          title: "Toothache",
          description: "Upper molar pain",
          comments: "Sensitive to cold",
          appointmentDate: "2025-07-01T10:00:00",
          cost: 80,
          status: "Completed",
          files: [
            {
              name: "invoice.pdf",
              url: "base64string-or-blob-url"
            },
            {
              name: "xray.png",
              url: "base64string-or-blob-url"
            }
          ],
          // Additional fields for better UI
          dentist: "Dr. Sarah Johnson",
          treatment: "Root Canal Consultation",
          duration: "45 minutes"
        },
        {
          id: "i2",
          patientId: "p1",
          title: "Routine Dental Cleaning",
          description: "Regular cleaning and oral health assessment",
          comments: "No cavities found. Recommended fluoride treatment",
          appointmentDate: "2025-07-15T14:30:00",
          cost: 150,
          status: "Scheduled",
          files: [],
          dentist: "Dr. Michael Chen",
          treatment: "Prophylaxis",
          duration: "30 minutes"
        },
        {
          id: "i3",
          patientId: "p1",
          title: "Cavity Filling",
          description: "Small cavity on upper left molar",
          comments: "Composite resin filling required",
          appointmentDate: "2025-08-01T09:00:00",
          cost: 275,
          status: "Pending",
          files: [
            {
              name: "treatment-plan.pdf",
              url: "base64string-or-blob-url"
            }
          ],
          dentist: "Dr. Robert Martinez",
          treatment: "Composite Filling",
          duration: "60 minutes"
        }
      ];

      setPatients(mockPatients);
      setIncidents(mockIncidents);
      setCurrentPatient(mockPatients[0]); // Set first patient as current
      setLoading(false);
    }, 1000);
  }, []);

  // Get incidents for current patient
  const patientIncidents = incidents.filter(incident => 
    currentPatient && incident.patientId === currentPatient.id
  );

  const calculateAge = (dob) => {
    if (!dob) return 'Not specified';
    const birthDate = new Date(dob);
    const diff = Date.now() - birthDate.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970) + ' years';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Scheduled': return 'info';
      case 'Pending': return 'warning';
      case 'Cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return '✓';
      case 'Scheduled': return '⏰';
      case 'Pending': return '⏳';
      case 'Cancelled': return '✗';
      default: return '•';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="rectangular" height={80} sx={{ mb: 3, borderRadius: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 2 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!currentPatient) return <Typography>No patient data available</Typography>;

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 }, 
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      {/* Enhanced Header */}
      <Fade in timeout={300}>
        <Paper 
          elevation={0} 
          sx={{ 
            p: 3, 
            mb: 4, 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ 
            position: 'absolute', 
            top: -20, 
            right: -20, 
            width: 100, 
            height: 100, 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255,255,255,0.1)' 
          }} />
          <Box sx={{ 
            position: 'absolute', 
            bottom: -30, 
            left: -30, 
            width: 150, 
            height: 150, 
            borderRadius: '50%', 
            backgroundColor: 'rgba(255,255,255,0.05)' 
          }} />
          
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <Box>
              <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                My Dental Records
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Complete overview of your dental health journey
              </Typography>
            </Box>
            <Stack direction="row" spacing={2}>
              <Button 
                variant="contained" 
                startIcon={<MessageIcon />}
                sx={{
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.3)',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.3)',
                  }
                }}
              >
                Message Dentist
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<ScheduleIcon />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.5)',
                  color: 'white',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Book Appointment
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Fade>

      <Grid container spacing={4}>
        {/* Enhanced Left Column - Patient Profile */}
        <Grid item xs={12} md={4}>
          <Fade in timeout={500}>
            <Stack spacing={3}>
              {/* Patient Profile Card */}
              <Paper elevation={0} sx={{ 
                borderRadius: 3, 
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
              }}>
                {/* Profile Header */}
                <Box sx={{ 
                  background: 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
                  color: 'white', 
                  p: 3,
                  position: 'relative'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    position: 'relative',
                    zIndex: 1
                  }}>
                    <Avatar sx={{ 
                      width: 80, 
                      height: 80, 
                      mr: 3, 
                      fontSize: '2rem',
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '2px solid rgba(255,255,255,0.3)'
                    }}>
                      {currentPatient.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
                        {currentPatient.name}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                        Patient ID: {currentPatient.id}
                      </Typography>
                      <Chip 
                        label={currentPatient.healthInfo || "No health info"}
                        size="small"
                        sx={{ 
                          backgroundColor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                  </Box>
                  <IconButton 
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      right: 16,
                      color: 'white',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </Box>

                {/* Patient Details */}
                <Box sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1976d2' }}>
                    Personal Information
                  </Typography>
                  <List dense sx={{ mb: 2 }}>
                    <ListItem sx={{ px: 0 }}>
                      <CakeIcon sx={{ mr: 2, color: '#666' }} />
                      <ListItemText 
                        primary={`Date of Birth: ${new Date(currentPatient.dob).toLocaleDateString()}`}
                        secondary={`Age: ${calculateAge(currentPatient.dob)}`}
                      />
                    </ListItem>
                    <ListItem sx={{ px: 0 }}>
                      <PhoneIcon sx={{ mr: 2, color: '#666' }} />
                      <ListItemText 
                        primary="Contact"
                        secondary={currentPatient.contact}
                      />
                    </ListItem>
                    {currentPatient.bloodType && (
                      <ListItem sx={{ px: 0 }}>
                        <BadgeIcon sx={{ mr: 2, color: '#666' }} />
                        <ListItemText primary={`Blood Type: ${currentPatient.bloodType}`} />
                      </ListItem>
                    )}
                  </List>

                  {(currentPatient.weight || currentPatient.height) && (
                    <>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1976d2' }}>
                        Vitals
                      </Typography>
                      <Grid container spacing={2} sx={{ mb: 3 }}>
                        {currentPatient.weight && (
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                              <WeightIcon sx={{ color: '#666', mb: 1 }} />
                              <Typography variant="body2" color="text.secondary">Weight</Typography>
                              <Typography variant="h6" fontWeight={600}>{currentPatient.weight}</Typography>
                            </Paper>
                          </Grid>
                        )}
                        {currentPatient.height && (
                          <Grid item xs={6}>
                            <Paper sx={{ p: 2, textAlign: 'center', backgroundColor: '#f8f9fa' }}>
                              <HeightIcon sx={{ color: '#666', mb: 1 }} />
                              <Typography variant="body2" color="text.secondary">Height</Typography>
                              <Typography variant="h6" fontWeight={600}>{currentPatient.height}</Typography>
                            </Paper>
                          </Grid>
                        )}
                      </Grid>
                    </>
                  )}

                  {(currentPatient.email || currentPatient.address) && (
                    <>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2, color: '#1976d2' }}>
                        Contact Information
                      </Typography>
                      <List dense>
                        {currentPatient.address && (
                          <ListItem sx={{ px: 0 }}>
                            <LocationIcon sx={{ mr: 2, color: '#666' }} />
                            <ListItemText 
                              primary="Address"
                              secondary={currentPatient.address}
                            />
                          </ListItem>
                        )}
                        {currentPatient.email && (
                          <ListItem sx={{ px: 0 }}>
                            <EmailIcon sx={{ mr: 2, color: '#666' }} />
                            <ListItemText 
                              primary="Email"
                              secondary={currentPatient.email}
                            />
                          </ListItem>
                        )}
                      </List>
                    </>
                  )}
                </Box>
              </Paper>

              {/* Health Information Card */}
              <Paper elevation={0} sx={{ 
                borderRadius: 3,
                boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
              }}>
                <Box sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MedicalIcon sx={{ mr: 2, color: '#1976d2' }} />
                    <Typography variant="h6" fontWeight={600} color="#1976d2">
                      Health Information
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {currentPatient.healthInfo}
                  </Typography>
                </Box>
              </Paper>
            </Stack>
          </Fade>
        </Grid>

        {/* Enhanced Right Column - Tabs Content */}
        <Grid item xs={12} md={8}>
          <Fade in timeout={700}>
            <Paper elevation={0} sx={{ 
              borderRadius: 3,
              boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
              overflow: 'hidden'
            }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{ 
                  borderBottom: 1, 
                  borderColor: 'divider',
                  backgroundColor: '#f8f9fa',
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    minHeight: 64
                  }
                }}
              >
                <Tab label="Appointments" icon={<CalendarIcon />} iconPosition="start" />
                <Tab label="Treatments" icon={<TreatmentIcon />} iconPosition="start" />
                <Tab label="Documents" icon={<FilesIcon />} iconPosition="start" />
                <Tab label="Billing" icon={<BillingIcon />} iconPosition="start" />
              </Tabs>

              <TabPanel value={tabValue} index={0}>
                {patientIncidents.length > 0 ? (
                  <Stack spacing={3}>
                    {patientIncidents.map((incident, index) => (
                      <Card key={incident.id} sx={{ 
                        borderRadius: 2,
                        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                          transform: 'translateY(-2px)'
                        }
                      }}>
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'flex-start',
                            mb: 2
                          }}>
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                                {incident.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {incident.dentist ? `with ${incident.dentist}` : 'Dental appointment'}
                              </Typography>
                            </Box>
                            <Chip 
                              label={`${getStatusIcon(incident.status)} ${incident.status}`}
                              color={getStatusColor(incident.status)}
                              sx={{ fontWeight: 600 }}
                            />
                          </Box>
                          
                          <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CalendarIcon sx={{ mr: 1, color: '#666', fontSize: '1.2rem' }} />
                                <Typography variant="body2">
                                  {new Date(incident.appointmentDate).toLocaleDateString()}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <TimeIcon sx={{ mr: 1, color: '#666', fontSize: '1.2rem' }} />
                                <Typography variant="body2">
                                  {new Date(incident.appointmentDate).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })} {incident.duration && `(${incident.duration})`}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>

                          <Box sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            backgroundColor: '#f8f9fa',
                            borderRadius: 1,
                            mb: 2
                          }}>
                            <Typography variant="body2" color="text.secondary">
                              Treatment: <strong>{incident.treatment || 'General consultation'}</strong>
                            </Typography>
                            <Typography variant="h6" fontWeight={600} color="primary">
                              ${incident.cost}
                            </Typography>
                          </Box>
                          
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Description:</strong> {incident.description}
                          </Typography>
                          
                          {incident.comments && (
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              <strong>Comments:</strong> {incident.comments}
                            </Typography>
                          )}
                          
                          {incident.files?.length > 0 && (
                            <Box>
                              <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                Attachments:
                              </Typography>
                              <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
                                {incident.files.map((file, index) => (
                                  <Button 
                                    key={index}
                                    variant="outlined"
                                    size="small"
                                    startIcon={<FilesIcon />}
                                    endIcon={<DownloadIcon />}
                                    sx={{
                                      borderRadius: 2,
                                      textTransform: 'none',
                                      fontWeight: 500
                                    }}
                                  >
                                    {file.name}
                                  </Button>
                                ))}
                              </Stack>
                            </Box>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </Stack>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 8 }}>
                    <CalendarIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      No appointments found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Schedule your first appointment to get started
                    </Typography>
                  </Box>
                )}
              </TabPanel>

              <TabPanel value={tabValue} index={1}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <TreatmentIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Treatment History
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Your complete treatment history will appear here
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={2}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <FilesIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Documents & Files
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    X-rays, treatment plans, and other documents will be stored here
                  </Typography>
                </Box>
              </TabPanel>

              <TabPanel value={tabValue} index={3}>
                <Box sx={{ textAlign: 'center', py: 8 }}>
                  <BillingIcon sx={{ fontSize: 64, color: '#ccc', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Billing & Insurance
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    View your billing history and insurance claims
                  </Typography>
                </Box>
              </TabPanel>
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientView;
