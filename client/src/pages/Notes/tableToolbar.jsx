import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect } from 'react';
import fetchNotes from 'functions/fetchNotes';
import useDelete from 'functions/deleteNotes';
import { CircularProgress } from '@mui/material';
import { severities } from '../../App';

export default function NotesTableToolbar({
  selected,
  numSelected,
  filterQuestion,
  onFilterQuestion,
  notes,
  setNotes,
  setSelected,
  setSnackbar,
}) {
  const { isLoading, response, deleteNotes } = useDelete();
  const handleDeleteNotes = async () => {
    await deleteNotes(selected);
    selected.length = 0;
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
  };

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

  return (
    <Toolbar
      disableGutters
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        m: 0,
        pl: 3,
        pr: 3,
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          size={'small'}
          value={filterQuestion}
          onChange={onFilterQuestion}
          placeholder="Type to search..."
          sx={{ pl: 2 }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteNotes} disabled={isLoading}>
            {isLoading && <CircularProgress />}
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
