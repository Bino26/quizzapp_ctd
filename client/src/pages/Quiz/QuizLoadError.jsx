import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HOME } from '../../App';

export default function QuizLoadError() {
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        minHeight: '88vh',
        pt: 6,
        pb: 2,
      }}
    >
      <Typography variant="h5">
        Error loading quizzes. Please try again later.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => window.location.reload()}
        sx={{ margin: 1 }}
      >
        Reload Page
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate(HOME)}
        sx={{ margin: 1 }}
      >
        Go Home
      </Button>
    </Container>
  );
}
