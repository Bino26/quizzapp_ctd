import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    avatarURL: '',
    role: [''],
    loggedIn: false,
    accessToken: '',
    favorites: [], //array quizzes IDs
    progress: [
      {
        quizId: '',
        attemptsCount: 1,
        bestScore: 50,
        lastScore: 30,
      },
    ],
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
