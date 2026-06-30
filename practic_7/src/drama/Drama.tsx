import { useParams, Link } from 'react-router-dom';
import { dramas } from '../data';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function Drama() {
  const { id } = useParams();
  const index = Number(id);
  const drama = dramas[index];

  if (!drama) {
    return (
      <div>
        <Navbar active="1" />
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          <Typography>Дорама не найдена</Typography>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        <Breadcrumbs sx={{ mb: '20px' }}>
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Главная
          </Link>
          <Typography color="text.primary">{drama.title}</Typography>
        </Breadcrumbs>

        <Typography variant="h4" align="center" sx={{ mb: '20px' }}>
          {drama.title}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <Box
            component="img"
            src={drama.img}
            alt={drama.title}
            sx={{ maxWidth: '100%', maxHeight: 480 }}
          />
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {drama.description.map((text, i) => (
            <Grid key={i} size={{ xs: 12, md: 6 }}>
              <Typography align="justify" sx={{ fontSize: '0.95rem' }}>
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Footer />
    </div>
  );
}

export default Drama;