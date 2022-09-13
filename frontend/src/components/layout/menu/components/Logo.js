import React from 'react'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <div className='h-16 mt-3 px-8 w-full flex flex-grow-0 flex-shrink-0 overflow-hidden leading-none min-h-1 items-center'>
      <Link to='/'>
        <span className='text-3xl tracking-tighter'>Smart Library</span>
      </Link>
    </div>
  )
}

export default Logo