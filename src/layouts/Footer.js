import { useTheme } from '@emotion/react';
import { Box, Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  const theme = useTheme();

  return (
    <Box bgcolor={theme.palette.primary.main} py={3}>
      <Typography
        color="white"
        fontSize={16}
        textAlign="center"
      >Copyright Genodecide 2022</Typography>
    </Box>
  );
}