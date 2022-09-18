import React from 'react'
import Breadcrumbs from '../Breadcrumbs'
import AddUserModal from './components/AddUserModal';
import ToastMessage from './components/ToastMessage';
import ListUsers from './components/ListUsers';

const Users = () => {
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
          <AddUserModal />
          <ToastMessage />
        </div>
        <ListUsers />
      </div>
    </div>
  )
}

export default Users
