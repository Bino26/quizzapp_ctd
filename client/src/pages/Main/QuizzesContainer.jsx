import React, { useMemo, useEffect, useState, useCallback } from 'react';
import { Alert, Box, Container, Grid, Typography } from '@mui/material';
import QuizCard from './QuizCard';
import QuizLoadError from '../Quiz/QuizLoadError';
import Loading from '../../components/Loading';
import FilterButtonGroup from '../../components/FilterButtonGroup';
import customColors, { defaultTheme } from '../../assets/styles';

export const containerStyles = {
  minHeight: '95vh',
  backgroundColor: customColors.backgroundLight,
  maxWidth: 'none !important',
  pt: 6,
  pb: 6,
};
export const titleStyles = {
  textTransform: 'uppercase',
  mb: 2,
  textAlign: 'center',
  fontWeight: 'bold',
  [defaultTheme.breakpoints.down('md')]: {
    fontSize: '20px',
  },
};
export const boxStyles = {
  width: '100%',
  maxWidth: '1200px',
};

export const QuizzesContainer = ({
  title,
  activeFilters,
  changeFilter,
  message,
  quizzesForFiltering,
  favoritesIds,
  addToFavoritesHandler,
  removeFavoriteHandler,
  searchValue,
  loading,
  error,
  itemsPerPage = 9,
  loadMoreThreshold = 100,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [displayedQuizzes, setDisplayedQuizzes] = useState([]);

  const filteredQuizzes = useMemo(
    () =>
      quizzesForFiltering.filter(({ level, category, labels, title }) => {
        const levelFilter =
          activeFilters.levels.length === 0 ||
          activeFilters.levels.includes(level);
        const categoryFilter =
          activeFilters.categories.length === 0 ||
          activeFilters.categories.includes(category);
        const labelsFilter =
          activeFilters.labels.length === 0 ||
          activeFilters.labels.some((label) => labels.includes(label));

        const searchFilter =
          searchValue === '' ||
          title.toLowerCase().includes(searchValue.toLowerCase());

        return levelFilter && categoryFilter && labelsFilter && searchFilter;
      }),
    [quizzesForFiltering, activeFilters, searchValue]
  );

  const loadMoreQuizzes = useCallback(() => {
    if (loadingMore) return;

    setLoadingMore(true);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newQuizzes = filteredQuizzes.slice(startIndex, endIndex);

    const uniqueNewQuizzes = newQuizzes.filter(
      (newQuiz) => !displayedQuizzes.some((quiz) => quiz.id === newQuiz.id)
    );

    setDisplayedQuizzes((prevQuizzes) => [...prevQuizzes, ...uniqueNewQuizzes]);

    setCurrentPage((prevPage) => prevPage + 1);

    setLoadingMore(false);
  }, [
    loadingMore,
    currentPage,
    itemsPerPage,
    filteredQuizzes,
    displayedQuizzes,
  ]);

  useEffect(() => {
    setDisplayedQuizzes(filteredQuizzes.slice(0, itemsPerPage));
  }, [filteredQuizzes, itemsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;

      if (scrollTop + clientHeight >= scrollHeight - loadMoreThreshold) {
        loadMoreQuizzes();
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreQuizzes, loadMoreThreshold]);

  return (
    <Container sx={containerStyles}>
      {error ? (
        <QuizLoadError />
      ) : (
        <>
          <Typography variant="h5" sx={titleStyles}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={boxStyles}>
              <FilterButtonGroup changeFilter={changeFilter} />
              {loading ? (
                <Loading type="circular" />
              ) : (
                <>
                  {filteredQuizzes.length === 0 ? (
                    <Alert sx={{ mt: 3 }} severity="info">
                      {message}
                    </Alert>
                  ) : (
                    <Box sx={{ py: 3 }} maxWidth="lg" width="100%">
                      <Grid
                        container
                        spacing={4}
                        sx={{ display: 'flex', justifyContent: 'start' }}
                      >
                        {filteredQuizzes.map((q) => (
                          <QuizCard
                            key={q.id}
                            quiz={q}
                            activeFilters={activeFilters}
                            searchValue={searchValue}
                            quizProgress={q.quizProgress}
                            favoritesIds={favoritesIds}
                            addToFavoritesHandler={addToFavoritesHandler}
                            removeFavoriteHandler={removeFavoriteHandler}
                          />
                        ))}
                      </Grid>
                    </Box>
                  )}
                </>
              )}
            </Box>
          </Box>
        </>
      )}
    </Container>
  );
};
