import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <Box sx={{ borderTop: '1px solid #ddd', mt: 4, py: 2 }}>
      <Container>
        <Typography variant="body2" sx={{ textAlign: 'center' }}>
          Группа: 2 · Ваша фамилия
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;