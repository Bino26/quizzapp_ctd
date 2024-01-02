import useAuth from '../../auth/useAuth';
import React, { useCallback, useMemo, useState } from 'react';
import {
  useFetchFavoriteQuizzes,
  removeFavorite,
} from '../../functions/exportFunctions';
import { LOGIN, severities } from '../../App';
import { QuizzesContainer } from './QuizzesContainer';

export const Favorites = ({
  changeFilter,
  activeFilters,
  searchValue,
  setSnackbar,
}) => {
  const { auth } = useAuth();
  const [favoritesData, setFavoritesData] = useState({
    favoriteQuizzes: [],
    favoritesIds: [],
  });
  const { loading, error } = useFetchFavoriteQuizzes(
    auth,
    setFavoritesData,
    favoritesData,
    LOGIN
  );

  const removeFavoriteHandler = useCallback(
    async (quizId) => {
      try {
        await removeFavorite(quizId);
        setFavoritesData((prevData) => ({
          ...prevData,
          favoritesIds: prevData.favoritesIds.filter(
            (favorite) => favorite !== quizId
          ),
          favoriteQuizzes: prevData.favoriteQuizzes.filter(
            (quiz) => quiz.id !== quizId
          ),
        }));
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
    [setSnackbar]
  );

  return useMemo(
    () => (
      <QuizzesContainer
        title="Your favorite quizzes"
        quizzesForFiltering={favoritesData.favoriteQuizzes}
        loading={loading}
        favoritesIds={favoritesData.favoritesIds}
        activeFilters={activeFilters}
        error={error}
        removeFavoriteHandler={removeFavoriteHandler}
        changeFilter={changeFilter}
        searchValue={searchValue}
        message="Save your favorite quizzes so they are here."
      />
    ),
    [
      activeFilters,
      changeFilter,
      searchValue,
      loading,
      favoritesData.favoriteQuizzes,
      favoritesData.favoritesIds,
      removeFavoriteHandler,
      error,
    ]
  );
};
