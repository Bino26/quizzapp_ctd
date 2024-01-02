import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coyWithoutShadows } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {
  Typography,
  RadioGroup,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormGroup,
  Box,
  Link,
} from '@mui/material';
import checkRadioRender from './CheckRadioRender';
import { defaultTheme } from '../../assets/styles';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddCommentIcon from '@mui/icons-material/AddComment';

import { BASE_URL } from 'config';
import { severities } from '../../App';

export default function QuestionContent({
  question,
  code,
  options,
  onAnswerSelected,
  onSkipQuestion,
  onBackQuestion,
  index,
  length,
  selectedOption,
  setSelectedOption,
  type,
  resources,
  userAnswers,
  questionId,
  setFinishQuiz,
  setLoading,
  setSnackbar,
}) {
  const [selected, setSelected] = useState(
    type === 'check-box'
      ? Array.isArray(selectedOption)
        ? selectedOption
        : []
      : selectedOption || null
  );
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showFinalQModal, setShowFinalQModal] = useState(false);

  useEffect(() => {
    setSelected(selectedOption);
  }, [selectedOption]);

  const resetSelection = () => {
    setSelected('');
  };

  const isCurrentQuestionAnswered = answeredQuestions.has(questionId);

  const handleNextQuestion = () => {
    if (!selected && !isCurrentQuestionAnswered) {
      setShowWarningModal(true);
    } else {
      onSkipQuestion(resetSelection, isCurrentQuestionAnswered);
    }
  };

  const handleAddNote = async () => {
    try {
      await addNote();
    } catch (error) {
      throw error;
    }
  };

  const addNote = async () => {
    setLoading(true);
    let payload = {
      title: question,
      note: 'Add your note here',
    };
    try {
      await fetch(`${BASE_URL}/note`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      setSnackbar({
        isOpened: true,
        severity: severities.SUCCESS,
        message: 'Question is added to notes.',
      });
    } catch (error) {
      setSnackbar({
        isOpened: true,
        severity: severities.ERROR,
        message: 'An error occurred while adding a question to notes.',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = () => {
    //if user submits an answer questionId is add to Set used for tracking answered questions
    setAnsweredQuestions((prev) => new Set(prev).add(questionId));
    onAnswerSelected(selected, index);
  };

  const handleSubmitTest = () => {
    const hasUnansweredQuestions =
      userAnswers.length !== length || userAnswers.includes(undefined);
    if (hasUnansweredQuestions) {
      setShowFinalQModal(true);
    } else {
      setFinishQuiz(true);
    }
  };

  const correctnessInfo = userAnswers[index];
  const checkbox = 'check-box';

  return (
    <Box>
      <Box>
        <Typography variant="h6" align="left">
          {question}
        </Typography>
        <Link
          sx={{
            mb: 3,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleAddNote()}
        >
          <AddCommentIcon sx={{ mr: 1 }} />
          Add question to notes
        </Link>
      </Box>
      {code && (
        <SyntaxHighlighter language="javascript" style={coyWithoutShadows}>
          {code}
        </SyntaxHighlighter>
      )}
      {type === checkbox ? (
        <FormGroup>
          {checkRadioRender(
            options,
            checkbox,
            selected,
            setSelected,
            isCurrentQuestionAnswered,
            correctnessInfo,
            setSelectedOption
          )}
        </FormGroup>
      ) : (
        <RadioGroup
          value={selected || ''}
          onChange={(e) => setSelected(e.target.value)}
          disabled={isCurrentQuestionAnswered}
          sx={{ gap: 1 }}
          id="answer-choices"
        >
          {checkRadioRender(
            options,
            'radio',
            selected,
            setSelected,
            isCurrentQuestionAnswered,
            correctnessInfo,
            setSelectedOption
          )}
        </RadioGroup>
      )}
      {isCurrentQuestionAnswered &&
        correctnessInfo &&
        (correctnessInfo.isCorrect ? (
          <Typography variant={'subtitle1'} sx={{ mt: 2 }}>
            {' '}
            Nice work!{' '}
          </Typography>
        ) : (
          <>
            <Typography variant={'subtitle1'} sx={{ mt: 2 }}>
              {' '}
              Sorry, that is incorrect.{' '}
            </Typography>
            {resources && (
              <Typography variant={'subtitle1'} sx={{ mt: 2 }}>
                You can learn more about this topic at the following links:
                {resources}
              </Typography>
            )}
          </>
        ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%',
          mt: 5,
          [defaultTheme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            mt: 4,
            gap: 2,
          },
        }}
      >
        <Box
          sx={{
            [defaultTheme.breakpoints.down('sm')]: {
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            },
          }}
        >
          {index > 0 && (
            <Button
              variant="outlined"
              sx={{
                mr: 1,
                [defaultTheme.breakpoints.down('sm')]: {
                  mr: 0,
                },
              }}
              onClick={() =>
                onBackQuestion(resetSelection, isCurrentQuestionAnswered)
              }
              startIcon={<ArrowBackIosIcon />}
            >
              Previous Question
            </Button>
          )}
          <Button
            variant="contained"
            disabled={isCurrentQuestionAnswered || !selected}
            onClick={handleSubmitAnswer}
          >
            Submit Answer
          </Button>
          {index < length - 1 && (
            <Button
              variant="outlined"
              onClick={handleNextQuestion}
              sx={{
                ml: 1,
                [defaultTheme.breakpoints.down('sm')]: {
                  mr: 0,
                },
              }}
              endIcon={<ArrowForwardIosIcon />}
            >
              Next Question
            </Button>
          )}
        </Box>
        {(index === length - 1 || userAnswers.length === length) && (
          <Button
            variant="contained"
            onClick={handleSubmitTest}
            sx={{
              ml: 1,
              [defaultTheme.breakpoints.down('sm')]: {
                ml: 0,
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              },
            }}
          >
            Submit Test
          </Button>
        )}
      </Box>
      {showWarningModal && (
        <Dialog
          open={showWarningModal}
          onClose={() => setShowWarningModal(false)}
        >
          <DialogTitle>{'Skip Question'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to skip this question?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowWarningModal(false)}>Cancel</Button>
            <Button
              onClick={() => {
                onSkipQuestion(resetSelection);
                setShowWarningModal(false);
              }}
            >
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {showFinalQModal && (
        <Dialog
          open={showFinalQModal}
          onClose={() => setShowFinalQModal(false)}
        >
          <DialogContent>
            <DialogContentText>
              You still have questions left unanswered, would you like to submit
              (unanswered questions will be counted as incorrect)?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFinalQModal(false)}>Go Back</Button>
            <Button
              onClick={() => {
                setFinishQuiz(true);
                setShowFinalQModal(false);
              }}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
