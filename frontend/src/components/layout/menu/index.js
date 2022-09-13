import React from 'react'
import Logo from './components/Logo';
import MenuItem from './components/MenuItem';
import { menuData } from './data/MenuData';

function Menu() {
  return (
    <aside className='bg-white shadow-my-2 xl:fixed xl:top-0 xl:bottom-0 xl:left-0 mx-0 min-h-1 w-64 flex-auto flex-col'>
      <Logo />
      <ul className='flex flex-col flex-auto relative overflow-hidden items-start justify-start m-0 p-0 h-full py-1'>
          {/* <MenuItem name='Thống kê' link='/admin' />
          <MenuItem name='Yêu cầu' link='/request' />
          <MenuItem name='Quản lý bạn đọc' link='/user' />
          <MenuItem name='Quản lý danh mục' link='/category' />
          <MenuItem name='Quản lý sách' link='/book' /> */}
          {menuData.map((item, index) => {
            return <MenuItem item={item} key={index} />
          })}
      </ul>
    </aside>
  )
}

export default Menu