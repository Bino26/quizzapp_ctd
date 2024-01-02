import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAuth from 'auth/useAuth';
import useQuiz from '../../quiz/useQuiz';
import { Button, Container, Typography, Grid, Link, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import QuestionContent from './QuestionContent';
import Loading from 'components/Loading';
import QuizLoadError from './QuizLoadError';
import { QUIZZES, ERROR } from '../../App';
import {
  backendApiCall,
  fetchQuizData,
  updateUserProgress,
  fetchAndAddUserQuizzes,
} from '../../functions/exportFunctions';
import customColors, { defaultTheme } from '../../assets/styles';

export default function QuizContent({ setSnackbar }) {
  //context variables
  const { quizId } = useParams();
  const { quizzes, setQuizzes } = useQuiz();
  const { auth } = useAuth();

  //state variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answersCorrectness, setAnswersCorrectness] = useState([]);
  const [userPerformance, setUserPerformance] = useState({
    correctCount: 0,
    totalCount: 0,
  });
  const [userQuizzesUpdated, setUserQuizzesUpdated] = useState(false);

  const navigate = useNavigate();

  //quiz content variables
  const quiz = quizzes.find((q) => q.id === quizId);
  const questions = quiz?.questions || [];
  const quizTitle = quiz?.title || '';

  //state array tracking user selections for all questions
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill('')
  );

  //fetches quiz data if context quiz data is reset
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (quizzes.length === 1 && auth.loggedIn) {
          await fetchQuizData(
            backendApiCall,
            setQuizzes,
            setError,
            auth,
            setLoading
          );
        } else {
          setLoading(false);
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchQuiz();
  }, [auth, quizzes.length, setQuizzes]);

  //navigates to error page if quiz can't be found
  useEffect(() => {
    if (!loading && !quiz) {
      navigate(ERROR);
    }
  }, [loading, quiz, navigate]);

  //updates user performance if user finishes quiz
  useEffect(() => {
    const updateUserQuizProgress = async () => {
      try {
        if (quizFinished && !userQuizzesUpdated) {
          const correctCount = answersCorrectness.filter(
            (answer) => answer && answer.isCorrect
          ).length;
          const totalCount = questions.length;
          setUserPerformance({ correctCount, totalCount });
          const finalScore = Math.round((correctCount / totalCount) * 100);

          const response = await updateUserProgress(
            quiz.id,
            finalScore.toString(),
            auth.userId,
            setError
          );
          if (response && response.message === 'Attempt added successfully') {
            await fetchAndAddUserQuizzes(
              backendApiCall,
              quizzes,
              setQuizzes,
              setError,
              auth,
              setUserQuizzesUpdated
            );
            setUserQuizzesUpdated(true);
          }
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    updateUserQuizProgress();
  }, [
    quizFinished,
    answersCorrectness,
    questions.length,
    quiz,
    auth,
    quizzes,
    setQuizzes,
    setError,
    userQuizzesUpdated,
  ]);

  //reset userQuizUpdated state variable when starting a new quiz
  useEffect(() => {
    setUserQuizzesUpdated(false);
  }, [quizId]);

  const handleSetSelectedOption = (option) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleAnswerSelected = (answer, questionIndex) => {
    //updates answerCorrectness array used to conditionally render correct answer components and styles
    const isCorrect = answer === questions[questionIndex].correctOption;
    setAnswersCorrectness((prev) => {
      const newAnswers = [...prev];
      newAnswers[questionIndex] = { isCorrect };
      return newAnswers;
    });
    // Also update the selectedOptions state
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex] = answer;
    setSelectedOptions(newSelectedOptions);
  };

  const handleSkipQuestion = (resetCallback, answeredStatus) => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
    if (!answeredStatus) {
      resetCallback();
    }
  };

  const ChangedIndicatorColor = ({ correctnessInfo, isCurrentQuestion }) => {
    return (
      <div
        style={{
          backgroundColor: correctnessInfo
            ? correctnessInfo.isCorrect
              ? customColors.greenMedium
              : customColors.redMedium
            : 'rgb(211, 209, 209)',
          border: isCurrentQuestion ? '2px solid #0057B2' : 'none',
          borderRadius: '50%',
          width: 12,
          height: 12,
          margin: 6,
          display: 'inline-block',
        }}
      ></div>
    );
  };

  const handleBackQuestion = (resetCallback, answeredStatus) => {
    if (currentQuestionIndex < questions.length && currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }

    if (!answeredStatus) {
      resetCallback();
    }
  };

  return (
    <>
      {!quiz ? (
        <Loading />
      ) : (
        <Container
          sx={{
            minHeight: '95vh',
            backgroundColor: customColors.greyLight,
            maxWidth: 'none !important',
            pt: 6,
            pb: 6,
            display: 'flex',
            justifyContent: 'center',
            [defaultTheme.breakpoints.down('sm')]: {
              pt: 4,
            },
          }}
        >
          {error ? (
            <QuizLoadError />
          ) : (
            <Box sx={{ maxWidth: '1200px', width: '100%' }}>
              <Link
                href={QUIZZES}
                sx={{
                  textDecoration: 'none',
                  color: customColors.blackLight,
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <ArrowBackIcon sx={{ mr: 1 }} /> Back to choosing a quiz
              </Link>
              <Typography
                variant={'h5'}
                sx={{
                  textTransform: 'uppercase',
                  mb: 4,
                  mt: 1,
                  fontWeight: 'bold',
                  [defaultTheme.breakpoints.down('md')]: {
                    fontSize: '20px',
                  },
                  justifyContent: 'center',
                  [defaultTheme.breakpoints.down('sm')]: {
                    mb: 2,
                  },
                }}
              >
                {quizTitle}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'left',
                  maxWidth: 'none !important',
                  mb: 2,
                  [defaultTheme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                  },
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ color: 'rgb(223, 221, 221)', pr: 2 }}
                >
                  {currentQuestionIndex < questions.length
                    ? `${currentQuestionIndex + 1} of ${questions.length}`
                    : `${currentQuestionIndex} of ${questions.length}`}
                </Typography>
                <Box>
                  {questions.map((q, index) => {
                    const correctnessInfo = answersCorrectness[index];
                    const isCurrentQuestion = index === currentQuestionIndex;
                    return (
                      <ChangedIndicatorColor
                        key={q.id}
                        correctnessInfo={correctnessInfo}
                        isCurrentQuestion={isCurrentQuestion}
                      />
                    );
                  })}
                </Box>
              </Box>
              {currentQuestionIndex < questions.length &&
                (!quizFinished ? (
                  <QuestionContent
                    questionId={questions[currentQuestionIndex].id}
                    index={currentQuestionIndex}
                    length={questions.length}
                    question={questions[currentQuestionIndex].questionText}
                    answer={questions[currentQuestionIndex].correctOption}
                    options={questions[currentQuestionIndex].options}
                    code={questions[currentQuestionIndex].code}
                    resources={questions[currentQuestionIndex].resources}
                    selectedOption={selectedOptions[currentQuestionIndex]}
                    setSelectedOption={handleSetSelectedOption}
                    onAnswerSelected={handleAnswerSelected}
                    onSkipQuestion={handleSkipQuestion}
                    onBackQuestion={handleBackQuestion}
                    userAnswers={answersCorrectness}
                    type={questions[currentQuestionIndex].type}
                    setFinishQuiz={setQuizFinished}
                    setLoading={setLoading}
                    setSnackbar={setSnackbar}
                  />
                ) : (
                  <>
                    <Typography variant="subtitle1" align="center">
                      {userPerformance.correctCount < questions.length / 2
                        ? `Next time will be better! You finished the ${quizTitle} quiz!`
                        : userPerformance.correctCount >=
                              questions.length / 2 &&
                            userPerformance.correctCount < questions.length
                          ? `Good work! You finished the ${quizTitle} quiz!`
                          : `Excellent work! You finished the ${quizTitle} quiz!`}
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ mt: 2 }}>
                      You got {userPerformance.correctCount} out of{' '}
                      {userPerformance.totalCount} questions correct!
                    </Typography>
                    <Grid container justifyContent="center" alignItems="center">
                      <Button
                        onClick={() => navigate(QUIZZES)}
                        variant="contained"
                        sx={{
                          marginTop: 4,
                        }}
                      >
                        BACK TO QUIZZES
                      </Button>
                    </Grid>
                  </>
                ))}
            </Box>
          )}
        </Container>
      )}
    </>
  );
}
