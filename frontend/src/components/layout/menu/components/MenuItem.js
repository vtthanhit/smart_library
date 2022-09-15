import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

function MenuItem({ item }) {
  const [submenu, setSubmenu] = useState(false);
  const showSubmenu = () => setSubmenu(!submenu);
  return (
    <>
    <li className= 'menu-itemw-80 flex-grow-0 flex-shrink-0 basis-0 flex-col p-0 w-full list-none my-1'>
      <NavLink to={item.path} className='rounded-md my-0 mx-4 text-base py-3 px-4 relative flex items-center flex-grow-0 flex-shrink-1 basis-auto text-body-color  hover:text-primary justify-between hover:font-bold hover:bg-nav-hover transition-colors duration-300' onClick={item.subMenu && showSubmenu}>
        <div className='flex'>
          <div className='mr-2'>{item.icon}</div>
          <div>{item.title}</div>
        </div>
        <div>
          {item.subMenu && submenu
            ? item.iconOpened
            : item.subMenu
            ? item.iconClosed
            : null}
        </div>
      </NavLink>
    </li>
    <ul className='flex flex-col m-0 p-0 w-full'>
    {submenu &&
      item.subMenu.map((item, index) => {
        return (
            <li key={index} className='flex-auto flex-col m-0 p-0 list-none items-start justify-start '>
              <NavLink to={item.path} key={index} className='rounded-md my-0.5 mx-4 text-base py-3 px-6 relative flex items-center flex-grow-0 flex-shrink-1 basis-auto text-body-color hover:text-primary hover:font-bold hover:bg-nav-hover transition-colors duration-300'>
                <div className='mr-2'>{item.icon}</div>
                <div>{item.title}</div>
              </NavLink>
            </li>
        );
      })}
      </ul>
    </>
  )
}

export default MenuItem