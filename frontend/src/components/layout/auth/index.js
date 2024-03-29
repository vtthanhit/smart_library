import React from 'react'
import Breadcrumbs from '../Breadcrumbs';
import Profile from './components/Profile';
import ToastMessage from './components/ToastMessage';

const index = () => {
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
          <ToastMessage />
        </div>
        <Profile />
      </div>
    </div>
  )
}

export default index