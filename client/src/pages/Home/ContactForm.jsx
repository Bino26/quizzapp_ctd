import React from 'react';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import c from '../../App.module.css';
import customColors, { defaultTheme } from '../../assets/styles';
import emailjs from 'emailjs-com';
import { severities } from '../../App';

export default function ContactForm({ setSnackbar }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm('js_quiz', 'contact_form_jsquiz', e.target, 'cCsGOz-hDdPkNz6dF')
      .then(() => {
        setSnackbar({
          isOpened: true,
          severity: severities.SUCCESS,
          message: 'Message successfully sent!',
        });
        e.target.reset();
      })
      .catch((err) => {
        setSnackbar({
          isOpened: true,
          severity: severities.ERROR,
          message: 'An error has occurred!',
        });
        throw new Error(`Error during sending email:', ${err}`);
      });
  };

  return (
    <Box className={c.container}>
      <Box
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '100%',
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            [defaultTheme.breakpoints.down('sm')]: {
              fontSize: '28px',
            },
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant={'body2'}
          align="center"
          mb={2}
          sx={{
            fontSize: '14px',
            textTransform: 'uppercase',
            color: customColors.greyMedium,
          }}
        >
          We are here to help you
        </Typography>
        <form id="contact_form" onSubmit={handleSubmit}>
          <Grid container sx={{ justifyContent: 'center' }}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                margin="normal"
                autoComplete="name"
                required
                type="text"
              />
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                margin="normal"
                autoComplete="email"
                required
                type="email"
              />
              <TextField
                fullWidth
                id="message"
                name="message"
                label="Message"
                margin="normal"
                required
                multiline
                rows={4}
                type="text"
              />
              <Button
                type="submit"
                variant="contained"
                target="_blank"
                sx={{
                  mt: 1,
                  width: '200px',
                }}
              >
                Get in touch
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  );
}
