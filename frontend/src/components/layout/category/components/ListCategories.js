import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import Loading from '../../Loading';
import { CategoryContext } from '../../../../contexts/CategoryContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const ListCategories = () => {
  const location= useLocation();

  const {
    categoryState: { category, count, categories, categoriesLoading },
    getCategories,
    addCategory,
    deleteCategory,
    pagination,
    setPagination,
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategories(pagination.from, pagination.to);
    setPagination({...pagination, count});
	}, [pagination.from, pagination.to]);

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  if (categoriesLoading) {
    return <Loading />
  }

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
          <Pagination
            className='pt-3'
            count={Math.ceil(count / PAGY_PAGE_SIZE)}
            color="primary"
            onChange={handlePaginateChange}
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/admin/category${item.page === 1 ? '' : `?page=${item.page}`}`}
                {...item}
                />
              )
            }
          />
        </div>
      </div>
    </div>
  )
}

export default ListCategories;
