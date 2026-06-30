import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import structures from "../../data";

const imgData = structures.slice(0, -1);

function Gallery() {
    return (
        <Container maxWidth="lg">
            <Box sx={{ 
                width: '100%', 
                maxWidth: 800, 
                height: { xs: 'auto', md: 585 },
                overflowY: { xs: 'visible', md: 'scroll' },
                m: '20px auto',
                p: { xs: 1, sm: 0 }
            }}>
                <ImageList 
                    variant="masonry" 
                    cols={4} 
                    gap={8}
                    sx={{
                        columnCount: {
                            xs: '1 !important',
                            sm: '2 !important',
                            md: '3 !important',
                            lg: '4 !important',
                        },
                    }}
                >
                    {imgData.map((item, index) => (
                        <Link 
                            key={index} 
                            to={"/building/" + index}
                            style={{ 
                                textDecoration: 'none',
                                display: 'block'
                            }}
                        >
                            <ImageListItem 
                                sx={{
                                    cursor: 'pointer',
                                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    '&:hover': {
                                        transform: 'scale(1.03)',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                                        zIndex: 1,
                                    },
                                    '&:hover .MuiImageListItemBar-root': {
                                        opacity: 1,
                                    },
                                    '& .MuiImageListItemBar-root': {
                                        transition: 'opacity 0.3s ease',
                                    },
                                }}
                            >
                                <img
                                    srcSet={item.img}
                                    src={item.img}
                                    alt={item.title}
                                    loading="lazy"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        borderRadius: '4px',
                                    }}
                                />
                                <ImageListItemBar 
                                    position="bottom" 
                                    title={item.title}
                                    sx={{
                                        '& .MuiImageListItemBar-title': {
                                            fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' },
                                            fontWeight: 500,
                                        },
                                        '& .MuiImageListItemBar-root': {
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                                        }
                                    }}
                                />
                            </ImageListItem>
                        </Link>
                    ))}
                </ImageList>
            </Box>
        </Container>
    );
}

export default Gallery;