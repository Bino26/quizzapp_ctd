import React from 'react';
import { Box, Container, Link, Paper, Typography } from '@mui/material';
import customColors, { defaultTheme } from '../../assets/styles';
import Team from './Team';

const paragraphStyle = {
  textAlign: 'justify',
  textIndent: '2em',
  mb: 2,
};

const About = () => {
  return (
    <>
      {/* Title section*/}
      <Container
        sx={{
          backgroundColor: customColors.backgroundLight,
          maxWidth: 'none !important',
          padding: '50px 0',
        }}
      >
        <Typography
          variant={'h5'}
          sx={{
            textTransform: 'uppercase',
            textAlign: 'center',
            fontWeight: 'bold',
            [defaultTheme.breakpoints.down('md')]: {
              fontSize: '20px',
            },
          }}
        >
          About us
        </Typography>
      </Container>
      {/* Content section */}
      <Box
        sx={{
          backgroundColor: customColors.backgroundLight,
          maxWidth: 'none !important',
          padding: '0 0 120px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            justifyContent: 'start',
            textAlign: 'justify',
            maxWidth: '1200px',
            width: '80%',
          }}
        >
          <Typography variant={'body1'} sx={paragraphStyle}>
            Nowadays, getting hired as a junior developer is quite a tedious
            task.
          </Typography>
          <Typography variant={'body1'} sx={paragraphStyle}>
            According to
            <b> Hired.com</b> annual{' '}
            <Link
              target="_blank"
              href={'https://hired.com/state-of-software-engineers/2023/'}
            >
              report
            </Link>
            , in 2023 demand for Junior Developers has dropped in half compared
            to the previous year.
          </Typography>
          <Typography variant={'body1'} sx={paragraphStyle}>
            Additionally, 91% of employers prefer their candidates to have work
            experience (<i>NACE Job Outlook 2017</i>) and, on average, each job
            offer for junior developer position attracts 150+ resumes (
            <i>Alphident Technologies data, 2023</i>).
          </Typography>
          <Typography variant={'body1'} sx={paragraphStyle}>
            All these factors contribute to the need for juniors to demonstrate
            the outstanding knowledge to a potential employer.
          </Typography>
        </Box>
      </Box>

      {/* About app section*/}
      <Box
        sx={{
          backgroundColor: customColors.greyLight,
          padding: '50px 0 30px 0',
          [defaultTheme.breakpoints.down('sm')]: {
            paddingTop: '50px',
          },
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            maxWidth: '1200px',
            width: '80%',
            backgroundColor: customColors.blackLight,
            marginTop: '-135px',
          }}
        >
          <Box
            sx={{
              pl: 15,
              pt: 5,
              pb: 5,
              pr: 15,
              [defaultTheme.breakpoints.down('md')]: {
                p: 3,
              },
            }}
          >
            <Typography
              varian={'body1'}
              sx={{
                color: customColors.white,
                textAlign: 'justify',
                textIndent: '2em',
              }}
            >
              <span style={{ color: customColors.blueMedium }}>
                <b>JS</b>
              </span>
              <b>QUIZ App</b> was designed to help juniors demonstrate their
              exceptional level of knowledge. We spent a lot of time and effort
              to develop structured and engaging way to test knowledge in
              JavaScript. The JSQuiz App tracks the progress with real-time
              updates, identifies knowledge gaps and allows user to take notes
              while they progress through a quiz, ultimately helping them to
              land their dream job in IT.
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/*team section*/}
      <Box
        sx={{
          backgroundColor: customColors.greyLight,
          maxWidth: 'none !important',
          padding: '50px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            width: '80%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            mb: 2,
          }}
        >
          <Typography
            variant={'h5'}
            sx={{
              mb: 3,
              [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '28px',
              },
            }}
          >
            Meet our team
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}
          >
            <Team />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default About;
