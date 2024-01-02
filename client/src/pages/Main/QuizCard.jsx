import React, { useEffect, useState } from 'react';
import useQuiz from '../../quiz/useQuiz';
import useAuth from '../../auth/useAuth';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Labels from '../../components/Labels';
import CustomizedSnackbars from 'components/Snackbar';
import Progress from '../../components/Progress';
import customColors from '../../assets/styles';
import { deleteAttemptsForUserAndQuiz } from '../../functions/exportFunctions';
import { QUIZ } from 'App';

const QuizCard = ({
  quiz,
  activeFilters,
  quizProgress,
  favoritesIds,
  addToFavoritesHandler,
  removeFavoriteHandler,
  searchValue,
}) => {
  const { bestScore, attemptsCount } = quizProgress;
  const isFilterActive = (filterType, value) =>
    activeFilters[filterType].length > 0 &&
    activeFilters[filterType].includes(value);

  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [cardClickable, setCardClickable] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { setQuizzes } = useQuiz();
  const { auth } = useAuth();
  const [snackbar, setSnackbar] = useState({
    isOpened: false,
    severity: '',
    message: '',
  });

  useEffect(() => {
    favoritesIds && setIsFavorite(favoritesIds.includes(quiz.id));
  }, [favoritesIds, quiz.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setCardClickable(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCardClickable(true);
  };

  const highlightSearchTerm = (title, searchValue) => {
    if (!searchValue) {
      return [<span key="title">{title}</span>];
    }

    const regex = new RegExp(`(${searchValue})`, 'gi');
    const parts = title.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          style={{
            fontWeight: 'bold',
            backgroundColor: `rgb(173, 216, 230, 0.5)`,
          }}
        >
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleAddFavorite = (quizId) => {
    addToFavoritesHandler(quizId);
    setIsFavorite(true);
    handleClose();
  };

  const handleRemoveFavorite = (quizId) => {
    removeFavoriteHandler(quizId);
    setIsFavorite(false);
  };

  const handleResetProgress = async (quiz, auth, setQuizzes) => {
    try {
      await deleteAttemptsForUserAndQuiz(quiz, auth, setQuizzes);
      setSnackbar({
        isOpened: true,
        severity: 'success',
        message: 'Your progress was successfully reset',
      });
      handleClose();
    } catch (error) {
      setSnackbar({
        isOpened: true,
        severity: 'error',
        message: 'Failed to update progress information. ' + error.message,
      });
      handleClose();
    }
  };

  return (
    <Grid item key={quiz.id} xs={12} sm={6} md={4}>
      <CustomizedSnackbars
        open={snackbar.isOpened}
        severity={snackbar.severity}
        variant="filled"
        onClose={() =>
          setSnackbar((prevSnackbar) => ({
            ...prevSnackbar,
            isOpened: false,
          }))
        }
        dismissible
        message={snackbar.message}
      ></CustomizedSnackbars>
      <Card
        elevation={1}
        onClick={(event) => {
          // Only navigate when clicking on the non-interactive parts of the card
          if (!event.target.closest('.menu-icon') && cardClickable) {
            window.location.href = `${QUIZ}/${quiz.id}`;
          }
        }}
        sx={{
          height: '100%',
          display: 'flex',
          padding: '20px 30px',
          minWidth: '270px',
          position: 'relative',
          transition: 'transform 0.2s',
          cursor: 'pointer',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <CardContent
            sx={{
              display: 'flex',
              padding: '0 !important',
              justifyContent: 'space-between',
              '& > div': {
                flex: '1 1 0',
              },
              height: '100%',
              width: '100%',
            }}
          >
            {/* this is the content of the left side inside each card */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: '9px',
                  marginRight: '10px',
                }}
              >
                <Labels
                  labels={quiz.labels}
                  isFilterActive={isFilterActive}
                ></Labels>
                <Chip
                  sx={{
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: isFilterActive('levels', quiz.level)
                      ? customColors.blueMedium
                      : customColors.grey,
                    color: isFilterActive('levels', quiz.level)
                      ? customColors.grey
                      : customColors.blueMedium,
                  }}
                  size={isSmallScreen ? 'medium' : 'small'}
                  label={quiz.level}
                />
                <Chip
                  sx={{
                    borderRadius: '4px',
                    fontWeight: 'bold',
                    backgroundColor: isFilterActive('categories', quiz.category)
                      ? customColors.blueMedium
                      : customColors.grey,
                    color: isFilterActive('categories', quiz.category)
                      ? customColors.grey
                      : customColors.blueMedium,
                  }}
                  size={isSmallScreen ? 'medium' : 'small'}
                  label={quiz.category}
                />
              </Box>
              <Box>
                <Typography
                  sx={{
                    marginTop: '10px',
                    color: customColors.greyDark,
                  }}
                >
                  {bestScore ? `Score: ${bestScore}%` : ''}
                </Typography>
                <Typography
                  sx={{
                    color: customColors.greyDark,
                  }}
                >
                  {bestScore === 100
                    ? 'Passed'
                    : attemptsCount
                      ? `Attempts: ${attemptsCount}`
                      : 'Not Passed'}
                </Typography>
              </Box>
            </Box>
            {/* this is the content of the right side inside each card */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Box
                marginTop="25px"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CardMedia
                  width="100%"
                  component="div"
                  sx={{
                    width: '54px',
                    height: '60px',
                  }}
                  image={quiz.image}
                />
                <Progress progress={bestScore} />
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant={'h6'}
                  component="h2"
                  marginTop="40px"
                  fontWeight="bold"
                  lineHeight="22px"
                >
                  {highlightSearchTerm(quiz.title, searchValue)}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ position: 'absolute', right: 3, top: 3 }}>
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                className="menu-icon"
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    if (isFavorite) {
                      handleRemoveFavorite(quiz.id);
                    } else {
                      handleAddFavorite(quiz.id);
                    }
                    handleClose();
                  }}
                >
                  {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </MenuItem>
                <MenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    handleResetProgress(quiz, auth, setQuizzes);
                  }}
                >
                  Reset progress
                </MenuItem>
              </Menu>
            </Box>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};

export default QuizCard;
