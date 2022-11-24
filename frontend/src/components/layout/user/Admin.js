import React from 'react'
import Breadcrumbs from '../Breadcrumbs'
import AddAdminModal from './components/AddAdminModal';
import ToastMessage from './components/ToastMessage';
import ListAdmin from './components/ListAdmin';

const Admins= () => {
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
          <AddAdminModal />
          <ToastMessage />
        </div>
        <ListAdmin />
      </div>
    </div>
  )
}

export default Admins
