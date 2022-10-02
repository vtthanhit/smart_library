import React from 'react';

import Breadcrumbs from '../Breadcrumbs';
import ToastMessage from './components/ToastMessage';
import RequestReturn from './components/RequestReturn';

const AdminRequestReturn = () => {
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
          <ToastMessage />
        </div>
        <RequestReturn />
      </div>
    </div>
  )
}

export default AdminRequestReturn