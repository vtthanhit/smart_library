import React, { useContext } from 'react'
import { Snackbar, Alert, Stack } from '@mui/material';

import { CategoryContext } from '../../contexts/CategoryContext';


const ToastMessage = () => {
  const { showToast: { open, message, type },
    setShowToast,
  } = useContext(CategoryContext);

  const handleClose = () => {
    setShowToast({ open: false, message: '', type: null });
  }
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        { message }
      </Alert>
    </Snackbar>
  )
}

export default ToastMessage;
