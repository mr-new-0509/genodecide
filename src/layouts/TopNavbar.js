import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { TextButton } from '../components/styledComponents';
import { Icon } from '@iconify/react';
import { useTheme } from '@emotion/react';

const ROUTES = [
  {
    name: 'Home',
    path: '/home'
  },
  {
    name: 'About',
    path: '/about'
  },
  {
    name: 'Portfolio',
    path: '/portfolio'
  },
  {
    name: 'Contact',
    path: '/contact'
  }
];

export default function TopNavbar() {
  const theme = useTheme();
  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar>
          {/* For Mobile */}
          <IconButton
            size="large"
            sx={{ color: '#FFFFFF', ml: { xs: 2, md: 0 }, display: { xs: 'flex', md: 'none' } }}
            onClick={() => setDrawerOpened(true)}
          >
            <Icon icon="material-symbols:menu-rounded" />
          </IconButton>

          {/* For Mobile */}
          <Drawer
            anchor="right"
            open={drawerOpened}
            onClose={() => setDrawerOpened(false)}
          >
            <Box my={3}>
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Button component={RouterLink} to="/">
                  <Typography
                    component="h1"
                    color={theme.palette.primary.main}
                    textTransform="capitalize"
                    fontSize={20}
                    fontWeight={600}
                  >GenoDecide</Typography>
                </Button>
              </Stack>
              <List sx={{ mt: 2 }} onClick={() => setDrawerOpened(false)}>
                {
                  ROUTES.map(route => (
                    <ListItem key={route.path}>
                      <ListItemButton component={RouterLink} to={route.path}>
                        {route.name}
                      </ListItemButton>
                    </ListItem>
                  ))
                }
              </List>
            </Box>
          </Drawer>

          {/* Logo for drawer */}
          <Button component={RouterLink} to="/" sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography
              component="h1"
              color="white"
              textTransform="capitalize"
              fontSize={28}
              fontWeight={700}
            >GenoDecide</Typography>
          </Button>

          <Box flexGrow={1}>
            <Stack direction="row" justifyContent="center">
              {/* Logo for desktop */}
              <Button component={RouterLink} to="/" sx={{ display: { xs: 'flex', md: 'none' } }}>
                <Typography
                  component="h1"
                  color="white"
                  textTransform="capitalize"
                  fontSize={28}
                  fontWeight={700}
                >GenoDecide</Typography>
              </Button>
            </Stack>
          </Box>
          {
            ROUTES.map(route => (
              <TextButton
                key={route.path}
                sx={{ mr: 2, fontWeight: 600, color: 'white', display: { xs: 'none', md: 'flex' } }}
                component={RouterLink}
                to={route.path}
              >
                {route.name}
              </TextButton>
            ))
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}