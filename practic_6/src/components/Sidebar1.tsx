import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { actors } from '../data';

const sidebarData = [actors[0], actors[1]];

function Sidebar1() {
  return (
    <Box>
      {sidebarData.map((item, i) => (
        <Card
          key={i}
          variant="outlined"
          sx={{ borderRadius: 4, mb: 3, p: 1 }}
        >
          <CardMedia
            component="img"
            image={item.img}
            alt={item.title}
            sx={{ borderRadius: 3, height: 180, objectFit: 'cover' }}
          />
          <CardContent>
            <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {item.description[0]}
            </Typography>
            <Link href="#" underline="hover">Подробнее»</Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default Sidebar1;