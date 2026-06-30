import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#5d8aa8',
        color: '#fff',
        mt: '40px',
        py: '24px',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Typography variant="h6">
            Самые высокие здания и сооружения
          </Typography>

          <Box sx={{ display: 'flex', gap: '16px' }}>
            <Link href="#" color="inherit" underline="hover">
              Главная
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Список зданий
            </Link>
            <Link href="#" color="inherit" underline="hover">
              Контакты
            </Link>
          </Box>
        </Box>

        <Typography variant="body2" sx={{ textAlign: 'center', mt: '16px' }}>
          © 2025 Самые высокие здания и сооружения. Все права защищены.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
