import React, { useEffect, useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import jsQuizLogo from '../../assets/images/logo.svg';
import s from './Home.module.css';
import c from '../../App.module.css';
import customColors, { defaultTheme } from '../../assets/styles';
import { NOTES, QUIZZES } from '../../App';
import { Link } from 'react-router-dom';
import ContactForm from './ContactForm';
import HighlightsSection from './Highlights';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function Home({ highlights, setSnackbar }) {
  const [scrollToTopVisible, setScrollToTopVisible] = useState(false);
  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setScrollToTopVisible(scrollTop > 200);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Add a "Scroll to Top" button */}
      {scrollToTopVisible && (
        <Button
          onClick={scrollToTop}
          variant="contained"
          sx={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '1000',
            backgroundColor: customColors.backgroundLight,
            '&:hover': {
              backgroundColor: 'primary',
              '& svg': {
                color: customColors.white, // Change to your preferred hover color for the icon
              },
            },
          }}
        >
          <KeyboardArrowUpIcon
            sx={{
              fontSize: 32,
              color: customColors.greyMedium,
            }}
          />
        </Button>
      )}
      {/*Home section*/}
      <Box className={s.homeBackground}>
        <img alt="JSQuiz logo" className={s.logoImage} src={jsQuizLogo} />
        {
          <Button
            component={Link}
            to={QUIZZES}
            size={'large'}
            variant="outlined"
            sx={[
              {
                '&:hover': {
                  backgroundColor: '#3f3f3f',
                  border: `3px solid ${customColors.greyLight}`,
                  fontWeight: 'bold',
                },
              },
              {
                mt: 3,
                mb: 2,
                color: customColors.greyLight,
                border: `3px solid ${customColors.greyLight}`,
                width: '200px',
                fontWeight: 'bold',
              },
            ]}
          >
            Start here
          </Button>
        }
      </Box>
      {/*Highlights section*/}
      <Box
        sx={{
          backgroundColor: customColors.greyLight,
          padding: '50px 0',
          [defaultTheme.breakpoints.down('sm')]: {
            paddingBottom: '10px',
          },
        }}
      >
        <Paper
          className={c.container}
          elevation={3}
          sx={{
            [defaultTheme.breakpoints.down('sm')]: {
              marginTop: '-135px',
            },
            marginTop: '-155px',
            position: 'relative',
          }}
        >
          <HighlightsSection highlights={highlights} />
        </Paper>
      </Box>
      {/*Welcome section*/}
      <Box
        sx={{
          backgroundColor: customColors.greyLight,
          padding: '50px 0',
          textAlign: 'center',
        }}
      >
        <Box className={c.container}>
          <Typography
            variant={'h4'}
            sx={{
              fontWeight: 'bold',
              fontSize: '28px',
              [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '24px',
              },
            }}
          >
            Welcome to our educational platform!
          </Typography>
        </Box>
      </Box>
      {/*Quizzes section*/}
      <Box
        sx={{
          backgroundColor: customColors.backgroundLight,
        }}
      >
        <Box className={c.container}>
          <Box className={s.quizContainer}>
            <Box
              sx={{
                width: '70%',
                mt: 8,
                mb: 8,
                [defaultTheme.breakpoints.down('md')]: {
                  width: '100%',
                  mt: 6,
                  mb: 5,
                },
              }}
            >
              <Typography
                variant={'h6'}
                sx={{
                  fontWeight: 'bold',
                  textAlign: 'justify',
                  textIndent: '2em',
                  textTransform: 'uppercase',
                  mb: 3,
                  [defaultTheme.breakpoints.down('sm')]: {
                    textAlign: 'justify',
                    fontSize: '18px',
                  },
                }}
              >
                Test your knowledge with our interactive quizzes
              </Typography>
              <Box>
                <Box>
                  <Typography
                    variant={'body1'}
                    sx={{
                      textAlign: 'justify',
                      textIndent: '2em',
                      [defaultTheme.breakpoints.down('sm')]: {
                        fontSize: '14px',
                      },
                    }}
                  >
                    Whether you're a novice or an experienced developer, our
                    quizzes are designed to challenge and expand your
                    understanding of javascript. Sharpen your coding skills,
                    solidify your knowledge, and embark on a learning journey
                    that's both enjoyable and educational.{' '}
                  </Typography>
                  <Button
                    href={QUIZZES}
                    variant="contained"
                    sx={{
                      backgroundColor: customColors.blackLight,
                      mt: 3,
                      mb: 2,
                      '&:hover': {
                        backgroundColor: '#3f3f3f',
                      },
                    }}
                  >
                    Take a quiz
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box
              className={s.quizSectionImage}
              sx={{
                marginLeft: '50px',
                [defaultTheme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            ></Box>
          </Box>
        </Box>
      </Box>
      <Box
        className={s.quizSectionImage}
        sx={{
          height: '300px',
          [defaultTheme.breakpoints.up('md')]: {
            display: 'none',
          },
        }}
      ></Box>
      {/*Quote section*/}
      <Box
        sx={{
          backgroundColor: customColors.greyLight,
          padding: '100px 0',
          [defaultTheme.breakpoints.down('sm')]: {
            padding: '50px 0',
          },
        }}
      >
        <Box className={c.container} sx={{ flexDirection: 'column' }}>
          <Typography variant={'h6'} textAlign="center">
            “The only way to do great work is to love what you do.”
          </Typography>
          <Box>
            <Typography
              sx={{
                mt: 1,
                fontSize: '14px',
                textTransform: 'uppercase',
                color: customColors.greyMedium,
              }}
            >
              Steve Jobs
            </Typography>
          </Box>
        </Box>
      </Box>
      {/*Notes section*/}
      <Box
        sx={{
          backgroundColor: customColors.backgroundLight,
        }}
      >
        <Box className={c.container}>
          <Box className={s.quizContainer}>
            <Box
              className={s.notesSectionImage}
              sx={{
                marginRight: '50px',
                [defaultTheme.breakpoints.down('md')]: {
                  display: 'none',
                },
              }}
            ></Box>
            <Box
              sx={{
                width: '70%',
                mt: 8,
                mb: 8,
                [defaultTheme.breakpoints.down('md')]: {
                  width: '100%',
                  mt: 6,
                  mb: 5,
                },
              }}
            >
              <Typography
                variant={'h6'}
                sx={{
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  mb: 3,
                  textAlign: 'justify',
                  textIndent: '2em',
                  [defaultTheme.breakpoints.down('sm')]: {
                    textAlign: 'justify',
                    fontSize: '18px',
                  },
                }}
              >
                Take notes while you progress through a quiz
              </Typography>
              <Box>
                <Box>
                  <Typography
                    variant={'body1'}
                    sx={{
                      textAlign: 'justify',
                      textIndent: '2em',
                      [defaultTheme.breakpoints.down('sm')]: {
                        fontSize: '14px',
                      },
                    }}
                  >
                    To encourage active learning, the educational platform
                    offers programmers an easy and effective way to take notes.
                    Intuitive interface and a blend of simplicity and
                    functionality makes creating notes fast and effortless.
                  </Typography>
                  <Button
                    href={NOTES}
                    variant="contained"
                    sx={{
                      backgroundColor: customColors.blackLight,
                      mt: 3,
                      mb: 2,
                      '&:hover': {
                        backgroundColor: '#3f3f3f',
                      },
                    }}
                  >
                    Explore notes
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        className={s.notesSectionImage}
        sx={{
          height: '300px',
          [defaultTheme.breakpoints.up('md')]: {
            display: 'none',
          },
        }}
      ></Box>
      {/*CTD section*/}
      <Box
        sx={{
          backgroundColor: customColors.backgroundLight,
          paddingTop: '100px',
          paddingBottom: '30px',
          [defaultTheme.breakpoints.down('sm')]: {
            paddingTop: '50px',
          },
        }}
      >
        <Paper
          className={c.container}
          elevation={3}
          sx={{
            backgroundColor: customColors.blackLight,
            position: 'relative',
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
            <Box>
              <Typography
                variant={'h6'}
                sx={{
                  color: 'white',
                  textTransform: 'uppercase',
                  textAlign: 'justify',
                  mb: 2,
                  [defaultTheme.breakpoints.down('sm')]: {
                    fontSize: '18px',
                  },
                }}
              >
                <span style={{ color: customColors.blueMedium }}>JS</span>
                Quiz platform is made possible with the support of
                <span style={{ color: customColors.orangeDark }}>
                  {' '}
                  Code The Dream{' '}
                </span>
                institution.
              </Typography>
            </Box>
            <Typography
              varian={'body2'}
              sx={{
                color: customColors.white,
                textAlign: 'justify',
                [defaultTheme.breakpoints.down('sm')]: {
                  fontSize: '14px',
                },
              }}
            >
              Code the Dream offers free intensive training in software
              development. The ultimate aim of Code the Dream is to create a
              unique win-win, where coders gain real experience building apps
              that make the world a little better place, and then use that
              experience to launch new careers with enormous opportunity for
              themselves, their families, and their communities.
            </Typography>
            <Button
              variant="contained"
              component={Link}
              target="_blank"
              to={'https://codethedream.org/'}
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Learn more
            </Button>
          </Box>
        </Paper>
      </Box>
      {/*Donation section*/}
      <Box
        sx={{
          backgroundColor: customColors.backgroundLight,
          paddingBottom: '100px',
          textAlign: 'center',
          [defaultTheme.breakpoints.down('sm')]: {
            paddingBottom: '50px',
          },
        }}
      >
        <Box className={c.container}>
          <Typography
            variant={'body1'}
            sx={{
              [defaultTheme.breakpoints.down('sm')]: {
                fontSize: '14px',
              },
            }}
          >
            Help make dreams a reality. Your donation can empower more projects
            like this, making a positive impact in the world of tech education.
            Join Code the dream in supporting the next generation of developers
            and innovators. Every contribution counts.
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            target="_blank"
            size={'large'}
            to={'https://codethedream.org/donate/'}
            sx={[
              {
                '&:hover': {
                  border: '3px dashed',
                  fontWeight: 'bold',
                },
              },
              {
                mt: 3,
                mb: 2,
                border: '3px dashed',
              },
            ]}
          >
            Donate today
          </Button>
        </Box>
      </Box>
      {/*Contact section*/}
      <Box
        sx={{
          backgroundColor: customColors.greyLight,
          padding: '100px 50px',
          [defaultTheme.breakpoints.down('sm')]: {
            padding: '50px 0',
          },
        }}
      >
        <ContactForm setSnackbar={setSnackbar} />
      </Box>
    </>
  );
}
