import React from 'react'
import Breadcrumbs from '../Breadcrumbs'

function AddCategory() {
  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xs:px-2 xxl:max-w-1400 w-full mr-auto ml-auto'>
        <Breadcrumbs />
      </div>
    </div>
  )
}

export default AddCategory
