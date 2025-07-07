import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Chip,
  useTheme
} from '@mui/material';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
  Comment as CommentIcon,
  Description as DescriptionIcon,
  Event as EventIcon
} from '@mui/icons-material';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Constants
const APPOINTMENT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = () => {
  const theme = useTheme();
  const { events, patients, incidents } = useCalendarData();
  const [selectedEvents, setSelectedEvents] = useState([]);

  return (
    <Box sx={{ 
      height: 'calc(100vh - 180px)',
      p: theme.spacing(3),
      backgroundColor: theme.palette.background.default
    }}>
      <CalendarHeader />
      
      <CalendarContent 
        events={events} 
        patients={patients} 
        incidents={incidents}
        selectedEvents={selectedEvents}
        setSelectedEvents={setSelectedEvents}
      />
    </Box>
  );
};

const useCalendarData = () => {
  const mockIncidents = useMemo(() => [
    { 
      id: "i1", 
      patientId: "p1", 
      title: "Toothache", 
      description: "Upper molar pain", 
      comments: "Sensitive to cold",
      appointmentDate: new Date().setHours(10, 0, 0, 0), 
      status: 'Scheduled',
      cost: 120,
      treatment: "Examination and X-ray"
    },
    { 
      id: "i2", 
      patientId: "p2", 
      title: "Root Canal Follow-up", 
      description: "Post-treatment checkup", 
      comments: "Monitor healing progress",
      appointmentDate: new Date(Date.now() + 86400000 + 14 * 60 * 60 * 1000), // Tomorrow at 2pm
      status: 'Scheduled',
      cost: 250,
      treatment: "Root canal therapy"
    },
    { 
      id: "i3", 
      patientId: "p3", 
      title: "Routine Cleaning", 
      description: "Regular dental cleaning", 
      comments: "Patient prefers morning appointments",
      appointmentDate: new Date(Date.now() + 172800000 + 16 * 60 * 60 * 1000), // Day after tomorrow at 4pm
      status: 'Completed',
      cost: 90,
      treatment: "Dental prophylaxis"
    },
  ], []);

  const patients = useMemo(() => [
    { id: "p1", name: 'John Doe', contact: '555-0101', healthInfo: 'No known allergies' },
    { id: "p2", name: 'Sarah Smith', contact: '555-0102', healthInfo: 'Allergic to penicillin' },
    { id: "p3", name: 'Michael Brown', contact: '555-0103', healthInfo: 'High blood pressure' },
  ], []);

  const events = useMemo(() => mockIncidents.map((incident) => ({
    id: incident.id,
    title: `${incident.title} — ${patients.find(p => p.id === incident.patientId)?.name || 'Unknown'}`,
    start: new Date(incident.appointmentDate),
    end: new Date(new Date(incident.appointmentDate).getTime() + APPOINTMENT_DURATION),
    allDay: false,
    status: incident.status,
    patientId: incident.patientId,
    appointmentDate: incident.appointmentDate,
    incidentTitle: incident.title,
    description: incident.description,
    comments: incident.comments,
    cost: incident.cost,
    treatment: incident.treatment
  })), [mockIncidents, patients]);

  return { events, patients, incidents: mockIncidents };
};

const CalendarHeader = () => {
  const theme = useTheme();
  
  return (
    <Fade in timeout={500}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main}>
          Appointment Calendar
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          View and manage all scheduled dental appointments
        </Typography>
      </Box>
    </Fade>
  );
};

const CalendarContent = ({ events, patients, selectedEvents, setSelectedEvents }) => {
  const theme = useTheme();
  
  const handleSelectEvent = (event) => {
    setSelectedEvents([event]);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      height: '85%', 
      gap: 3, 
      flexDirection: { xs: 'column', md: 'row' } 
    }}>
      <CalendarSection 
        events={events} 
        onSelectEvent={handleSelectEvent} 
        theme={theme}
      />
      
      <IncidentDetails 
        selectedEvents={selectedEvents} 
        patients={patients} 
        theme={theme}
      />
    </Box>
  );
};

const CalendarSection = ({ events, onSelectEvent, theme }) => (
  <Box sx={{ flex: 3 }}>
    <Fade in timeout={600}>
      <Paper elevation={0} sx={{ 
        height: '100%', 
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3]
      }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          onSelectEvent={onSelectEvent}
          eventPropGetter={(event) => eventStyleGetter(event, theme)}
          style={{ 
            height: '100%', 
            padding: theme.spacing(2),
            '--rbc-today-bg-color': theme.palette.action.selected,
            '--rbc-off-range-bg-color': theme.palette.action.disabledBackground
          }}
        />
      </Paper>
    </Fade>
  </Box>
);

