import { useParams, Link } from 'react-router-dom';
import structures from '../data';
import Navbar from '../components/Navbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';

function Building() {
  const { id } = useParams();
  const index = Number(id);
  const building = structures[index];

  if (!building) {
    return (
      <div>
        <Navbar active="1" />
        <Container maxWidth="lg" sx={{ mt: '20px' }}>
          <Typography>Здание не найдено</Typography>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <Navbar active="1" />
      <Container maxWidth="lg" sx={{ mt: '20px' }}>
        {/* Навигационная цепочка */}
        <Breadcrumbs sx={{ mb: '20px' }}>
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'none' }}>
            ГЛАВНАЯ
          </Link>
          <Typography color="text.primary">{building.title}</Typography>
        </Breadcrumbs>

        {/* Заголовок */}
        <Typography variant="h4" align="center" sx={{ mb: '20px', color: '#555' }}>
          {building.title}
        </Typography>

        {/* Картинка по центру */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '20px' }}>
          <img
            src={building.img}
            alt={building.title}
            style={{ maxWidth: '100%', height: 'auto'}}
          />
        </Box>

        {/* Описание в две колонки (адаптивно) */}
        <Grid container spacing={3}>
          {building.description.map((text, i) => (
            <Grid size={{ xs: 12, md: 6 }} key={i}>
              <Typography align="justify" sx={{ fontSize: '0.95rem', color: '#333' }}>
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Building;