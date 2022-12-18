import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function Home() {
  const [keyword, setKeyword] = useState('');

  const search = () => {
    let options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/qu/quote/asset-profile',
      params: { symbol: 'AAPL' },
      headers: {
        'X-RapidAPI-Key': '475a2f1601msh05846fe1e82ec86p14029ejsncbeaed1cc96c',
        'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
      }
    };

    axios.request(options)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Box py={2}>
      <Typography component="h1" fontSize={28} fontWeight={700} textAlign="center">
        Welcome to Genodecide
      </Typography>
      <Typography textAlign="center" mt={3}>
        Welcome to Genodecide, the ultimate tool for venture capitalist. Our comprehensive analytics and data provide you with the information you need to make informed decisions about your investments.<br />
        Our risk assesment tool helps you identify potential risks associated with investments. We provide you with the information you meed to make informed investments
      </Typography>

      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={6}>
        <TextField
          name="search"
          placeholder="Enter stock ticker"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="contained" onClick={() => search()}>Search</Button>
      </Stack>
    </Box>
  );
}