const eventStyleGetter = (event, theme) => {
  const statusColors = {
    Completed: theme.palette.success.main,
    Cancelled: theme.palette.error.main,
    Scheduled: theme.palette.warning.main,
    default: theme.palette.primary.main
  };

  return {
    style: {
      backgroundColor: statusColors[event.status] || statusColors.default,
      borderRadius: theme.shape.borderRadius,
      color: theme.palette.getContrastText(statusColors[event.status] || statusColors.default),
      border: 0,
      paddingLeft: theme.spacing(1),
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.caption.fontSize
    },
  };
};

const IncidentDetails = ({ selectedEvents, patients, theme }) => (
  <Box sx={{ flex: 1 }}>
    <Fade in timeout={700}>
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        height: '100%', 
        overflowY: 'auto' 
      }}>
        <Typography 
          variant="h5" 
          fontWeight={700} 
          color={theme.palette.primary.main} 
          gutterBottom
        >
          Appointment Details
        </Typography>

        {selectedEvents.length > 0 ? (
          <IncidentDetailsList events={selectedEvents} patients={patients} />
        ) : (
          <EmptyIncidentState />
        )}
      </Paper>
    </Fade>
  </Box>
);

const IncidentDetailsList = ({ events, patients }) => (
  <List disablePadding>
    {events.map((event) => (
      <React.Fragment key={event.id}>
        <ListItem alignItems="flex-start" sx={{ p: 2 }}>
          <ListItemText
            primary={
              <Typography variant="subtitle1" fontWeight="bold">
                {event.incidentTitle}
              </Typography>
            }
            secondary={
              <IncidentDetailsContent event={event} patients={patients} />
            }
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    ))}
  </List>
);

const IncidentDetailsContent = ({ event, patients }) => {
  const patient = patients.find(p => p.id === event.patientId);
  
  return (
    <Stack spacing={1} mt={1}>
      <DetailRow 
        icon={<PersonIcon fontSize="small" color="primary" />} 
        text={`Patient: ${patient?.name || 'Unknown'}`} 
      />
      {patient?.contact && (
        <DetailRow 
          icon={<PersonIcon fontSize="small" color="primary" />} 
          text={`Contact: ${patient.contact}`} 
        />
      )}
      {patient?.healthInfo && (
        <DetailRow 
          icon={<InfoIcon fontSize="small" color="primary" />} 
          text={`Health Info: ${patient.healthInfo}`} 
        />
      )}
      <DetailRow 
        icon={<CalendarIcon fontSize="small" color="primary" />} 
        text={`Date: ${new Date(event.appointmentDate).toLocaleString()}`} 
      />
      <DetailRow 
        icon={<InfoIcon fontSize="small" color="primary" />} 
        text={
          <>
            Status: <StatusChip status={event.status} />
          </>
        } 
      />
      {event.cost && (
        <DetailRow 
          icon={<DescriptionIcon fontSize="small" color="primary" />} 
          text={`Cost: $${event.cost}`} 
        />
      )}
      {event.treatment && (
        <DetailRow 
          icon={<DescriptionIcon fontSize="small" color="primary" />} 
          text={`Treatment: ${event.treatment}`} 
        />
      )}
      <DetailRow 
        icon={<DescriptionIcon fontSize="small" color="primary" />} 
        text={`Description: ${event.description || 'Not specified'}`} 
      />
      <DetailRow 
        icon={<CommentIcon fontSize="small" color="primary" />} 
        text={`Comments: ${event.comments || 'No comments'}`} 
      />
    </Stack>
  );
};

const DetailRow = ({ icon, text }) => (
  <Stack direction="row" alignItems="flex-start" spacing={1}>
    <Box sx={{ pt: '2px' }}>{icon}</Box>
    <Typography variant="body2" component="span">
      {text}
    </Typography>
  </Stack>
);

const StatusChip = ({ status }) => {
  const statusColors = {
    Completed: 'success',
    Cancelled: 'error',
    Scheduled: 'warning'
  };

  return (
    <Chip
      size="small"
      label={status}
      color={statusColors[status] || 'default'}
      sx={{ ml: 1 }}
    />
  );
};

const EmptyIncidentState = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      height: '200px',
      textAlign: 'center'
    }}>
      <EventIcon sx={{ 
        fontSize: 48, 
        color: theme.palette.text.secondary, 
        mb: 2 
      }} />
      <Typography variant="body2" color="text.secondary">
        Select an appointment from the calendar to view details
      </Typography>
    </Box>
  );
};

export default CalendarView;
