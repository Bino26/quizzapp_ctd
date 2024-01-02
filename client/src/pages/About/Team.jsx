import { Avatar, Box, Grid, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import customColors, { defaultTheme } from '../../assets/styles';
import React from 'react';

const teamRoles = {
  BACKEND_TEAM: 'backend team',
  FRONTEND_TEAM: 'frontend team',
  MENTOR: 'mentor',
};
const { BACKEND_TEAM, FRONTEND_TEAM, MENTOR } = teamRoles;
const projectTeam = [
  {
    id: '1',
    name: 'Elijah Bernstein-Cooper',
    imageURL:
      'https://ca.slack-edge.com/T07EHJ738-U035T6TPUN5-3b6a6908be4b-512',
    role: MENTOR,
    gitHub: 'https://github.com/ezbc',
    description:
      'Elijah has volunteered with Code the Dream for two years and loves it! His background is in data engineering, NoSQL tools, and web application development. He works at an ed-tech company, MetaMetrics, where he works with a great team to build web apps and APIs for teachers and education partners.',
  },
  {
    id: '2',
    name: 'Sergey Sherstobitov',
    imageURL: 'https://avatars.githubusercontent.com/u/3116876?v=4',
    role: MENTOR,
    gitHub: 'https://github.com/in43sh',
    description:
      'Full-stack web-developer with hands-on experience in building responsive and fast websites. He is also a continuous learner, always looking for effective ways to overcome a challenge. In addition, he is passionate about improving user’s interaction with a website.',
  },
  {
    id: '3',
    name: 'Katsiaryna Lashcheuskaya',
    imageURL: 'https://avatars.githubusercontent.com/u/111474106?v=4',
    role: FRONTEND_TEAM,
    gitHub: 'https://github.com/katsiarynalashcheuskaya',
    description:
      'As a junior developer, her goal is to continue growing, collaborating, and making impactful contributions to the world of web development. ' +
      'Her strengths include strong analytical skills and a sense of responsibility. ',
  },
  {
    id: '4',
    name: 'David Greenslade',
    imageURL:
      'https://static1.squarespace.com/static/59b0473fa9db0934a50d87d5/t/5a80b1a3e4966bd4a4338071/1518383524092/David1.jpg',
    role: FRONTEND_TEAM,
    gitHub: 'https://github.com/DavidGslade86',
    description:
      'David hails from the great state of North Carolina, where the tea is sweet, and the people are sweeter. After receiving his degree in Biology, David was awarded a fellowship through Princeton to teach English and study Mandarin at the Dalian University of Technology in Dong Bei, China. After nearly 20 years in the education sector David is excited to bring his drive, humor, and humanity to the world or programming and web development.',
  },
  {
    id: '5',
    name: 'Eva Weisneck',
    imageURL:
      'https://avatars.githubusercontent.com/u/106546645?s=400&u=b196d06a5d415e18b439b89a9303c92f64cedea8&v=4',
    role: FRONTEND_TEAM,
    gitHub: 'https://github.com/evaw277',
    description:
      'Eva is an aspiring software developer with a love for learning new things and embracing challenges. With excitement, curiosity, and commitment, she continues learning on her coding journey for her personal and professional growth.',
  },
  {
    id: '6',
    name: 'Alina Matskevich',
    imageURL:
      'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png',
    role: BACKEND_TEAM,
    gitHub: 'https://github.com/npnote8',
    description:
      'She believes strongly in the power of programming\n' +
      'and was looking to build the app that is beneficial for others.\n' +
      'Besides   coding,   Alina   enjoys   listening   to   music,   gardening,\n' +
      'and reading books',
  },
  {
    id: '7',
    name: 'Bangah M’Bayi Yann',
    imageURL: 'https://avatars.githubusercontent.com/u/81714858?v=4',
    role: BACKEND_TEAM,
    gitHub: 'https://github.com/Bino26',
    description:
      'He   is passionate about coding and enjoys being challenged.    Bino\n' +
      'is a fast learner and a creative problem-solver - all things that\n' +
      'make   him   an   excellent   software   developer. ',
  },
];

const Team = () => {
  return (
    <>
      {projectTeam.map((member) => (
        <Grid item key={member.id} xs={12} sm={12} md={5} container>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              mt: 4,
              alignItems: 'center',
              p: 3,
              [defaultTheme.breakpoints.down('sm')]: {
                p: 1,
                pb: 3,
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 1,
              }}
            >
              <Avatar
                target="_blank"
                component={Link}
                to={member.gitHub}
                alt={member.name}
                src={member.imageURL}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 1,
                  [defaultTheme.breakpoints.down('sm')]: {
                    width: 90,
                    height: 90,
                  },
                }}
              />
              <Typography
                variant={'body1'}
                target="_blank"
                component={Link}
                to={member.gitHub}
                sx={{
                  textDecoration: 'none',
                  color: customColors.blackMedium,
                  fontWeight: 'bold',
                }}
              >
                {member.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  color: customColors.greyMedium,
                }}
              >
                {member.role}
              </Typography>
            </Box>
            <Typography
              variant={'body1'}
              sx={{ margin: '0 20px', textAlign: 'justify', textIndent: '2em' }}
            >
              {member.description}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </>
  );
};

export default Team;
