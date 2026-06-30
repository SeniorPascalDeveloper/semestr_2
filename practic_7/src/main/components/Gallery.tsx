import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import structures from '../../data';

const galleryData = [
  { item: structures[0], index: 0, size: 2 },
  { item: structures[1], index: 1, size: 2 },
  { item: structures[2], index: 2, size: 4 },
  { item: structures[3], index: 3, size: 2 },
  { item: structures[4], index: 4, size: 2 },
];

function Gallery() {
  return (
    <Container maxWidth="xl" sx={{ my: 3 }}>
      <Grid container spacing={1}>
        {galleryData.map(({ item, index, size }, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: size }}>
            <Link to={'/drama/' + index}>
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{
                  width: '100%',
                  height: 280,
                  objectFit: 'cover',
                  display: 'block',
                  cursor: 'pointer',
                }}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Gallery;