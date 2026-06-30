import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const StyledTypography = styled(Typography)(() => ({
  color: 'text.secondary',
  textAlign: 'justify',
  marginBottom: '12px',
}));

interface ComponentProps {
  building: {
    img: string,
    title: string,
    description: string[],
  };
  index: number;
}

function BuildCard({ building, index }: ComponentProps) {
  return (
    <Card 
      sx={{ 
        display: 'flex', 
        flexDirection: { 
          xs: 'column', 
          md: index % 2 === 0 ? 'row' : 'row-reverse' 
        } 
      }}
    >
      <CardMedia
        component="img"
        alt={building.title}
        image={building.img}
        sx={{ 

          width: { 
            xs: '100%', 
            md: '40%' 
          },
        }}
      />
      
      <Box sx={{ width: { xs: '100%', md: '60%' } }}>
        <CardContent>
          <Typography gutterBottom variant="h5" >
            {building.title}
          </Typography>
          {building.description.map((item, ind) => (
            <StyledTypography key={ind} variant="body2" sx={{ color: 'text.secondary' }}>
              {item}
            </StyledTypography>
          ))}
        </CardContent>
        
        <CardActions 
          sx={{ 
            justifyContent: { 
              xs: 'start', 
              md: index % 2 === 0 ? 'end' : 'start' 
            } 
          }} 
        >
          <Button size="small">Подробнее</Button>
        </CardActions>
      </Box>
    </Card>
  )
}

export default BuildCard;