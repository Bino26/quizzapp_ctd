import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';

export default function LogoutModal(props) {
  const { showLogoutModal, setShowLogoutModal } = props;

  return (
    <Dialog open={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
      <DialogTitle>{'Logged Out'}</DialogTitle>
      <DialogContent>
        <DialogContentText>You have successfully logged out.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setShowLogoutModal(false);
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}
