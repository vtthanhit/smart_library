import React from 'react'
import { Outlet } from 'react-router-dom';

import Header from '../../components/layout/header';
import Menu from '../../components/layout/menu';

function Admin() {
  return (
    <div className='w-full flex flex-auto items-stretch bg-root-bg'>
      <div className='w-full flex flex-auto items-stretch min-h-screen'>
        {/* Menu */}
        <Menu page='admin' />

        <div className='xl:pl-64 flex flex-auto items-stretch p-0 basis-full flex-col w-0 min-w-0 min-h-0'>
          {/* Search */}
          <Header />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Admin
