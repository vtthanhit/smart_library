import React, { useContext } from 'react'
import { Snackbar, Alert } from '@mui/material';
import Breadcrumbs from '../Breadcrumbs'
import AddCategoryModal from './components/AddCategoryModal';
import { CategoryContext } from '../../../contexts/CategoryContext';
import ToastMessage from '../ToastMessage';


function Categories() {
  // const { showToast: { open, message, type },
  // setShowToast,
  // } = useContext(CategoryContext);

  // const handleClose = () => {
  //   setShowToast({ open: false, message: '', type: null });
  // }
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
          <AddCategoryModal />
        </div>
      </div>
      {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            { message }
          </Alert>
      </Snackbar> */}
      {/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
      /> */}
    </div>
  )
}

export default Categories
