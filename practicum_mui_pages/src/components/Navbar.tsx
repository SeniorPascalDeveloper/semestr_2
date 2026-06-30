import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

type ComponentProps = {
  active: string;
};

const pages = [
  { name: 'Главная', path: '/', key: '1' },
  { name: 'Список зданий', path: '/list', key: '2' },
  { name: 'Диаграммы', path: '/chart', key: '3' },
  { name: 'Проверь себя', path: '/testing', key: '4' },
];

function Navbar({ active }: ComponentProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: '10px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Логотип / название для широкого экрана */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            Самые высокие здания и сооружения
          </Typography>

          {/* Свёрнутое меню (мобильное) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                /* Link оборачивает MenuItem — переходы работают и в свёрнутом меню */
                <Link
                  key={page.key}
                  to={page.path}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    selected={active === page.key}
                  >
                    <Typography sx={{ textAlign: "center" }}>{page.name}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          {/* Название для мобильного экрана */}
          <Typography
            variant="subtitle1"
            noWrap
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
              color: 'primary.main',
            }}
          >
            Самые высокие здания
          </Typography>

          {/* Кнопки меню для широкого экрана */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
            {pages.map((page) => (
              <Link key={page.key} to={page.path} style={{ textDecoration: 'none' }}>
                <Button
                  onClick={handleCloseNavMenu}
                  variant={active === page.key ? 'contained' : 'text'}
                  sx={{ my: 2, mx: 0.5, display: 'block' }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;