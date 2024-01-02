import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  TextField,
} from '@mui/material';

import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import fetchNotes from 'functions/fetchNotes';
import useSubmit from 'functions/postNote';

import useUpdate from 'functions/updateNote';
import { severities } from '../../App';

export default function NewNoteForm({
  openPopup,
  setOpenPopup,
  editNote,
  notes,
  setNotes,
  isEditMode,
  setSnackbar,
}) {
  const { isLoadingEdit, responseEdit, updateNote } = useUpdate();
  const { postNote, isLoading, response } = useSubmit();

  const handleClose = () => {
    setOpenPopup(false);
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      title: editNote?.title || '',
      note: editNote?.note || '',
    },
    onSubmit: async (values) => {
      if (!editNote._id) {
        await postNote(values);
        setOpenPopup(false);
        resetForm();
        fetchNotes()
          .then((data) => {
            setNotes(data);
          })
          .catch((err) => {
            setSnackbar({
              isOpened: true,
              severity: severities.ERROR,
              message: response.message,
            });
          });
      } else {
        await updateNote(editNote._id, values);
        setOpenPopup(false);
        resetForm();
        fetchNotes()
          .then((data) => {
            setNotes(data);
          })
          .catch((err) => {
            setSnackbar({
              isOpened: true,
              severity: severities.ERROR,
              message: responseEdit.message,
            });
          });
      }
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required').min(5).max(400),
      note: Yup.string().required('Required').min(5).max(1000),
    }),
    enableReinitialize: true,
  });

  useEffect(() => {
    if (response) {
      if (response.success) {
        setSnackbar({
          isOpened: true,
          severity: severities.SUCCESS,
          message: response.message,
        });
      } else {
        setSnackbar({
          isOpened: true,
          severity: severities.ERROR,
          message: response.message,
        });
      }
    }
  }, [response, setSnackbar]);

  useEffect(() => {
    if (responseEdit) {
      if (responseEdit.success) {
        setSnackbar({
          isOpened: true,
          severity: severities.SUCCESS,
          message: responseEdit.message,
        });
      } else {
        setSnackbar({
          isOpened: true,
          severity: severities.ERROR,
          message: responseEdit.message,
        });
      }
    }
  }, [responseEdit, setSnackbar]);

  return (
    <>
      <Dialog open={openPopup} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{isEditMode ? 'Edit Note' : 'New Note'}</DialogTitle>
        <DialogContent dividers>
          <Box
            sx={{
              '& .MuiTextField-root': { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <TextField
                    id="standard-textarea"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormHelperText style={{ color: '#fa0505' }}>
                    {touched.title && errors.title}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="note">Text</FormLabel>
                  <TextField
                    id="outlined-multiline-static"
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    multiline
                    rows={4}
                  />
                  <FormHelperText style={{ color: '#fa0505' }}>
                    {touched.note && errors.note}
                  </FormHelperText>
                </FormControl>
                <Stack direction="row" spacing={2}>
                  <Button
                    type="submit"
                    disabled={isLoading || isLoadingEdit}
                    style={{ textTransform: 'none' }}
                  >
                    {(isLoading || isLoadingEdit) && <CircularProgress />}
                    Submit
                  </Button>
                  <Button
                    style={{ textTransform: 'none' }}
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
