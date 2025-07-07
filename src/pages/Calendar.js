

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  useTheme,
  Fade,
  List,
  ListItem,
  ListItemText,
  Divider,
  Stack,
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Info as InfoIcon,
  Assignment as AssignmentIcon,
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
const COLOR_SCHEME = {
  primary: '#007c91',
  cardBackground: '#ffffff',
  shadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
  borderRadius: '16px'
};

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
  const { events, patients } = useCalendarData();
  const [selectedEvents, setSelectedEvents] = useState([]);

  return (
    <Box sx={{ height: 'calc(100vh - 180px)' }}>
      <CalendarHeader />
      
      <CalendarContent 
        events={events} 
        patients={patients} 
        selectedEvents={selectedEvents}
        setSelectedEvents={setSelectedEvents}
      />
    </Box>
  );
};

const useCalendarData = () => {
  const mockIncidents = useMemo(() => [
    { 
      id: 1, 
      title: 'Dental Cleaning', 
      patientId: 1, 
      appointmentDate: new Date().setHours(10, 0, 0, 0), 
      status: 'Scheduled', 
      treatment: 'Cleaning' 
    },
    { 
      id: 2, 
      title: 'Root Canal', 
      patientId: 2, 
      appointmentDate: new Date().setDate(new Date().getDate() + 1) + 14 * 60 * 60 * 1000, 
      status: 'Scheduled', 
      treatment: 'Root Canal' 
    },
    { 
      id: 3, 
      title: 'Checkup', 
      patientId: 3, 
      appointmentDate: new Date().setDate(new Date().getDate() + 2) + 16 * 60 * 60 * 1000, 
      status: 'Scheduled', 
      treatment: 'Checkup' 
    },
  ], []);

  const patients = useMemo(() => [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Sarah Smith' },
    { id: 3, name: 'Michael Brown' },
  ], []);

  const events = useMemo(() => mockIncidents.map((incident) => ({
    id: incident.id,
    title: `${incident.title} — ${patients.find(p => p.id === incident.patientId)?.name || 'Unknown'}`,
    start: new Date(incident.appointmentDate),
    end: new Date(new Date(incident.appointmentDate).getTime() + APPOINTMENT_DURATION),
    allDay: false,
    status: incident.status,
    treatment: incident.treatment,
    patientId: incident.patientId,
    appointmentDate: incident.appointmentDate,
  })), [mockIncidents, patients]);

  return { events, patients };
};

const CalendarHeader = () => (
  <Fade in timeout={500}>
    <Box sx={{ mb: 4 }}>
      <Typography variant="h4" fontWeight={700} color={COLOR_SCHEME.primary}>
        Appointment Calendar
      </Typography>
      <Typography variant="subtitle1" color="text.secondary">
        Manage and view all scheduled appointments
      </Typography>
    </Box>
  </Fade>
);

const CalendarContent = ({ events, patients, selectedEvents, setSelectedEvents }) => {
  const handleSelectEvent = (event) => {
    const incident = events.find(e => e.id === event.id);
    setSelectedEvents([incident]);
  };

  return (
    <Box sx={{ display: 'flex', height: '85%', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
      <CalendarSection events={events} onSelectEvent={handleSelectEvent} />
      
      <AppointmentDetails 
        selectedEvents={selectedEvents} 
        patients={patients} 
      />
    </Box>
  );
};

const CalendarSection = ({ events, onSelectEvent }) => (
  <Box sx={{ flex: 3 }}>
    <Fade in timeout={600}>
      <Paper elevation={0} sx={{ 
        height: '100%', 
        borderRadius: COLOR_SCHEME.borderRadius,
        backgroundColor: COLOR_SCHEME.cardBackground,
        boxShadow: COLOR_SCHEME.shadow
      }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          onSelectEvent={onSelectEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: '100%', padding: '16px' }}
        />
      </Paper>
    </Fade>
  </Box>
);

const eventStyleGetter = (event) => {
  const statusColors = {
    Completed: '#4caf50',
    Cancelled: '#f44336',
    Scheduled: '#ff9800',
    default: '#1976d2'
  };

  return {
    style: {
      backgroundColor: statusColors[event.status] || statusColors.default,
      borderRadius: '6px',
      color: 'white',
      border: 0,
      paddingLeft: '4px',
      fontWeight: 'bold'
    },
  };
};

const AppointmentDetails = ({ selectedEvents, patients }) => (
  <Box sx={{ flex: 1 }}>
    <Fade in timeout={700}>
      <Paper elevation={0} sx={{ 
        p: 3, 
        borderRadius: COLOR_SCHEME.borderRadius,
        backgroundColor: COLOR_SCHEME.cardBackground,
        boxShadow: COLOR_SCHEME.shadow,
        height: '100%', 
        overflowY: 'auto' 
      }}>
        <Typography variant="h5" fontWeight={700} color={COLOR_SCHEME.primary} gutterBottom>
          Appointment Details
        </Typography>

        {selectedEvents.length > 0 ? (
          <AppointmentDetailsList events={selectedEvents} patients={patients} />
        ) : (
          <EmptyAppointmentState />
        )}
      </Paper>
    </Fade>
  </Box>
);

const AppointmentDetailsList = ({ events, patients }) => (
  <List disablePadding>
    {events.map((event) => (
      <Box key={event.id}>
        <ListItem alignItems="flex-start" sx={{ p: 2 }}>
          <ListItemText
            primary={
              <Typography variant="subtitle1" fontWeight="bold">
                {event.title}
              </Typography>
            }
            secondary={
              <AppointmentDetailsContent event={event} patients={patients} />
            }
          />
        </ListItem>
        <Divider />
      </Box>
    ))}
  </List>
);

const AppointmentDetailsContent = ({ event, patients }) => (
  <Stack spacing={1} mt={1}>
    <DetailRow 
      icon={<PersonIcon fontSize="small" color="primary" />} 
      text={`Patient: ${patients.find(p => p.id === event.patientId)?.name}`} 
    />
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
    <DetailRow 
      icon={<AssignmentIcon fontSize="small" color="primary" />} 
      text={`Treatment: ${event.treatment || 'Not specified'}`} 
    />
  </Stack>
);

const DetailRow = ({ icon, text }) => (
  <Stack direction="row" alignItems="center" spacing={1}>
    {icon}
    <Typography variant="body2">
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
    />
  );
};

const EmptyAppointmentState = () => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center',
    height: '200px',
    textAlign: 'center'
  }}>
    <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
    <Typography variant="body2" color="text.secondary">
      Select an appointment from the calendar to view its details.
    </Typography>
  </Box>
);

export default CalendarView;
