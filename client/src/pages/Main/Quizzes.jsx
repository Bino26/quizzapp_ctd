import useAuth from '../../auth/useAuth';
import useQuiz from '../../quiz/useQuiz';
import React, { useCallback, useMemo, useState } from 'react';
import {
  addFavorite,
  removeFavorite,
  useFetchQuizzes,
} from '../../functions/exportFunctions';
import { LOGIN, severities } from '../../App';
import { QuizzesContainer } from './QuizzesContainer';

export const Quizzes = ({
  changeFilter,
  activeFilters,
  searchValue,
  setSnackbar,
}) => {
  const { auth } = useAuth();
  const { quizzes, setQuizzes } = useQuiz();
  const [favoritesIds, setFavoritesIds] = useState([]);
  const { loading, error } = useFetchQuizzes(
    auth,
    quizzes,
    setQuizzes,
    setFavoritesIds,
    LOGIN
  );

  const addToFavoritesHandler = useCallback(
    async (quizId) => {
      try {
        await addFavorite(quizId);
        setFavoritesIds((prevFavoritesIds) => [...prevFavoritesIds, quizId]);
        setSnackbar({
          isOpened: true,
          severity: severities.SUCCESS,
          message: 'Quiz added to favorites.',
        });
      } catch (error) {
        setSnackbar({
          isOpened: true,
          severity: severities.ERROR,
          message: 'An error occurred when adding a quiz to favorites.',
        });
        throw error;
      }
    },
    [setFavoritesIds, setSnackbar]
  );

  const removeFavoriteHandler = useCallback(
    async (quizId) => {
      try {
        await removeFavorite(quizId);
        setFavoritesIds((prevFavoriteQuizzesIds) =>
          prevFavoriteQuizzesIds.filter((favorite) => favorite !== quizId)
        );
        setSnackbar({
          isOpened: true,
          severity: severities.SUCCESS,
          message: 'Quiz removed from favorites.',
        });
      } catch (error) {
        setSnackbar({
          isOpened: true,
          severity: severities.ERROR,
          message: 'An error occurred when removing a quiz from favorites.',
        });
        throw error;
      }
    },
    [setFavoritesIds, setSnackbar]
  );

  return useMemo(
    () => (
      <QuizzesContainer
        title="Choose a quiz"
        activeFilters={activeFilters}
        changeFilter={changeFilter}
        message="No quizzes were found."
        quizzesForFiltering={quizzes}
        favoritesIds={favoritesIds}
        addToFavoritesHandler={addToFavoritesHandler}
        removeFavoriteHandler={removeFavoriteHandler}
        error={error}
        searchValue={searchValue}
        loading={loading}
      />
    ),
    [
      activeFilters,
      changeFilter,
      searchValue,
      loading,
      quizzes,
      favoritesIds,
      addToFavoritesHandler,
      removeFavoriteHandler,
      error,
    ]
  );
};
