import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {actors} from '../../data';

const circlesData = [actors[0], actors[1], actors[2]];

function Circles() {
  return (
    <Grid container spacing={2} sx={{ mb: 4 }}>
      {circlesData.map((item, i) => (
        <Grid key={i} size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
          <Avatar
            src={item.img}
            alt={item.title}
            sx={{ width: 90, height: 90, mx: 'auto', mb: 1 }}
          />
          <Typography variant="h6">{item.title}</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {item.description[0]}
          </Typography>
          <Button variant="contained" size="small">Подробнее»</Button>
        </Grid>
      ))}
    </Grid>
  );
}

export default Circles;