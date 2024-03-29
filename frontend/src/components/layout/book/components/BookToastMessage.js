import React, { useContext, forwardRef } from 'react'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { BookContext } from '../../../../contexts/BookContext';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BookToastMessage = () => {
  const {
    showToast: { open, message, type },
    setShowToast,
  } = useContext(BookContext);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowToast({
      open: false,
      message: '',
      type: null
    });
  };


  return (
    <>
      {open ? (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            { message ? message : 'Có lỗi không xác định!' }
          </Alert>
        </Snackbar>
      ): null}
    </>
  )
}

export default BookToastMessage;
