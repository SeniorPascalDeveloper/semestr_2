import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import MenuItem from '@mui/material/MenuItem';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  border: '1px solid',
  borderColor: theme.palette.divider,
  padding: '8px 12px',
}));

interface ComponentProps {
  active: string;
}

const pages = [
  { name: 'Главная', path: '/', key: '1' },
  { name: 'Список дорам', path: '/list', key: '2' },
  { name: 'Диаграммы', path: '/chart', key: '3' },
  { name: 'Проверь себя', path: '/testing', key: '4' },
];

function Navbar({ active }: ComponentProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        mt: '28px',
      }}
    >
      <Container maxWidth="xl">
        <StyledToolbar>
          {/* Меню для широкого экрана */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.key} to={page.path} style={{ textDecoration: 'none' }}>
                <Button
                  variant={active === page.key ? 'contained' : 'text'}
                  color="info"
                  size="medium"
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Свёрнутое меню (мобильное) */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuList>
                  {pages.map((page) => (
                    <Link
                      key={page.key}
                      to={page.path}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                      onClick={toggleDrawer(false)}
                    >
                      <MenuItem
                        selected={active === page.key}
                        sx={{ '&:hover': { bgcolor: '#cfe0ec' } }}
                      >
                        {page.name}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </Box>
            </Drawer>
          </Box>

          {/* Поиск */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, ml: 'auto' }}>
            <TextField size="small" placeholder="Поиск по сайту" />
            <Button variant="contained" color="info">
              Найти
            </Button>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;