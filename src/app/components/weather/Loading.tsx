import { Box, CircularProgress } from '@mui/material';
import React from 'react';

export default function Loading() {
  return (
    <Box>
      <CircularProgress />
      <br />
      <Box component="span" sx={{ color: "blue", fontWeight: "bold" }}>
        Загрузка данных...
      </Box>
    </Box>
  );
}
