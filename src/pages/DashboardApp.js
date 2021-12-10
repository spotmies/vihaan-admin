// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { useState,useEffect } from 'react';
import { useStores } from '../state_management/store';
import TodayRevenue from '../components/_dashboard/app/today_revenue';
import palette from "../theme/palette";
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const {UserStore, ProductStore} = useStores();
  
  useEffect(() => {
    if(UserStore.listUser.length<1) UserStore.fetchUserFromDB()
   }, [])

   useEffect(() => {
    if(ProductStore.listProducts.length<1) ProductStore.fetchProductFromDB()
   }, [])

  console.log(`"welcome here"`);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome vihaan</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales tagName="weekly sales" count="70" counts={[12,10,11]}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AppNewUsers /> */}
            <AppWeeklySales tagName="active user" count="5" counts={[2,0,11]}/>

          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            {/* <AppItemOrders /> */}
            <AppWeeklySales tagName="item order" count="70" counts={[12,10,11]} bc={palette.primary.lighter}/>

          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <TodayRevenue />
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
