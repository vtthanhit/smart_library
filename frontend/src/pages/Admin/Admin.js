import React, { useContext } from 'react'
import { Snackbar, Alert } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '../../components/layout/header';
import Menu from '../../components/layout/menu';
import { CategoryContext } from '../../contexts/CategoryContext';
import ToastMessage from './../../components/layout/ToastMessage';

function Admin() {
  // const { showToast: { open, message, type },
  //   setShowToast,
  // } = useContext(CategoryContext);

  // const handleClose = () => {
  //   setShowToast({ open: false, message: '', type: null });
  // }
  return (
    <div className='w-full flex flex-auto items-stretch bg-root-bg'>
      <div className='w-full flex flex-auto items-stretch min-h-screen'>
        {/* Menu */}
        <Menu />

        <div className='xl:pl-64 flex flex-auto items-stretch p-0 basis-full flex-col w-0 min-w-0 min-h-0'>
          {/* Search */}
          <Header />
          <Outlet />
        </div>
      </div>
      <ToastMessage />

      {/* <Snackbar open={open} onClose={handleClose} anchorOrigin={{horizontal: 'right', vertical: 'top'}}>\
        <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
          { message }
        </Alert>
      </Snackbar> */}
    </div>
  )
}

export default Admin
