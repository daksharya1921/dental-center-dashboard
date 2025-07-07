

import React, { useState, useEffect } from 'react';
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
  Avatar,
  Tooltip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Chip,
  InputAdornment,
  TextField,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  PersonAdd as PersonAddIcon,
  Search as SearchIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  CalendarToday as CalendarIcon,
  LocalHospital as HealthIcon,
  FilterList as FilterIcon
} from '@mui/icons-material';
import { getPatients, deletePatient } from '../utils/dataService';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [confirmId, setConfirmId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    const patientData = getPatients();
    setPatients(patientData);
    setFilteredPatients(patientData);
  }, []);

  useEffect(() => {
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (patient.contact && patient.contact.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  const refresh = () => {
    const patientData = getPatients();
    setPatients(patientData);
    setFilteredPatients(patientData);
  };

  const handleDelete = (id) => {
    deletePatient(id);
    refresh();
    setConfirmId(null);
  };

  const getPatientInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getHealthStatusColor = (healthInfo) => {
    if (!healthInfo) return 'default';
    const info = healthInfo.toLowerCase();
    if (info.includes('urgent') || info.includes('critical')) return 'error';
    if (info.includes('follow') || info.includes('review')) return 'warning';
    return 'success';
  };

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
                  Patient Management
                </Typography>
                <Typography 
                  variant="subtitle1" 
                  color="text.secondary"
                  sx={{ fontSize: '1.1rem', fontWeight: 500 }}
                >
                  Manage and track all patient records in one place
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                component={Link}
                to="/patients/add"
                startIcon={<PersonAddIcon />}
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
                Add New Patient
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
                    <HealthIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {patients.length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Patients
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
                    <CalendarIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {patients.filter(p => p.dob).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    With DOB Records
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
                    <PhoneIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {patients.filter(p => p.contact).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact Available
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
                    bgcolor: '#fff3e0', 
                    color: '#f57c00',
                    mx: 'auto',
                    mb: 2,
                    width: 56,
                    height: 56
                  }}>
                    <HealthIcon fontSize="large" />
                  </Avatar>
                  <Typography variant="h4" fontWeight="bold" color="#007c91">
                    {patients.filter(p => p.healthInfo).length}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Health Records
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
                placeholder="Search patients by name or contact..."
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
                Filter
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
                      Date of Birth
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
                      Contact Information
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
                      Health Status
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
                  {filteredPatients.length === 0 ? (
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
                            <HealthIcon fontSize="large" />
                          </Avatar>
                          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                            {searchTerm ? 'No patients found' : 'No patients registered yet'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {searchTerm ? 'Try adjusting your search criteria' : 'Add your first patient to get started'}
                          </Typography>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPatients.map((patient, index) => (
                      <TableRow 
                        hover 
                        key={patient.id}
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
                        {/* Enhanced Name with Avatar */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack direction="row" spacing={2.5} alignItems="center">
                            <Avatar 
                              sx={{ 
                                bgcolor: `hsl(${(index * 60) % 360}, 60%, 70%)`,
                                color: 'white',
                                width: 48,
                                height: 48,
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                              }}
                            >
                              {getPatientInitials(patient.name)}
                            </Avatar>
                            <Box>
                              <Typography 
                                variant="subtitle1" 
                                fontWeight="600"
                                color="#2c3e50"
                                sx={{ lineHeight: 1.2 }}
                              >
                                {patient.name}
                              </Typography>
                              <Typography 
                                variant="caption" 
                                color="text.secondary"
                                sx={{ fontSize: '0.8rem' }}
                              >
                                ID: {patient.id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        {/* Enhanced Date of Birth */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <CalendarIcon sx={{ color: '#666', fontSize: '1.1rem' }} />
                            <Typography variant="body2" color="text.primary">
                              {formatDate(patient.dob)}
                            </Typography>
                          </Stack>
                        </TableCell>

                        {/* Enhanced Contact */}
                        <TableCell sx={{ py: 2.5 }}>
                          <Stack spacing={0.5}>
                            {patient.contact ? (
                              <Stack direction="row" spacing={1} alignItems="center">
                                <PhoneIcon sx={{ color: '#666', fontSize: '1.1rem' }} />
                                <Typography variant="body2" color="text.primary">
                                  {patient.contact}
                                </Typography>
                              </Stack>
                            ) : (
                              <Typography variant="body2" color="text.secondary">
                                —
                              </Typography>
                            )}
                          </Stack>
                        </TableCell>

                        {/* Enhanced Health Info */}
                        <TableCell sx={{ py: 2.5 }}>
                          {patient.healthInfo ? (
                            <Chip
                              label={patient.healthInfo}
                              size="small"
                              color={getHealthStatusColor(patient.healthInfo)}
                              sx={{
                                maxWidth: 200,
                                '& .MuiChip-label': {
                                  fontSize: '0.75rem',
                                  fontWeight: 500
                                }
                              }}
                            />
                          ) : (
                            <Typography variant="body2" color="text.secondary">
                              —
                            </Typography>
                          )}
                        </TableCell>

                        {/* Enhanced Action buttons */}
                        <TableCell align="center" sx={{ py: 2.5 }}>
                          <Stack direction="row" spacing={1} justifyContent="center">
                            <Tooltip title="Edit Patient" arrow>
                              <IconButton
                                component={Link}
                                to={`/patients/edit/${patient.id}`}
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
                            <Tooltip title="Delete Patient" arrow>
                              <IconButton
                                onClick={() => setConfirmId(patient.id)}
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
          Delete Patient?
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
            Are you sure you want to permanently remove this patient from your records? 
            This action cannot be undone and all associated data will be lost.
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
            Cancel
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
            Delete Patient
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Patients;
