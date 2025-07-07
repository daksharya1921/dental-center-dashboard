
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  TextField, 
  Button, 
  Box, 
  Typography, 
  Container, 
  MenuItem, 
  Select, 
  InputLabel, 
  FormControl,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { 
  getIncidents, 
  addIncident, 
  updateIncident, 
  getPatients,
  saveFile
} from '../../utils/dataService';

// import { DateTimePicker } from '@mui/x-date-pickers';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const AppointmentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState({
    title: '',
    patientId: '',
    description: '',
    comments: '',
    appointmentDate: new Date(),
    cost: '',
    treatment: '',
    status: 'Pending',
    files: []
  });
  const [patients, setPatients] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setPatients(getPatients());
    if (id) {
      const existingIncident = getIncidents().find(i => i.id === id);
      if (existingIncident) setIncident({
        ...existingIncident,
        appointmentDate: new Date(existingIncident.appointmentDate)
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIncident(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date) => {
    setIncident(prev => ({ ...prev, appointmentDate: date }));
  };

  const handleFileUpload = async (e) => {
    const newFiles = Array.from(e.target.files);
    setUploading(true);
    
    try {
      for (const file of newFiles) {
        await saveFile(id || incident.id, file);
      }
      
      // Refresh the incident data after upload
      if (id) {
        const updatedIncident = getIncidents().find(i => i.id === id);
        setIncident({
          ...updatedIncident,
          appointmentDate: new Date(updatedIncident.appointmentDate)
        });
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const incidentToSave = {
      ...incident,
      appointmentDate: incident.appointmentDate.toISOString()
    };
    if (id) {
      updateIncident(id, incidentToSave);
    } else {
      addIncident({ ...incidentToSave, id: `i${Date.now()}` });
    }
    navigate('/appointments');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Appointment' : 'Add New Appointment'}
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Patient</InputLabel>
            <Select
              name="patientId"
              value={incident.patientId}
              onChange={handleChange}
              required
            >
              {patients.map(patient => (
                <MenuItem key={patient.id} value={patient.id}>{patient.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <TextField
            label="Title"
            name="title"
            value={incident.title}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          
          <TextField
            label="Description"
            name="description"
            value={incident.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          
          <TextField
            label="Comments"
            name="comments"
            value={incident.comments}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={2}
          />
          
          <DateTimePicker
            label="Appointment Date"
            value={incident.appointmentDate}
            onChange={handleDateChange}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          
          <TextField
            label="Cost"
            name="cost"
            type="number"
            value={incident.cost}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <TextField
            label="Treatment"
            name="treatment"
            value={incident.treatment}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={incident.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1">Attachments</Typography>
            <input
              accept="image/*,.pdf,.doc,.docx"
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={handleFileUpload}
              disabled={uploading}
            />
            <label htmlFor="raised-button-file">
              <Button 
                variant="outlined" 
                component="span" 
                disabled={uploading}
                startIcon={<CloudUploadIcon />}
              >
                {uploading ? 'Uploading...' : 'Add Files'}
              </Button>
            </label>
            
            {incident.files?.length > 0 && (
              <List dense sx={{ mt: 1 }}>
                {incident.files.map((file, index) => (
                  <ListItem key={index}>
                    <ListItemText 
                      primary={file.name} 
                      secondary={`${(file.size / 1024).toFixed(2)} KB`} 
                    />
                    <a href={file.url} target="_blank" rel="noopener noreferrer" download>
                      <Button size="small" startIcon={<DownloadIcon />}>
                        Download
                      </Button>
                    </a>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Button type="submit" variant="contained" sx={{ mr: 2 }}>
              Save
            </Button>
            <Button variant="outlined" onClick={() => navigate('/appointments')}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default AppointmentForm;
