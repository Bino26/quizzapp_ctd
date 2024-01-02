import { createContext, useState } from 'react';

const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([
    {
      id: '',
      title: '',
      category: '',
      level: 'basic',
      labels: [''],
      image: null,
      questions: [
        {
          questionText: '',
          options: ['', '', '', ''],
          correctOption: '',
          type: 'radio',
          _id: '',
          code: '',
          resources: '',
        },
      ],
      quizProgress: {
        attemptsCount: 0,
        bestScore: 0,
        lastScore: 0,
      },
      createdDate: '',
    },
  ]);

  return (
    <QuizContext.Provider value={{ quizzes, setQuizzes }}>
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
