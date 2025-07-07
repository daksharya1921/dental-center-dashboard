import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Stack,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  TextField,
  InputAdornment,
  Badge
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  AccessTime as TimeIcon,
  Person as PersonIcon,
  AttachMoney as MoneyIcon,
  EventAvailable as EventIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  TrendingUp as TrendingIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CompletedIcon,
  Cancel as CancelledIcon
} from '@mui/icons-material';
import { getIncidents, deleteIncident, getPatients } from '../utils/dataService';
import { format } from 'date-fns';

const Appointments = () => {
  const [incidents, setIncidents] = useState([]);
  const [patients, setPatients] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredIncidents, setFilteredIncidents] = useState([]);

  useEffect(() => {
    const incidentData = getIncidents();
    const patientData = getPatients();
    setIncidents(incidentData);
    setPatients(patientData);
    setFilteredIncidents(incidentData);
  }, []);

  useEffect(() => {
    const filtered = incidents.filter(incident => {
      const patientName = getPatientName(incident.patientId).toLowerCase();
      const title = incident.title.toLowerCase();
      const searchLower = searchTerm.toLowerCase();
      
      return patientName.includes(searchLower) || 
             title.includes(searchLower) ||
             incident.status.toLowerCase().includes(searchLower);
    });
    setFilteredIncidents(filtered);
  }, [searchTerm, incidents, patients]);

  const refresh = () => {
    const incidentData = getIncidents();
    setIncidents(incidentData);
    setFilteredIncidents(incidentData);
  };

  const handleDelete = (id) => {
    deleteIncident(id);
    refresh();
    setConfirmId(null);
  };

  const getPatientName = (patientId) => {
    return patients.find(p => p.id === patientId)?.name || 'Unknown Patient';
  };

  const getPatientInitials = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return 'UN';
    return patient.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Cancelled':
        return 'error';
      case 'Scheduled':
      default:
        return 'warning';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed':
        return <CompletedIcon fontSize="small" />;
      case 'Cancelled':
        return <CancelledIcon fontSize="small" />;
      case 'Scheduled':
      default:
        return <ScheduleIcon fontSize="small" />;
    }
  };

  const formatAppointmentDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString;
    }
  };

  const formatAppointmentTime = (dateString) => {
    try {
      return format(new Date(dateString), 'hh:mm a');
    } catch {
      return '';
    }
  };

  const getStats = () => {
    const total = incidents.length;
    const scheduled = incidents.filter(i => i.status === 'Scheduled').length;
    const completed = incidents.filter(i => i.status === 'Completed').length;
    const cancelled = incidents.filter(i => i.status === 'Cancelled').length;
    const totalRevenue = incidents
      .filter(i => i.status === 'Completed')
      .reduce((sum, i) => sum + (parseFloat(i.cost) || 0), 0);

    return { total, scheduled, completed, cancelled, totalRevenue };
  };

  const stats = getStats();

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      backgroundImage: 'linear-gradient(to bottom right, #f0f8ff, #e6f7ff)',
      p: { xs: 2, md: 4 }
    }}>
      <Fade in timeout={600}>
        <Box>
          {/* Enhanced Header Section */}
          <Paper 
            elevation={0} 
            sx={{
              p: { xs: 3, md: 4 },
              mb: 4,
              borderRadius: '20px',
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fdff 100%)'
            }}
          >
            <Stack 
              direction={{ xs: 'column', md: 'row' }} 
              justifyContent="space-between" 
              alignItems={{ xs: 'flex-start', md: 'center' }}
              spacing={3}
            >
              <Box>
                <Typography 
                  variant="h3" 
                  fontWeight="bold" 
                  color="#007c91"
                  sx={{ 
                    mb: 1,
                    letterSpacing: '-0.5px',
                    fontSize: { xs: '2rem', md: '2.5rem' }
                  }}
                >
                  Appointment Management
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="text.secondary"
                  sx={{ fontSize: '1.1rem', fontWeight: 500 }}
                >
                  Schedule, track, and manage all patient appointments
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/appointments/add"
                startIcon={<EventIcon />}
                sx={{
                  backgroundColor: '#00acc1',
                  py: 1.5,
                  px: 3,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0, 172, 193, 0.3)',
                  '&:hover': { 
                    backgroundColor: '#00838f',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 16px rgba(0, 172, 193, 0.4)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Schedule Appointment
              </Button>
            </Stack>
          </Paper>

          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: '#e3f2fd', 
                    color: '#1976d2',
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}>
                    <CalendarIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {stats.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Appointments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Badge badgeContent={stats.scheduled} color="warning" sx={{ '& .MuiBadge-badge': { right: 12, top: 12 } }}>
                    <Avatar sx={{ 
                      bgcolor: '#fff3e0', 
                      color: '#f57c00',
                      mx: 'auto',
                      mb: 2,
                      width: 56,
                      height: 56
                    }}>
                      <ScheduleIcon fontSize="large" />
                    </Avatar>
                  </Badge>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {stats.scheduled}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Scheduled
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: '#e8f5e8', 
                    color: '#2e7d32',
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}>
                    <CompletedIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {stats.completed}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card 
                elevation={0} 
                sx={{ 
                  borderRadius: '16px',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  border: '1px solid rgba(0, 0, 0, 0.05)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar sx={{ 
                    bgcolor: '#f3e5f5', 
                    color: '#7b1fa2',
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}>
                    <MoneyIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    ${stats.totalRevenue.toFixed(0)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Revenue
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Search and Filter Section */}
          <Paper 
            elevation={0} 
            sx={{
              p: 3,
              mb: 3,
              borderRadius: '16px',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
              <TextField
                placeholder="Search appointments by title, patient, or status..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ 
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    '& fieldset': {
                      borderColor: 'transparent'
                    },
                    '&:hover fieldset': {
                      borderColor: '#00acc1'
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00acc1'
                    }
                  }
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterIcon />}
                sx={{
                  borderColor: '#e0e0e0',
                  color: '#666',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#00acc1',
                    backgroundColor: 'rgba(0, 172, 193, 0.04)'
                  }
                }}
              >
                Filter by Status
              </Button>
            </Stack>
          </Paper>

          {/* Enhanced Table */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: 'white',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}
          >
            <TableContainer sx={{ maxHeight: '70vh' }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell 
                      sx={{
                        bgcolor: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        background: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        py: 2.5,
                        borderBottom: 'none'
                      }}
                      width={280}
                    >
                      Appointment Details
                    </TableCell>
                    <TableCell 
                      sx={{
                        bgcolor: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        background: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        py: 2.5,
                        borderBottom: 'none'
                      }}
                    >
                      Patient Information
                    </TableCell>
                    <TableCell 
                      sx={{
                        bgcolor: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        background: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        py: 2.5,
                        borderBottom: 'none'
                      }}
                    >
                      Date & Time
                    </TableCell>
                    <TableCell 
                      sx={{
                        bgcolor: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        background: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        py: 2.5,
                        borderBottom: 'none'
                      }}
                    >
                      Status & Cost
                    </TableCell>
                    <TableCell 
                      align="center" 
                      width={140}
                      sx={{
                        bgcolor: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        background: 'linear-gradient(135deg, #00acc1 0%, #00838f 100%)',
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: '0.95rem',
                        py: 2.5,
                        borderBottom: 'none'
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {filteredIncidents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Avatar sx={{ 
                            bgcolor: '#f5f5f5', 
                            color: '#bdbdbd',
                            mx: 'auto',
                            mb: 2,
                            width: 64,
                            height: 64
                          }}>
                            <CalendarIcon fontSize="large" />
                          </Avatar>
                          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            {searchTerm ? 'No appointments found' : 'No appointments scheduled'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {searchTerm ? 'Try adjusting your search criteria' : 'Schedule your first appointment to get started'}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredIncidents.map((incident, index) => (
                      <TableRow 
                        hover 
                        key={incident.id}
                        sx={{
                          '&:nth-of-type(even)': { 
                            bgcolor: 'rgba(0, 172, 193, 0.02)' 
                          },
                          '&:hover': {
                            bgcolor: 'rgba(0, 172, 193, 0.04)',
                            transform: 'scale(1.002)',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                          },
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                      >
                        {/* Appointment Details */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Box>
                            <Typography 
                              variant="subtitle1" 
                              fontWeight="600"
                              color="#2c3e50"
                              sx={{ lineHeight: 1.2, mb: 0.5 }}
                            >
                              {incident.title}
                            </Typography>
                            <Typography 
                              variant="caption" 
                              color="text.secondary"
                              sx={{ fontSize: '0.8rem' }}
                            >
                              ID: {incident.id}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* Patient Information */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar 
                              sx={{ 
                                bgcolor: `hsl(${(index * 60) % 360}, 60%, 70%)`,
                                color: 'white',
                                width: 40,
                                height: 40,
                                fontSize: '0.9rem',
                                fontWeight: 'bold'
                              }}
                            >
                              {getPatientInitials(incident.patientId)}
                            </Avatar>
                            <Box>
                              <Typography 
                                variant="body2" 
                                fontWeight="500"
                                color="text.primary"
                              >
                                {getPatientName(incident.patientId)}
                              </Typography>
                              <Stack direction="row" spacing={0.5} alignItems="center">
                                <PersonIcon sx={{ color: '#666', fontSize: '0.9rem' }} />
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontSize: '0.75rem' }}
                                >
                                  Patient ID: {incident.patientId}
                                </Typography>
                              </Stack>
                            </Box>
                          </Stack>
                        </TableCell>

                        {/* Date & Time */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack spacing={1}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CalendarIcon sx={{ color: '#666', fontSize: '1rem' }} />
                              <Typography variant="body2" color="text.primary" fontWeight="500">
                                {formatAppointmentDate(incident.appointmentDate)}
                              </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <TimeIcon sx={{ color: '#666', fontSize: '1rem' }} />
                              <Typography variant="body2" color="text.secondary">
                                {formatAppointmentTime(incident.appointmentDate)}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>

                        {/* Status & Cost */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack spacing={1.5}>
                            <Chip
                              icon={getStatusIcon(incident.status)}
                              label={incident.status}
                              color={getStatusColor(incident.status)}
                              size="small"
                              sx={{
                                fontWeight: 500,
                                '& .MuiChip-icon': {
                                  fontSize: '1rem'
                                }
                              }}
                            />
                            <Stack direction="row" spacing={0.5} alignItems="center">
                              <MoneyIcon sx={{ color: '#2e7d32', fontSize: '1rem' }} />
                              <Typography 
                                variant="body2" 
                                color="#2e7d32"
                                fontWeight="600"
                              >
                                ${incident.cost || 0}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>

                        {/* Enhanced Action buttons */}
                        <TableCell align="center" sx={{ py: 2.5 }}>
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="Edit Appointment" arrow>
                              <IconButton
                                component={Link}
                                to={`/appointments/edit/${incident.id}`}
                                sx={{
                                  color: '#00acc1',
                                  backgroundColor: 'rgba(0, 172, 193, 0.1)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(0, 172, 193, 0.2)',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Appointment" arrow>
                              <IconButton
                                onClick={() => setConfirmId(incident.id)}
                                sx={{
                                  color: '#f44336',
                                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(244, 67, 54, 0.2)',
                                    transform: 'scale(1.1)'
                                  },
                                  transition: 'all 0.2s ease'
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </Fade>

      {/* Enhanced Delete Confirmation Dialog */}
      <Dialog 
        open={Boolean(confirmId)} 
        onClose={() => setConfirmId(null)}
        PaperProps={{
          sx: {
            borderRadius: '16px',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
            maxWidth: '400px'
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center',
          pb: 1,
          fontSize: '1.3rem',
          fontWeight: 'bold',
          color: '#d32f2f'
        }}>
          <Avatar sx={{ 
            bgcolor: '#ffebee', 
            color: '#d32f2f',
            mx: 'auto',
            mb: 2,
            width: 56,
            height: 56
          }}>
            <DeleteIcon fontSize="large" />
          </Avatar>
          Cancel Appointment?
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Are you sure you want to permanently remove this appointment? 
            This action cannot be undone and the patient will need to reschedule.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 2 }}>
          <Button 
            onClick={() => setConfirmId(null)}
            variant="outlined"
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              borderColor: '#e0e0e0',
              color: '#666',
              '&:hover': {
                borderColor: '#bdbdbd',
                backgroundColor: '#f5f5f5'
              }
            }}
          >
            Keep Appointment
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(confirmId)}
            sx={{
              borderRadius: '8px',
              textTransform: 'none',
              px: 3,
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c'
              }
            }}
          >
            Cancel Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;






