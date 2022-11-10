import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useSearchParams } from "react-router-dom";

function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = React.useState('');
  
  const setQuerydata = (event) => {
    setQuery(event.target.value);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchParams({q: query});
  }

  return (
    <div className='xl:flex-row items-center flex flex-col pl-0 mb-0 list-none'>
        <form onSubmit={handleSubmit} className='items-center flex '>
          <SearchIcon className='xl:text-2xl text-gray-400' />
          <input
            type="text"
            className="border-0 shadow-none block w-full p-input text-base font-normal bg-clip-padding appearance-none rounded-md focus:outline-0"
            placeholder="Tìm kiếm ..."
            name="q"
            value={query}
            onChange={setQuerydata}
          />
        </form>
    </div>
  )
}

export default Search