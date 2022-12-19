import React from 'react';
import { Outlet } from 'react-router';
import { Box, Container, Stack } from '@mui/material';
import TopNavbar from './TopNavbar';
import Footer from './Footer';
import Loading from '../components/Loading';
import AlertMessage from '../components/AlertMessage';

export default function MainLayout() {
  return (
    <Box className="bg-main" minHeight="100vh">
      <Stack sx={{ minHeight: 'inherit' }}>
        <TopNavbar />
        <Box flexGrow={1}>
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
        <Footer />
      </Stack>
      <Loading />
      <AlertMessage />
    </Box>
  );
}