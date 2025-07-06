import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import { getPatients, addPatient, updatePatient } from '../../utils/dataService';

const PatientForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: ''
  });

  useEffect(() => {
    if (id) {
      const existingPatient = getPatients().find(p => p.id === id);
      if (existingPatient) setPatient(existingPatient);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePatient(id, { ...patient, id });
    } else {
      addPatient({ ...patient, id: `p${Date.now()}` });
    }
    navigate('/patients');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Patient' : 'Add New Patient'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="name"
            value={patient.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Date of Birth"
            name="dob"
            type="date"
            value={patient.dob}
            onChange={handleChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Contact Number"
            name="contact"
            value={patient.contact}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Health Information"
            name="healthInfo"
            value={patient.healthInfo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate('/patients')}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default PatientForm;