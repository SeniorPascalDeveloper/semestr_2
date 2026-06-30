import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

interface CardProps {
  building: {
    img: string;
    title: string;
    description: string[];
  };
  index: number;
}

function DramaCard({ building, index }: CardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: { 
          xs: 'column', 
          md: index % 2 === 0 ? 'row' : 'row-reverse' 
        },
        boxShadow: 'none',
        mb: 4,
      }}
    >
      <CardMedia
        component="img"
        image={building.img}
        alt={building.title}
        sx={{ width: { 
            xs: '100%', 
            md: '40%' 
          }, objectFit: 'cover' }}
      />
      <CardContent 
        sx={{ 

          width: { xs: '100%', md: '60%' }, 
          
          textAlign: { 
            xs: 'center', 
            md: index % 2 === 0 ? 'left' : 'right' 
          } 
        }}
      >
        <Typography variant="h5" gutterBottom>
          {building.title}
        </Typography>
        {building.description.map((p, i) => (
          <Typography key={i} variant="body2" sx={{ mb: 1 }}>
            {p}
          </Typography>
        ))}
        <Link href="#" underline="hover">Подробнее»</Link>
      </CardContent>
    </Card>
  );
}

export default DramaCard;