import React, { useContext, useEffect } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Pagination from '@mui/material/Pagination';

import Loading from '../../Loading';
import { CategoryContext } from '../../../../contexts/CategoryContext';

const ListCategories = () => {
  const {
    categoryState: { category, categories, categoriesLoading },
    getCategories,
    addCategory,
    deleteCategory,
  } = useContext(CategoryContext);

  useEffect(() => {
		getCategories();
	}, []);

  if (categoriesLoading) {
    return <Loading />
  }

  console.log(categories);

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Table</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-nowrap overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Tên danh mục</th>
                <th>Tổng số lượng sách</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                categories.map((category, index) => {
                  return (
                    <tr key={category._id}>
                      <td>#{index + 1}</td>
                      <td>{category.name}</td>
                      <td>1</td>
                      <td className='max-w-0'>
                        <Button className='mr-2' size="small" color="error" variant="contained" startIcon={<DeleteIcon />}>
                          Xóa
                        </Button>
                        <Button  size="small" color="info" variant="contained" startIcon={<ModeEditOutlineIcon />}>
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <Pagination className='pt-3' count={10} color="primary" />
        </div>
      </div>
    </div>
  )
}

export default ListCategories;
