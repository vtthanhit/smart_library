import React from 'react'
// import TopNav from './components/TopNav'
import Search from './components/Search';
import Profile from './components/Profile';

function Header() {
  return (
    <nav className='bg-white z-50 max-w-calc-xxl w-calc-full mx-auto mt-3 mb-0 py-0 px-6 shadow-my-2 items-center relative h-16 flex-nowrap'>
      {/* <TopNav /> */}
      <div className='basis-full items-center flex h-full'>
        <Search />
        <Profile />
      </div>
    </nav>
  )
}

export default Header