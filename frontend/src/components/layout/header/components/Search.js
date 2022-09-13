import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

function Search() {
  return (
    <div className='xl:flex-row items-center flex flex-col pl-0 mb-0 list-none'>
      <div className='items-center flex '>
        <SearchIcon className='xl:text-2xl text-gray-400' />
        <input
          type="text"
          className="border-0 shadow-none block w-full p-input text-base font-normal bg-clip-padding appearance-none rounded-md focus:outline-0"
          placeholder="Tìm kiếm ..."
        />
      </div>
    </div>
  )
}

export default Search