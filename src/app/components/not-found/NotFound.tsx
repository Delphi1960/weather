import { Box, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Box p={2}>
      <Typography variant="h4">404 Такой странички не найдено</Typography>
      <Link to="/">На главную</Link>
    </Box>
  );
}
