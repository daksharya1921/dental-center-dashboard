import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
  Paper,
  Grid,
  Avatar,
  Fade
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import dentalImage from '../assets/dentist-428646_640.jpg';

const Login = () => {
  const [email, setEmail] = useState('admin@entnt.in');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Grid container sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8f9fa',
      backgroundImage: 'linear-gradient(to bottom right, #f0f8ff, #e6f7ff)'
    }}>
      {/* Left Side – Login Form */}
      <Grid size={{ xs: 12, md: 6 }} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 4,
        position: 'relative'
      }}>
        <Fade in timeout={800}>
          <Paper elevation={6} sx={{
            p: { xs: 3, md: 5 },
            width: '100%',
            maxWidth: 450,
            borderRadius: '16px',
            backgroundColor: 'white',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid rgba(0, 0, 0, 0.05)',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)'
            }
          }}>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ mb: 4 }}>
              <Avatar sx={{ 
                bgcolor: '#00acc1', 
                mb: 2,
                width: 64,
                height: 64,
                boxShadow: '0 4px 12px rgba(0, 172, 193, 0.3)'
              }}>
                <LocalHospitalIcon fontSize="large" sx={{ fontSize: '32px' }} />
              </Avatar>
              <Typography variant="h4" fontWeight="bold" color="#007c91" sx={{ 
                mb: 0.5,
                letterSpacing: '-0.5px'
              }}>
                ENTNT Dental
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" sx={{ 
                fontSize: '0.95rem',
                fontWeight: 500
              }}>
                Welcome back! Please sign in to continue
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Email Address"
                fullWidth
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 3 }}
                required
                autoComplete="username"
                InputProps={{
                  sx: {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    }
                  }
                }}
              />
              <TextField
                label="Password"
                fullWidth
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 1 }}
                required
                autoComplete="current-password"
                InputProps={{
                  sx: {
                    borderRadius: '12px',
                    '& fieldset': {
                      borderColor: '#e0e0e0'
                    }
                  }
                }}
              />
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      color="primary"
                      sx={{
                        color: '#00acc1',
                        '&.Mui-checked': {
                          color: '#00acc1'
                        }
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="text.secondary">
                      Remember me
                    </Typography>
                  }
                />
                <Link href="#" underline="hover" sx={{ 
                  fontSize: '0.875rem',
                  color: '#007c91',
                  fontWeight: 500
                }}>
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: '#00acc1',
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  mb: 2,
                  borderRadius: '12px',
                  letterSpacing: '0.5px',
                  '&:hover': { 
                    backgroundColor: '#00838f',
                    boxShadow: '0 4px 12px rgba(0, 172, 193, 0.3)'
                  }
                }}
              >
                Sign In
              </Button>

              {error && (
                <Typography 
                  color="error" 
                  textAlign="center" 
                  fontSize="0.9rem"
                  sx={{ 
                    backgroundColor: '#ffebee',
                    p: 1.5,
                    borderRadius: '8px',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12M12 16H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#d32f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {error}
                </Typography>
              )}
            </Box>
          </Paper>
        </Fade>
      </Grid>

      {/* Right Side – Dental Info Panel with Image */}
      <Grid size={{ xs: 0, md: 6 }} sx={{
        display: { xs: 'none', md: 'flex' },
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 100%)',
        p: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(178, 235, 242, 0.4) 0%, transparent 60%)'
        }
      }}>
        <Fade in timeout={1000}>
          <Box sx={{ 
            maxWidth: 500, 
            textAlign: 'center',
            zIndex: 1,
            position: 'relative'
          }}>
            {/* Image with subtle animation */}
            <Box
              component="img"
              src={dentalImage}
              alt="Dental Care"
              sx={{
                width: '100%',
                maxWidth: 400,
                mb: 4,
                borderRadius: '16px',
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                transform: 'perspective(1000px) rotateY(-5deg)',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'perspective(1000px) rotateY(0deg)'
                }
              }}
            />

            <Typography variant="h4" fontWeight="bold" color="#007c91" sx={{ 
              mb: 2,
              lineHeight: 1.3,
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              "Your Smile is Our Priority"
            </Typography>
            <Typography variant="body1" sx={{ 
              fontSize: '1.1rem', 
              mb: 3,
              color: '#455a64',
              lineHeight: 1.6
            }}>
              At ENTNT Dental Center, we combine cutting-edge technology with compassionate care to deliver exceptional dental experiences.
            </Typography>
            <Box sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              p: 2,
              borderRadius: '12px',
              display: 'inline-block',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
            }}>
              <Typography variant="h6" fontWeight="bold" color="#007c91" sx={{ mb: 0.5 }}>
                Need assistance?
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#546e7a',
                fontSize: '0.95rem'
              }}>
                Contact us at <Link href="mailto:support@entntdental.com" sx={{ 
                  color: '#00acc1',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}>support@entntdental.com</Link>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Grid>
    </Grid>
  );
};

export default Login;