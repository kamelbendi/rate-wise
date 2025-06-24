import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const fontFamily = `'Montserrat', 'Roboto', 'Arial', sans-serif`;

const Header = () => (
  <Box
    sx={{
      background: 'linear-gradient(to right, rgba(255,255,255,0.90), rgba(255,255,255,0.95), rgba(255,255,255,0.90))',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(8px)',
    }}
  >
    <Container maxWidth="lg" sx={{ px: 6, py: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Box display="flex" alignItems="center" gap={3}>
          <Box
            sx={{
              background: 'linear-gradient(135deg,rgb(0, 0, 0),rgb(47, 48, 96),rgb(0, 0, 0))',
              borderRadius: 3,
              p: 2,
              boxShadow: 4,
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: 8,
                transform: 'scale(1.05)',
              },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUpIcon sx={{ color: '#fff', fontSize: 32, animation: 'pulse 2s infinite' }} />
          </Box>
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: 'linear-gradient(to right, #1e293b, #475569)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 0.5,
                animation: 'fadeIn 1s',
                fontFamily,
              }}
              data-testid="header-title"
            >
              RateWise
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#475569', fontWeight: 500, fontFamily }}
              data-testid="header-subtitle"
            >
              Real-time USD conversion rates
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet" />
    <style>{`
      @keyframes pulse {
        0% { filter: brightness(1); }
        50% { filter: brightness(1.2); }
        100% { filter: brightness(1); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `}</style>
  </Box>
);

export default Header; 