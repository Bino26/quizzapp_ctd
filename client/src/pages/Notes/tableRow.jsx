import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { defaultTheme } from '../../assets/styles';

export default function NotesTableRow({
  selected,
  title,
  note,
  handleClick,
  handleEditNote,
}) {
  return (
    <TableRow
      hover
      tabIndex={-1}
      role="checkbox"
      selected={selected}
      onDoubleClick={() => handleEditNote(null)}
    >
      <TableCell padding="checkbox" sx={{ pt: 1, pb: 1 }}>
        <Checkbox
          disableRipple
          checked={selected}
          onChange={handleClick}
          sx={{ ml: 1 }}
        />
      </TableCell>

      <TableCell
        component="th"
        scope="row"
        sx={{
          pl: 0,
          minWidth: '300px',
          [defaultTheme.breakpoints.down('md')]: {
            minWidth: '150px',
          },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2">{title}</Typography>
        </Stack>
      </TableCell>

      <TableCell sx={{ pt: 1, pb: 1, pl: 2 }}>
        <Typography variant="body2" sx={{ textAlign: 'justify' }}>
          {note}
        </Typography>
      </TableCell>
      <TableCell align="right"></TableCell>
    </TableRow>
  );
}
