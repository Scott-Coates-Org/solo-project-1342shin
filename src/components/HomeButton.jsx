import * as React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";

export function HomeButon() {
  return (
    <Button variant="outlined" component={Link} to="/" startIcon={<HomeIcon />}>
    Home
    </Button>
  );
}

