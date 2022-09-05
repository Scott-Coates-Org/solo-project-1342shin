import * as React from 'react';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";

export function HomeButon() {
  return (
    <Button variant="outlined" component={Link} to="/" startIcon={<HomeIcon />}>
    Home
    </Button>
  );
}

