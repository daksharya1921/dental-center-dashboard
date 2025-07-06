// import React, { useState, useMemo } from 'react';
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
//   useTheme,
//   Fade,
//   Chip,
//   Stack,
//   Tabs,
//   Tab
// } from '@mui/material';
// import {
//   Event as EventIcon,
//   Add as AddIcon,
//   Person as PersonIcon,
//   LocalHospital as TreatmentIcon,
//   AttachMoney as RevenueIcon,
//   CheckCircle as CompletedIcon,
//   ArrowForward as ArrowForwardIcon,
//   AccessTime as TimeIcon,
//   CalendarToday as CalendarIcon,
//   CalendarMonth as CalendarMonthIcon,
//   Assignment as AssignmentIcon,
//   Info as InfoIcon
// } from '@mui/icons-material';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// // Constants
// const APPOINTMENT_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds
// const COLOR_SCHEME = {
//   primary: '#007c91',
//   secondary: '#00acc1',
//   hover: '#00838f',
//   background: '#f8f9fa',
//   cardBackground: '#ffffff',
//   shadow: '0 8px 16px rgba(0, 0, 0, 0.05)',
//   borderRadius: '16px'
// };

// const locales = {
//   'en-US': require('date-fns/locale/en-US'),
// };

// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

// // Main App Component
// const DentalApp = () => {
//   const [activeTab, setActiveTab] = useState(0);
//   const theme = useTheme();

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   return (
//     <Box sx={{ backgroundColor: COLOR_SCHEME.background, minHeight: '100vh' }}>
//       {/* Header */}
//       <AppHeader />
      
//       {/* Navigation Tabs */}
//       <NavigationTabs activeTab={activeTab} handleTabChange={handleTabChange} />
      
//       {/* Main Content */}
//       <Box sx={{ p: { xs: 2, md: 4 } }}>
//         {activeTab === 0 ? <DashboardView /> : <CalendarView />}
//       </Box>
//     </Box>
//   );
// };

// // Reusable Components
// const AppHeader = () => (
//   <Box sx={{ 
//     backgroundColor: COLOR_SCHEME.primary,
//     color: 'white',
//     p: 3,
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
//   }}>
//     <Typography variant="h4" fontWeight={700}>
//       Dental Practice Management
//     </Typography>
//     <Typography variant="subtitle1">
//       Comprehensive patient care and appointment system
//     </Typography>
//   </Box>
// );

// const NavigationTabs = ({ activeTab, handleTabChange }) => (
//   <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: COLOR_SCHEME.cardBackground }}>
//     <Tabs 
//       value={activeTab} 
//       onChange={handleTabChange} 
//       centered
//       sx={{
//         '& .MuiTab-root': {
//           minHeight: 64,
//           fontWeight: 600
//         }
//       }}
//     >
//       <Tab icon={<EventIcon />} iconPosition="start" label="Dashboard" />
//       <Tab icon={<CalendarMonthIcon />} iconPosition="start" label="Calendar" />
//     </Tabs>
//   </Box>
// );

// // Dashboard View Components
// const DashboardView = () => {
//   const stats = useMemo(() => ({
//     appointments: 24,
//     patients: 56,
//     revenue: 12500,
//     completed: 18,
//   }), []);

//   return (
//     <Box>
//       <DashboardHeader />
      
//       <StatsCards stats={stats} />
      
//       <DashboardSections />
//     </Box>
//   );
// };

// const DashboardHeader = () => (
//   <Fade in timeout={500}>
//     <Box sx={{ 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       alignItems: 'center',
//       mb: 4,
//       flexWrap: 'wrap',
//       gap: 2
//     }}>
//       <Box>
//         <Typography variant="h4" fontWeight={700} color={COLOR_SCHEME.primary}>
//           Welcome Back, Dr. Smith
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary">
//           Here's what's happening today
//         </Typography>
//       </Box>
//       <Button 
//         variant="contained" 
//         startIcon={<AddIcon />} 
//         size="medium"
//         sx={{
//           backgroundColor: COLOR_SCHEME.secondary,
//           '&:hover': { backgroundColor: COLOR_SCHEME.hover },
//           borderRadius: COLOR_SCHEME.borderRadius,
//           px: 3,
//           py: 1.5,
//           fontWeight: 600
//         }}
//       >
//         New Appointment
//       </Button>
//     </Box>
//   </Fade>
// );

// const StatsCards = ({ stats }) => {
//   const statItems = useMemo(() => [
//     { label: 'Appointments', value: stats.appointments, icon: <EventIcon />, color: 'primary' },
//     { label: 'Patients', value: stats.patients, icon: <PersonIcon />, color: 'secondary' },
//     { label: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, icon: <RevenueIcon />, color: 'success' },
//     { label: 'Completed', value: stats.completed, icon: <CompletedIcon />, color: 'info' },
//   ], [stats]);

//   return (
//     <Grid container spacing={3} mb={4}>
//       {statItems.map((stat, i) => (
//         <Grid item xs={12} sm={6} md={3} key={i}>
//           <Fade in timeout={(i + 1) * 300}>
//             <StatCard stat={stat} />
//           </Fade>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// const StatCard = ({ stat }) => (
//   <Card sx={{ 
//     borderRadius: COLOR_SCHEME.borderRadius,
//     boxShadow: COLOR_SCHEME.shadow,
//     transition: '0.3s',
//     '&:hover': { 
//       transform: 'translateY(-4px)',
//       boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)'
//     }
//   }}>
//     <CardContent sx={{ p: 3 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//         <Avatar sx={{ 
//           bgcolor: `${stat.color}.main`, 
//           mr: 2,
//           width: 48,
//           height: 48,
//           color: 'white'
//         }}>
//           {stat.icon}
//         </Avatar>
//         <Box>
//           <Typography variant="subtitle1" color="text.secondary" fontWeight={500}>
//             {stat.label}
//           </Typography>
//           <Typography variant="h4" fontWeight={700} color="text.primary">
//             {stat.value}
//           </Typography>
//         </Box>
//       </Box>
//     </CardContent>
//   </Card>
// );

// const DashboardSections = () => {
//   const upcomingAppointments = useMemo(() => [
//     { id: 1, patient: 'John Doe', procedure: 'Cleaning', time: 'Today, 10:00 AM', priority: 'high' },
//     { id: 2, patient: 'Sarah Smith', procedure: 'Filling', time: 'Tomorrow, 2:30 PM', priority: 'medium' },
//     { id: 3, patient: 'Michael Brown', procedure: 'Checkup', time: 'Tomorrow, 4:15 PM', priority: 'low' },
//   ], []);

//   const recentPatients = useMemo(() => [
//     { id: 1, name: 'Michael Brown', lastVisit: '2 days ago', nextAppointment: 'June 15' },
//     { id: 2, name: 'Emily Johnson', lastVisit: '1 week ago', nextAppointment: 'July 2' },
//     { id: 3, name: 'David Wilson', lastVisit: '3 days ago', nextAppointment: 'June 20' },
//   ], []);

//   const activeTreatments = useMemo(() => [
//     { id: 1, patient: 'John Doe', treatment: 'Root Canal', status: 'In Progress', sessionsLeft: 3, nextSession: 'Tomorrow' },
//     { id: 2, patient: 'Sarah Smith', treatment: 'Whitening', status: 'In Progress', sessionsLeft: 2, nextSession: 'June 18' },
//   ], []);

//   const quickActions = useMemo(() => [
//     { label: 'Schedule', icon: <EventIcon />, color: 'primary' },
//     { label: 'New Patient', icon: <PersonIcon />, color: 'secondary' },
//     { label: 'Treatment Plan', icon: <TreatmentIcon />, color: 'success' },
//     { label: 'Generate Invoice', icon: <RevenueIcon />, color: 'warning' },
//   ], []);

//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={12} md={6}>
//         <Fade in timeout={600}>
//           <SectionCard 
//             title="Upcoming Appointments" 
//             count={upcomingAppointments.length}
//             actionText="View All"
//           >
//             <AppointmentList appointments={upcomingAppointments} />
//           </SectionCard>
//         </Fade>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <Fade in timeout={700}>
//           <SectionCard 
//             title="Recent Patients" 
//             count={recentPatients.length}
//             actionText="View All"
//           >
//             <PatientList patients={recentPatients} />
//           </SectionCard>
//         </Fade>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <Fade in timeout={800}>
//           <SectionCard 
//             title="Active Treatment Plans" 
//             actionButton={
//               <Button 
//                 startIcon={<AddIcon />} 
//                 size="small"
//                 sx={{
//                   color: COLOR_SCHEME.secondary,
//                   fontWeight: 600,
//                   '&:hover': { backgroundColor: 'transparent' }
//                 }}
//               >
//                 Add Plan
//               </Button>
//             }
//           >
//             <TreatmentList treatments={activeTreatments} />
//           </SectionCard>
//         </Fade>
//       </Grid>

//       <Grid item xs={12} md={6}>
//         <Fade in timeout={900}>
//           <SectionCard title="Quick Actions">
//             <QuickActions actions={quickActions} />
//           </SectionCard>
//         </Fade>
//       </Grid>
//     </Grid>
//   );
// };

// const SectionCard = ({ title, count, actionText, actionButton, children }) => (
//   <Paper elevation={0} sx={{ 
//     p: 3, 
//     borderRadius: COLOR_SCHEME.borderRadius,
//     backgroundColor: COLOR_SCHEME.cardBackground,
//     boxShadow: COLOR_SCHEME.shadow,
//     height: '100%'
//   }}>
//     <Box sx={{ 
//       display: 'flex', 
//       justifyContent: 'space-between', 
//       alignItems: 'center',
//       mb: 3 
//     }}>
//       <Typography variant="h5" fontWeight={700} color={COLOR_SCHEME.primary}>
//         {title}
//       </Typography>
//       {count !== undefined && (
//         <Badge 
//           badgeContent={count} 
//           color="primary"
//           sx={{
//             '& .MuiBadge-badge': {
//               right: -5,
//               top: 10,
//               fontSize: '0.8rem',
//               height: 24,
//               minWidth: 24,
//               padding: '0 6px'
//             }
//           }}
//         />
//       )}
//       {actionButton}
//     </Box>
    
//     {children}
    
//     {actionText && (
//       <Box sx={{ mt: 2, textAlign: 'right' }}>
//         <Button 
//           endIcon={<ArrowForwardIcon />}
//           sx={{ 
//             color: COLOR_SCHEME.secondary,
//             fontWeight: 600,
//             '&:hover': { backgroundColor: 'transparent' }
//           }}
//         >
//           {actionText}
//         </Button>
//       </Box>
//     )}
//   </Paper>
// );

// const AppointmentList = ({ appointments }) => (
//   <List sx={{ p: 0 }}>
//     {appointments.map((appt, idx) => (
//       <React.Fragment key={appt.id}>
//         <ListItem sx={{ 
//           p: 2,
//           borderRadius: '12px',
//           transition: '0.2s',
//           '&:hover': { backgroundColor: '#f5f5f5' }
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//             <Avatar sx={{ bgcolor: '#e0f7fa', mr: 2, color: COLOR_SCHEME.secondary }}>
//               <TimeIcon />
//             </Avatar>
//             <Box sx={{ flexGrow: 1 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
//                 <Typography fontWeight={600}>{appt.patient}</Typography>
//                 <PriorityChip priority={appt.priority} />
//               </Box>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {appt.procedure}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                   <CalendarIcon fontSize="small" />
//                   {appt.time}
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>
//         </ListItem>
//         {idx < appointments.length - 1 && <Divider sx={{ my: 0.5 }} />}
//       </React.Fragment>
//     ))}
//   </List>
// );

// const PriorityChip = ({ priority }) => {
//   const priorityStyles = {
//     high: { bgcolor: '#ffebee', color: '#d32f2f' },
//     medium: { bgcolor: '#fff8e1', color: '#ff8f00' },
//     low: { bgcolor: '#e8f5e9', color: '#2e7d32' }
//   };

//   return (
//     <Chip
//       label={priority.toUpperCase()}
//       size="small"
//       sx={{
//         backgroundColor: priorityStyles[priority].bgcolor,
//         color: priorityStyles[priority].color,
//         fontWeight: 600
//       }}
//     />
//   );
// };

// const PatientList = ({ patients }) => (
//   <List sx={{ p: 0 }}>
//     {patients.map((patient, idx) => (
//       <React.Fragment key={patient.id}>
//         <ListItem sx={{ 
//           p: 2,
//           borderRadius: '12px',
//           transition: '0.2s',
//           '&:hover': { backgroundColor: '#f5f5f5' }
//         }}>
//           <Avatar sx={{ bgcolor: '#e0f7fa', mr: 2, color: COLOR_SCHEME.secondary, fontWeight: 600 }}>
//             {patient.name[0]}
//           </Avatar>
//           <ListItemText
//             primary={<Typography fontWeight={600}>{patient.name}</Typography>}
//             secondary={
//               <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
//                 <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                   <EventIcon fontSize="small" />
//                   Last: {patient.lastVisit}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                   <CalendarIcon fontSize="small" />
//                   Next: {patient.nextAppointment}
//                 </Typography>
//               </Stack>
//             }
//           />
//         </ListItem>
//         {idx < patients.length - 1 && <Divider sx={{ my: 0.5 }} />}
//       </React.Fragment>
//     ))}
//   </List>
// );

// const TreatmentList = ({ treatments }) => (
//   <List sx={{ p: 0 }}>
//     {treatments.map((treatment, idx) => (
//       <React.Fragment key={treatment.id}>
//         <ListItem sx={{ 
//           p: 2,
//           borderRadius: '12px',
//           transition: '0.2s',
//           '&:hover': { backgroundColor: '#f5f5f5' }
//         }}>
//           <Avatar sx={{ bgcolor: '#e0f7fa', mr: 2, color: COLOR_SCHEME.secondary }}>
//             <TreatmentIcon />
//           </Avatar>
//           <ListItemText
//             primary={
//               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                 <Typography fontWeight={600}>
//                   {treatment.patient} - {treatment.treatment}
//                 </Typography>
//                 <Chip
//                   label={treatment.status}
//                   size="small"
//                   sx={{ backgroundColor: '#e8f5e9', color: '#2e7d32', fontWeight: 600 }}
//                 />
//               </Box>
//             }
//             secondary={
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
//                 <Typography variant="body2" color="text.secondary">
//                   {treatment.sessionsLeft} sessions left
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Next: {treatment.nextSession}
//                 </Typography>
//               </Box>
//             }
//           />
//         </ListItem>
//         {idx < treatments.length - 1 && <Divider sx={{ my: 0.5 }} />}
//       </React.Fragment>
//     ))}
//   </List>
// );

// const QuickActions = ({ actions }) => (
//   <Grid container spacing={2}>
//     {actions.map((action, idx) => (
//       <Grid item xs={6} key={idx}>
//         <Button
//           variant="outlined"
//           fullWidth
//           startIcon={action.icon}
//           sx={{ 
//             textTransform: 'none', 
//             fontWeight: 600,
//             borderRadius: COLOR_SCHEME.borderRadius,
//             py: 2,
//             borderWidth: 2,
//             borderColor: `${action.color}.main`,
//             color: `${action.color}.main`,
//             '&:hover': {
//               borderWidth: 2,
//               backgroundColor: `${action.color}.light`,
//               borderColor: `${action.color}.main`
//             }
//           }}
//         >
//           {action.label}
//         </Button>
//       </Grid>
//     ))}
//   </Grid>
// );

// // Calendar View Components
// const CalendarView = () => {
//   const { events, patients } = useCalendarData();
//   const [selectedEvents, setSelectedEvents] = useState([]);

//   return (
//     <Box sx={{ height: 'calc(100vh - 180px)' }}>
//       <CalendarHeader />
      
//       <CalendarContent 
//         events={events} 
//         patients={patients} 
//         selectedEvents={selectedEvents}
//         setSelectedEvents={setSelectedEvents}
//       />
//     </Box>
//   );
// };

// const useCalendarData = () => {
//   const mockIncidents = useMemo(() => [
//     { 
//       id: 1, 
//       title: 'Dental Cleaning', 
//       patientId: 1, 
//       appointmentDate: new Date().setHours(10, 0, 0, 0), 
//       status: 'Scheduled', 
//       treatment: 'Cleaning' 
//     },
//     { 
//       id: 2, 
//       title: 'Root Canal', 
//       patientId: 2, 
//       appointmentDate: new Date().setDate(new Date().getDate() + 1) + 14 * 60 * 60 * 1000, 
//       status: 'Scheduled', 
//       treatment: 'Root Canal' 
//     },
//     { 
//       id: 3, 
//       title: 'Checkup', 
//       patientId: 3, 
//       appointmentDate: new Date().setDate(new Date().getDate() + 2) + 16 * 60 * 60 * 1000, 
//       status: 'Scheduled', 
//       treatment: 'Checkup' 
//     },
//   ], []);

//   const patients = useMemo(() => [
//     { id: 1, name: 'John Doe' },
//     { id: 2, name: 'Sarah Smith' },
//     { id: 3, name: 'Michael Brown' },
//   ], []);

//   const events = useMemo(() => mockIncidents.map((incident) => ({
//     id: incident.id,
//     title: `${incident.title} — ${patients.find(p => p.id === incident.patientId)?.name || 'Unknown'}`,
//     start: new Date(incident.appointmentDate),
//     end: new Date(new Date(incident.appointmentDate).getTime() + APPOINTMENT_DURATION),
//     allDay: false,
//     status: incident.status,
//     treatment: incident.treatment,
//     patientId: incident.patientId,
//     appointmentDate: incident.appointmentDate,
//   })), [mockIncidents, patients]);

//   return { events, patients };
// };

// const CalendarHeader = () => (
//   <Fade in timeout={500}>
//     <Box sx={{ mb: 4 }}>
//       <Typography variant="h4" fontWeight={700} color={COLOR_SCHEME.primary}>
//         Appointment Calendar
//       </Typography>
//       <Typography variant="subtitle1" color="text.secondary">
//         Manage and view all scheduled appointments
//       </Typography>
//     </Box>
//   </Fade>
// );

// const CalendarContent = ({ events, patients, selectedEvents, setSelectedEvents }) => {
//   const handleSelectEvent = (event) => {
//     const incident = events.find(e => e.id === event.id);
//     setSelectedEvents([incident]);
//   };

//   return (
//     <Box sx={{ display: 'flex', height: '85%', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
//       <CalendarSection events={events} onSelectEvent={handleSelectEvent} />
      
//       <AppointmentDetails 
//         selectedEvents={selectedEvents} 
//         patients={patients} 
//       />
//     </Box>
//   );
// };

// const CalendarSection = ({ events, onSelectEvent }) => (
//   <Box sx={{ flex: 3 }}>
//     <Fade in timeout={600}>
//       <Paper elevation={0} sx={{ 
//         height: '100%', 
//         borderRadius: COLOR_SCHEME.borderRadius,
//         backgroundColor: COLOR_SCHEME.cardBackground,
//         boxShadow: COLOR_SCHEME.shadow
//       }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           views={['month', 'week', 'day', 'agenda']}
//           defaultView="month"
//           onSelectEvent={onSelectEvent}
//           eventPropGetter={eventStyleGetter}
//           style={{ height: '100%', padding: '16px' }}
//         />
//       </Paper>
//     </Fade>
//   </Box>
// );

// const eventStyleGetter = (event) => {
//   const statusColors = {
//     Completed: '#4caf50',
//     Cancelled: '#f44336',
//     Scheduled: '#ff9800',
//     default: '#1976d2'
//   };

//   return {
//     style: {
//       backgroundColor: statusColors[event.status] || statusColors.default,
//       borderRadius: '6px',
//       color: 'white',
//       border: 0,
//       paddingLeft: '4px',
//       fontWeight: 'bold'
//     },
//   };
// };

// const AppointmentDetails = ({ selectedEvents, patients }) => (
//   <Box sx={{ flex: 1 }}>
//     <Fade in timeout={700}>
//       <Paper elevation={0} sx={{ 
//         p: 3, 
//         borderRadius: COLOR_SCHEME.borderRadius,
//         backgroundColor: COLOR_SCHEME.cardBackground,
//         boxShadow: COLOR_SCHEME.shadow,
//         height: '100%', 
//         overflowY: 'auto' 
//       }}>
//         <Typography variant="h5" fontWeight={700} color={COLOR_SCHEME.primary} gutterBottom>
//           Appointment Details
//         </Typography>

//         {selectedEvents.length > 0 ? (
//           <AppointmentDetailsList events={selectedEvents} patients={patients} />
//         ) : (
//           <EmptyAppointmentState />
//         )}
//       </Paper>
//     </Fade>
//   </Box>
// );

// const AppointmentDetailsList = ({ events, patients }) => (
//   <List disablePadding>
//     {events.map((event) => (
//       <Box key={event.id}>
//         <ListItem alignItems="flex-start" sx={{ p: 2 }}>
//           <ListItemText
//             primary={
//               <Typography variant="subtitle1" fontWeight="bold">
//                 {event.title}
//               </Typography>
//             }
//             secondary={
//               <AppointmentDetailsContent event={event} patients={patients} />
//             }
//           />
//         </ListItem>
//         <Divider />
//       </Box>
//     ))}
//   </List>
// );

// const AppointmentDetailsContent = ({ event, patients }) => (
//   <Stack spacing={1} mt={1}>
//     <DetailRow 
//       icon={<PersonIcon fontSize="small" color="primary" />} 
//       text={`Patient: ${patients.find(p => p.id === event.patientId)?.name}`} 
//     />
//     <DetailRow 
//       icon={<CalendarIcon fontSize="small" color="primary" />} 
//       text={`Date: ${new Date(event.appointmentDate).toLocaleString()}`} 
//     />
//     <DetailRow 
//       icon={<InfoIcon fontSize="small" color="primary" />} 
//       text={
//         <>
//           Status: <StatusChip status={event.status} />
//         </>
//       } 
//     />
//     <DetailRow 
//       icon={<AssignmentIcon fontSize="small" color="primary" />} 
//       text={`Treatment: ${event.treatment || 'Not specified'}`} 
//     />
//   </Stack>
// );

// const DetailRow = ({ icon, text }) => (
//   <Stack direction="row" alignItems="center" spacing={1}>
//     {icon}
//     <Typography variant="body2">
//       {text}
//     </Typography>
//   </Stack>
// );

// const StatusChip = ({ status }) => {
//   const statusColors = {
//     Completed: 'success',
//     Cancelled: 'error',
//     Scheduled: 'warning'
//   };

//   return (
//     <Chip
//       size="small"
//       label={status}
//       color={statusColors[status] || 'default'}
//     />
//   );
// };

// const EmptyAppointmentState = () => (
//   <Box sx={{ 
//     display: 'flex', 
//     flexDirection: 'column', 
//     alignItems: 'center', 
//     justifyContent: 'center',
//     height: '200px',
//     textAlign: 'center'
//   }}>
//     <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
//     <Typography variant="body2" color="text.secondary">
//       Select an appointment from the calendar to view its details.
//     </Typography>
//   </Box>
// );

// export default Calendar; 

// // import React, { useState, useEffect } from 'react';
// // import { Calendar, Clock, User, Plus, Activity, DollarSign, CheckCircle, ArrowRight, Bell, Search, Filter, Settings, Menu, X } from 'lucide-react';

// // const DentalApp = () => {
// //   const [activeTab, setActiveTab] = useState('dashboard');
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [notifications, setNotifications] = useState(3);

// //   useEffect(() => {
// //     // Close sidebar when clicking outside on mobile
// //     const handleClickOutside = (event) => {
// //       if (sidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.menu-button')) {
// //         setSidebarOpen(false);
// //       }
// //     };

// //     document.addEventListener('click', handleClickOutside);
// //     return () => document.removeEventListener('click', handleClickOutside);
// //   }, [sidebarOpen]);

// //   const tabs = [
// //     { id: 'dashboard', label: 'Dashboard', icon: Activity },
// //     { id: 'calendar', label: 'Calendar', icon: Calendar },
// //     { id: 'patients', label: 'Patients', icon: User },
// //     { id: 'treatments', label: 'Treatments', icon: Activity },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
// //       {/* Mobile Sidebar Overlay */}
// //       {sidebarOpen && (
// //         <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" />
// //       )}

// //       {/* Sidebar */}
// //       <div className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 lg:translate-x-0 sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
// //         <div className="p-6 border-b border-gray-100">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-3">
// //               <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
// //                 <Activity className="w-5 h-5 text-white" />
// //               </div>
// //               <div>
// //                 <h1 className="text-xl font-bold text-gray-900">DentalCare</h1>
// //                 <p className="text-sm text-gray-500">Practice Management</p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={() => setSidebarOpen(false)}
// //               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
// //             >
// //               <X className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>

// //         <nav className="p-4">
// //           <div className="space-y-2">
// //             {tabs.map((tab) => {
// //               const Icon = tab.icon;
// //               return (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => {
// //                     setActiveTab(tab.id);
// //                     setSidebarOpen(false);
// //                   }}
// //                   className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
// //                     activeTab === tab.id
// //                       ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg transform scale-105'
// //                       : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
// //                   }`}
// //                 >
// //                   <Icon className="w-5 h-5" />
// //                   <span className="font-medium">{tab.label}</span>
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </nav>

// //         <div className="absolute bottom-6 left-4 right-4">
// //           <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-100">
// //             <div className="flex items-center space-x-3">
// //               <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
// //                 <User className="w-4 h-4 text-white" />
// //               </div>
// //               <div>
// //                 <p className="font-medium text-gray-900">Dr. Smith</p>
// //                 <p className="text-sm text-gray-500">Dentist</p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <div className="lg:ml-64">
// //         {/* Header */}
// //         <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
// //           <div className="px-4 sm:px-6 lg:px-8">
// //             <div className="flex items-center justify-between h-16">
// //               <div className="flex items-center space-x-4">
// //                 <button
// //                   onClick={() => setSidebarOpen(true)}
// //                   className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors menu-button"
// //                 >
// //                   <Menu className="w-5 h-5" />
// //                 </button>
// //                 <div className="relative">
// //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search patients, appointments..."
// //                     value={searchQuery}
// //                     onChange={(e) => setSearchQuery(e.target.value)}
// //                     className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
// //                   />
// //                 </div>
// //               </div>
// //               <div className="flex items-center space-x-4">
// //                 <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
// //                   <Bell className="w-5 h-5 text-gray-600" />
// //                   {notifications > 0 && (
// //                     <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
// //                       {notifications}
// //                     </span>
// //                   )}
// //                 </button>
// //                 <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
// //                   <Settings className="w-5 h-5 text-gray-600" />
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         {/* Page Content */}
// //         <main className="p-4 sm:p-6 lg:p-8">
// //           {activeTab === 'dashboard' && <DashboardView />}
// //           {activeTab === 'calendar' && <CalendarView />}
// //           {activeTab === 'patients' && <PatientsView />}
// //           {activeTab === 'treatments' && <TreatmentsView />}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // const DashboardView = () => {
// //   const [timeOfDay, setTimeOfDay] = useState('');

// //   useEffect(() => {
// //     const hour = new Date().getHours();
// //     if (hour < 12) setTimeOfDay('morning');
// //     else if (hour < 17) setTimeOfDay('afternoon');
// //     else setTimeOfDay('evening');
// //   }, []);

// //   const stats = [
// //     { label: 'Today\'s Appointments', value: '8', change: '+2', icon: Calendar, color: 'bg-blue-500' },
// //     { label: 'Total Patients', value: '156', change: '+12', icon: User, color: 'bg-green-500' },
// //     { label: 'Revenue (Month)', value: '$12,500', change: '+8%', icon: DollarSign, color: 'bg-purple-500' },
// //     { label: 'Completed Today', value: '5', change: '+1', icon: CheckCircle, color: 'bg-cyan-500' },
// //   ];

// //   const upcomingAppointments = [
// //     { id: 1, patient: 'Sarah Johnson', time: '10:00 AM', procedure: 'Dental Cleaning', priority: 'medium', avatar: 'SJ' },
// //     { id: 2, patient: 'Michael Chen', time: '11:30 AM', procedure: 'Root Canal', priority: 'high', avatar: 'MC' },
// //     { id: 3, patient: 'Emily Davis', time: '2:00 PM', procedure: 'Checkup', priority: 'low', avatar: 'ED' },
// //     { id: 4, patient: 'John Wilson', time: '3:30 PM', procedure: 'Filling', priority: 'medium', avatar: 'JW' },
// //   ];

// //   const recentActivities = [
// //     { action: 'Completed cleaning for Sarah Johnson', time: '30 min ago', type: 'completed' },
// //     { action: 'Scheduled appointment for new patient', time: '1 hour ago', type: 'scheduled' },
// //     { action: 'Updated treatment plan for Michael Chen', time: '2 hours ago', type: 'updated' },
// //   ];

// //   return (
// //     <div className="space-y-8">
// //       {/* Welcome Section */}
// //       <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //           <div>
// //             <h1 className="text-2xl sm:text-3xl font-bold mb-2">
// //               Good {timeOfDay}, Dr. Smith! 👋
// //             </h1>
// //             <p className="text-blue-100 text-lg">
// //               You have 8 appointments today. Here's your overview.
// //             </p>
// //           </div>
// //           <button className="mt-4 sm:mt-0 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-6 py-3 rounded-xl transition-all duration-200 flex items-center space-x-2">
// //             <Plus className="w-5 h-5" />
// //             <span className="font-medium">New Appointment</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Stats Grid */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {stats.map((stat, index) => {
// //           const Icon = stat.icon;
// //           return (
// //             <div
// //               key={index}
// //               className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
// //             >
// //               <div className="flex items-center justify-between">
// //                 <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
// //                   <Icon className="w-6 h-6 text-white" />
// //                 </div>
// //                 <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-lg">
// //                   {stat.change}
// //                 </span>
// //               </div>
// //               <div className="mt-4">
// //                 <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
// //                 <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Main Content Grid */}
// //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //         {/* Upcoming Appointments */}
// //         <div className="lg:col-span-2">
// //           <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
// //             <div className="flex items-center justify-between mb-6">
// //               <h2 className="text-xl font-bold text-gray-900">Today's Appointments</h2>
// //               <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
// //                 <span>View all</span>
// //                 <ArrowRight className="w-4 h-4" />
// //               </button>
// //             </div>
// //             <div className="space-y-4">
// //               {upcomingAppointments.map((appointment) => (
// //                 <div
// //                   key={appointment.id}
// //                   className="flex items-center p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
// //                 >
// //                   <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
// //                     {appointment.avatar}
// //                   </div>
// //                   <div className="ml-4 flex-1">
// //                     <div className="flex items-center justify-between">
// //                       <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
// //                       <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
// //                         appointment.priority === 'high' ? 'bg-red-100 text-red-700' :
// //                         appointment.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
// //                         'bg-green-100 text-green-700'
// //                       }`}>
// //                         {appointment.priority}
// //                       </span>
// //                     </div>
// //                     <div className="flex items-center space-x-4 mt-1">
// //                       <div className="flex items-center space-x-1 text-gray-500">
// //                         <Clock className="w-4 h-4" />
// //                         <span className="text-sm">{appointment.time}</span>
// //                       </div>
// //                       <span className="text-sm text-gray-600">{appointment.procedure}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Recent Activities */}
// //         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
// //           <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activities</h2>
// //           <div className="space-y-4">
// //             {recentActivities.map((activity, index) => (
// //               <div key={index} className="flex items-start space-x-3">
// //                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
// //                   activity.type === 'completed' ? 'bg-green-100' :
// //                   activity.type === 'scheduled' ? 'bg-blue-100' :
// //                   'bg-yellow-100'
// //                 }`}>
// //                   {activity.type === 'completed' ? (
// //                     <CheckCircle className="w-4 h-4 text-green-600" />
// //                   ) : activity.type === 'scheduled' ? (
// //                     <Calendar className="w-4 h-4 text-blue-600" />
// //                   ) : (
// //                     <Activity className="w-4 h-4 text-yellow-600" />
// //                   )}
// //                 </div>
// //                 <div className="flex-1">
// //                   <p className="text-sm text-gray-900">{activity.action}</p>
// //                   <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const CalendarView = () => {
// //   const [selectedDate, setSelectedDate] = useState(new Date());
// //   const [viewType, setViewType] = useState('week');

// //   const appointments = [
// //     { id: 1, patient: 'Sarah Johnson', time: '10:00', duration: 60, type: 'cleaning' },
// //     { id: 2, patient: 'Michael Chen', time: '11:30', duration: 90, type: 'root-canal' },
// //     { id: 3, patient: 'Emily Davis', time: '14:00', duration: 30, type: 'checkup' },
// //     { id: 4, patient: 'John Wilson', time: '15:30', duration: 45, type: 'filling' },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
// //           <p className="text-gray-600 mt-1">Manage your appointments and schedule</p>
// //         </div>
// //         <div className="flex items-center space-x-3 mt-4 sm:mt-0">
// //           <div className="flex bg-gray-100 rounded-lg p-1">
// //             {['day', 'week', 'month'].map((type) => (
// //               <button
// //                 key={type}
// //                 onClick={() => setViewType(type)}
// //                 className={`px-3 py-1 rounded-md text-sm font-medium capitalize transition-colors ${
// //                   viewType === type
// //                     ? 'bg-white text-gray-900 shadow-sm'
// //                     : 'text-gray-600 hover:text-gray-900'
// //                 }`}
// //               >
// //                 {type}
// //               </button>
// //             ))}
// //           </div>
// //           <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
// //             <Plus className="w-4 h-4" />
// //             <span>New Appointment</span>
// //           </button>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-lg font-semibold text-gray-900">
// //               {selectedDate.toLocaleDateString('en-US', { 
// //                 weekday: 'long', 
// //                 year: 'numeric', 
// //                 month: 'long', 
// //                 day: 'numeric' 
// //               })}
// //             </h2>
// //             <div className="flex items-center space-x-2">
// //               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
// //                 <ArrowRight className="w-5 h-5 rotate-180" />
// //               </button>
// //               <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
// //                 <ArrowRight className="w-5 h-5" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="p-6">
// //           <div className="space-y-3">
// //             {appointments.map((appointment) => (
// //               <div
// //                 key={appointment.id}
// //                 className={`p-4 rounded-xl border-l-4 transition-all duration-200 hover:shadow-md cursor-pointer ${
// //                   appointment.type === 'cleaning' ? 'bg-blue-50 border-blue-500' :
// //                   appointment.type === 'root-canal' ? 'bg-red-50 border-red-500' :
// //                   appointment.type === 'checkup' ? 'bg-green-50 border-green-500' :
// //                   'bg-yellow-50 border-yellow-500'
// //                 }`}
// //               >
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center space-x-3">
// //                     <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold ${
// //                       appointment.type === 'cleaning' ? 'bg-blue-500' :
// //                       appointment.type === 'root-canal' ? 'bg-red-500' :
// //                       appointment.type === 'checkup' ? 'bg-green-500' :
// //                       'bg-yellow-500'
// //                     }`}>
// //                       {appointment.patient.split(' ').map(n => n[0]).join('')}
// //                     </div>
// //                     <div>
// //                       <h3 className="font-semibold text-gray-900">{appointment.patient}</h3>
// //                       <p className="text-sm text-gray-600 capitalize">{appointment.type.replace('-', ' ')}</p>
// //                     </div>
// //                   </div>
// //                   <div className="text-right">
// //                     <p className="font-medium text-gray-900">{appointment.time}</p>
// //                     <p className="text-sm text-gray-600">{appointment.duration} min</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const PatientsView = () => {
// //   const [filterOpen, setFilterOpen] = useState(false);
  
// //   const patients = [
// //     { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '(555) 123-4567', lastVisit: '2024-06-15', nextAppointment: '2024-07-03', status: 'active' },
// //     { id: 2, name: 'Michael Chen', email: 'michael.c@email.com', phone: '(555) 234-5678', lastVisit: '2024-06-20', nextAppointment: '2024-07-05', status: 'active' },
// //     { id: 3, name: 'Emily Davis', email: 'emily.d@email.com', phone: '(555) 345-6789', lastVisit: '2024-05-28', nextAppointment: null, status: 'inactive' },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
// //           <p className="text-gray-600 mt-1">Manage your patient records and information</p>
// //         </div>
// //         <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
// //           <Plus className="w-4 h-4" />
// //           <span>Add Patient</span>
// //         </button>
// //       </div>

// //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
// //         <div className="p-6 border-b border-gray-200">
// //           <div className="flex items-center justify-between">
// //             <h2 className="text-lg font-semibold text-gray-900">Patient List</h2>
// //             <button
// //               onClick={() => setFilterOpen(!filterOpen)}
// //               className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
// //             >
// //               <Filter className="w-4 h-4" />
// //               <span>Filter</span>
// //             </button>
// //           </div>
// //         </div>

// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="text-left p-4 font-medium text-gray-900">Patient</th>
// //                 <th className="text-left p-4 font-medium text-gray-900">Contact</th>
// //                 <th className="text-left p-4 font-medium text-gray-900">Last Visit</th>
// //                 <th className="text-left p-4 font-medium text-gray-900">Next Appointment</th>
// //                 <th className="text-left p-4 font-medium text-gray-900">Status</th>
// //                 <th className="text-left p-4 font-medium text-gray-900">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-200">
// //               {patients.map((patient) => (
// //                 <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
// //                   <td className="p-4">
// //                     <div className="flex items-center space-x-3">
// //                       <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-semibold">
// //                         {patient.name.split(' ').map(n => n[0]).join('')}
// //                       </div>
// //                       <div>
// //                         <p className="font-medium text-gray-900">{patient.name}</p>
// //                         <p className="text-sm text-gray-600">ID: {patient.id.toString().padStart(4, '0')}</p>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td className="p-4">
// //                     <p className="text-sm text-gray-900">{patient.email}</p>
// //                     <p className="text-sm text-gray-600">{patient.phone}</p>
// //                   </td>
// //                   <td className="p-4">
// //                     <p className="text-sm text-gray-900">{patient.lastVisit}</p>
// //                   </td>
// //                   <td className="p-4">
// //                     <p className="text-sm text-gray-900">{patient.nextAppointment || 'None scheduled'}</p>
// //                   </td>
// //                   <td className="p-4">
// //                     <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
// //                       patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
// //                     }`}>
// //                       {patient.status}
// //                     </span>
// //                   </td>
// //                   <td className="p-4">
// //                     <div className="flex items-center space-x-2">
// //                       <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
// //                         <User className="w-4 h-4" />
// //                       </button>
// //                       <button className="p-2 hover:bg-green-50 text-green-600 rounded-lg transition-colors">
// //                         <Calendar className="w-4 h-4" />
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const TreatmentsView = () => {
// //   const treatments = [
// //     { id: 1, patient: 'Sarah Johnson', treatment: 'Dental Cleaning', status: 'completed', date: '2024-06-15', cost: 150 },
// //     { id: 2, patient: 'Michael Chen', treatment: 'Root Canal', status: 'in-progress', date: '2024-06-20', cost: 1200 },
// //     { id: 3, patient: 'Emily Davis', treatment: 'Teeth Whitening', status: 'scheduled', date: '2024-07-05', cost: 300 },
// //   ];

// //   return (
// //     <div className="space-y-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //         <div>
// //           <h1 className="text-2xl font-bold text-gray-900">Treatments</h1>
// //           <p className="text-gray-600 mt-1">Track and manage treatment plans</p>
// //         </div>
// //         <button className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
// //           <Plus className="w-4 h-4" />
// //           <span>New Treatment</span>
// //         </button>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {treatments.map((treatment) => (
// //           <div key={treatment.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
// //             <div className="flex items-center justify-between mb-4">
// //               <h3 className="font-semibold text-gray-900">{treatment.treatment}</h3>
// //               <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
// //                 treatment.status === 'completed' ? 'bg-green-100 text-green-700' :
// //                 treatment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
// //                 'bg-blue-100 text-blue-700'
// //               }`}>
// //                 {treatment.status}
// //               </span>
// //             </div>
// //             <div className="space-y-2">
// //               <p className="text-sm text-gray-600">
// //                 <span className="font-medium">Patient:</span> {treatment.patient}
// //               </p>
// //               <p className="text-sm text-gray-600">
// //                 <span className="font-medium">Date:</span> {treatment.date}
// //               </p>
// //               <p className="text-sm text-gray-600">
// //                 <span className="font-medium">Cost:</span> ${treatment.cost}
// //               </p>
// //             </div>
// //             <div className="mt-4 pt-4 border-t border-gray-200">
// //               <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm">
// //                 View Details
// //               </button>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default DentalApp;

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