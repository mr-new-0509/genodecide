import React, { useContext, useState } from 'react';
import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { LoadingContext } from '../../contexts/LoadingContext';

export default function Home() {
  const { openLoading, closeLoading } = useContext(LoadingContext);

  const [keyword, setKeyword] = useState('');
  // const [locationInfo, setLocationInfo] = useState(null);
  // const [metadata, setMetadata] = useState(null);
  // const [companyMembers, setCompanyMembers] = useState(null);
  // const [otherInfo, setOtherInfo] = useState(null);
  const [companyOfficers, setCompanyOfficers] = useState([]);
  const [otherData, setOtherData] = useState(null);

  const search = () => {
    let options = {
      method: 'GET',
      url: 'https://mboum-finance.p.rapidapi.com/qu/quote/asset-profile',
      params: { symbol: keyword },
      headers: {
        'X-RapidAPI-Key': '475a2f1601msh05846fe1e82ec86p14029ejsncbeaed1cc96c',
        'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com'
      }
    };

    openLoading();
    axios.request(options)
      .then(res => {
        let { assetProfile } = res.data;

        setCompanyOfficers(assetProfile.companyOfficers);
        delete assetProfile.companyOfficers;

        setOtherData({ ...assetProfile });
        console.log();
        closeLoading();
      })
      .catch(error => {
        console.error(error);
        closeLoading();
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

      <Stack spacing={2} mt={5}>
        {/* Information */}
        <Card>
          <CardHeader
            title="Information"
          />
          {
            otherData && (
              <CardContent>
                <Stack spacing={1}>
                  {
                    Object.keys(otherData).map(key => (
                      <Box key={key}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} md={3}>{key}:</Grid>
                          <Grid item xs={12} md={9}>{otherData[key]}</Grid>
                        </Grid>
                      </Box>
                    ))
                  }
                </Stack>
              </CardContent>
            )
          }
        </Card>

        {/* Officers */}
        <Card>
          <CardHeader
            title="Officers"
          />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Id</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Max Age</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Age</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Year Born</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Fiscal Year</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Total Pay</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Exercised Value</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Unexercised Value</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {
                  companyOfficers.map((officer, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{officer?.maxAge}</TableCell>
                      <TableCell>{officer?.name}</TableCell>
                      <TableCell>{officer?.age}</TableCell>
                      <TableCell>{officer?.title}</TableCell>
                      <TableCell>{officer?.yearBorn}</TableCell>
                      <TableCell>{officer?.fiscalYear}</TableCell>
                      <TableCell>{officer?.totalPay?.longFmt}</TableCell>
                      <TableCell>{officer?.exercisedValue?.longFmt}</TableCell>
                      <TableCell>{officer?.unexercisedValue?.longFmt}</TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}