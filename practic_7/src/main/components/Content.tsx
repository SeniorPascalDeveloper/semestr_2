import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import LeftColumn from './LeftColumn';
import Sidebar1 from './Sidebar1';

function Content() {
  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, lg: 8 }} sx={{ borderRight: { lg: '2px solid #ddd' } }}>
          <LeftColumn />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Sidebar1 />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Content;