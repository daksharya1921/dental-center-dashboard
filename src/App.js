import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useEffect } from 'react';
import { initializeData } from './utils/dataService';
import Navbar from './components/shared/Navbar';
import { CssBaseline, Container } from '@mui/material';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Calendar from './pages/Calendar';
import PatientView from './pages/PatientView';

// Components
import ProtectedRoute from './components/shared/ProtectedRoute';
import PatientForm from './components/patients/PatientForm';
import AppointmentForm from './components/appointments/AppointmentForm';

function App() {
  // Initialize data on app load
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/add" element={<PatientForm />} />
              <Route path="/patients/edit/:id" element={<PatientForm />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/appointments/add" element={<AppointmentForm />} />
              <Route path="/appointments/edit/:id" element={<AppointmentForm />} />
              <Route path="/calendar" element={<Calendar />} />
            </Route>
            
            {/* Patient route */}
            <Route element={<ProtectedRoute allowedRoles={['Patient']} />}>
              <Route path="/patient-view" element={<PatientView />} />
            </Route>
            
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </Container>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;