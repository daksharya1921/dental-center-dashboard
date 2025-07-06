// import { Link as RouterLink } from 'react-router-dom';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { useAuth } from '../../context/AuthContext';

// const Navbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Dental Center
//         </Typography>
//         {user && (
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             {user.role === 'Admin' && (
//               <>
//                 <Button color="inherit" component={RouterLink} to="/dashboard">
//                   Dashboard
//                 </Button>
//                 <Button color="inherit" component={RouterLink} to="/patients">
//                   Patients
//                 </Button>
//                 <Button color="inherit" component={RouterLink} to="/appointments">
//                   Appointments
//                 </Button>
//                 <Button color="inherit" component={RouterLink} to="/calendar">
//                   Calendar
//                 </Button>
//               </>
//             )}
//             {user.role === 'Patient' && (
//               <Button color="inherit" component={RouterLink} to="/patient-view">
//                 My Records
//               </Button>
//             )}
//             <Button color="inherit" onClick={logout}>
//               Logout
//             </Button>
//           </Box>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
import { Link as RouterLink } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  CalendarToday as CalendarIcon,
  ExitToApp as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Dental Center
        </Typography>
        
        {user && (
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
            {user.role === 'Admin' && (
              <>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/dashboard"
                  startIcon={<DashboardIcon />}
                >
                  Dashboard
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/patients"
                  startIcon={<PeopleIcon />}
                >
                  Patients
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/appointments"
                  startIcon={<CalendarIcon />}
                >
                  Appointments
                </Button>
                <Button 
                  color="inherit" 
                  component={RouterLink} 
                  to="/calendar"
                  startIcon={<CalendarIcon />}
                >
                  Calendar
                </Button>
              </>
            )}
            {user.role === 'Patient' && (
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/patient-view"
                startIcon={<PeopleIcon />}
              >
                My Records
              </Button>
            )}
            <Button 
              color="inherit" 
              onClick={logout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Box>
        )}
        
        {/* Mobile menu */}
        {user && (
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {user.role === 'Admin' && [
                <MenuItem key="dashboard" component={RouterLink} to="/dashboard" onClick={handleMenuClose}>
                  <DashboardIcon sx={{ mr: 1 }} /> Dashboard
                </MenuItem>,
                <MenuItem key="patients" component={RouterLink} to="/patients" onClick={handleMenuClose}>
                  <PeopleIcon sx={{ mr: 1 }} /> Patients
                </MenuItem>,
                <MenuItem key="appointments" component={RouterLink} to="/appointments" onClick={handleMenuClose}>
                  <CalendarIcon sx={{ mr: 1 }} /> Appointments
                </MenuItem>,
                <MenuItem key="calendar" component={RouterLink} to="/calendar" onClick={handleMenuClose}>
                  <CalendarIcon sx={{ mr: 1 }} /> Calendar
                </MenuItem>,
              ]}
              {user.role === 'Patient' && (
                <MenuItem component={RouterLink} to="/patient-view" onClick={handleMenuClose}>
                  <PeopleIcon sx={{ mr: 1 }} /> My Records
                </MenuItem>
              )}
              <MenuItem onClick={() => { handleMenuClose(); logout(); }}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;