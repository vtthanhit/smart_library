import React from 'react'
import Categories from '../../components/layout/category/Categories';
import Header from '../../components/layout/header';
import Menu from '../../components/layout/menu';
import AddCategory from './../../components/layout/category/AddCategory';

function Admin({ adminRoute }) {
  return (
    <div className='w-full flex flex-auto items-stretch bg-root-bg'>
      <div className='w-full flex flex-auto items-stretch min-h-screen'>
        {/* Menu */}
        <Menu />

        <div className='xl:pl-64 flex flex-auto items-stretch p-0 basis-full flex-col w-0 min-w-0 min-h-0'>
          {/* Search */}
          <Header />
          { adminRoute === '/admin/category/list' && <Categories /> }
          { adminRoute === '/admin/category/add' && <AddCategory /> }
        </div>
      </div>
    </div>
  )
}

export default Admin