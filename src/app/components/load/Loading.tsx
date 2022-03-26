import { Box, CircularProgress, Grid } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Box sx={{ mt: 20 }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* <LinearProgress /> */}
        <CircularProgress />
        <br />
        <Box
          component="span"
          sx={{
            color: "blue",
            fontWeight: "bold",
            textAlign: "center",
            width: "auto",
          }}
        >
          Загрузка данных...
        </Box>
      </Grid>
    </Box>
  );
}
