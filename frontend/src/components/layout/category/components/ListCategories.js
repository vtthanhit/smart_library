import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Pagination from '@mui/material/Pagination';

import Loading from '../../Loading';
import { CategoryContext } from '../../../../contexts/CategoryContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';
import UpdateCategoryModal from './UpdateCategoryModal';

const ListCategories = () => {
  const {
    categoryState: { category, count, categories, categoriesLoading },
    getCategories,
    addCategory,
    deleteCategory,
    pagination,
    setPagination,
    setShowToast,
  } = useContext(CategoryContext);
  
  const [openDelete, setOpenDelete] = useState(false);
  const [catDelete, setCatDelete] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [catUpdate, setCatUpdate] = useState(null);

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;
    
    setPagination({ ...pagination, from, to });
  }  

  useEffect(() => {
    setPagination({ ...pagination, count });
    getCategories(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, pagination.count]);

  if (categoriesLoading) {
    return <Loading />
  }
  const handleDeleteCategory = async () => {
    const { success, message } = await deleteCategory(catDelete);
    if (success) {
      setPagination({...pagination, count: count - 1});
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenDelete(false); 
    setCatDelete(null);
  }
  console.log(count)
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
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>{category.name}</td>
                      <td>1</td>
                      <td className='max-w-0'>
                        <Button onClick={() => {setOpenDelete(true); setCatDelete(category._id)}} className='mr-2' size="small" color="error" variant="contained" startIcon={<DeleteIcon />}>
                          Xóa
                        </Button>
                        <Button onClick={() => {setOpenUpdate(true); setCatUpdate(category._id)}} size="small" color="info" variant="contained" startIcon={<ModeEditOutlineIcon />}>
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
            
          </table>
          {/* dialog confirm delete */}
          <Dialog open={openDelete} onClose={() => { setOpenDelete(false); setCatDelete(null) }}>
            <DialogTitle id="alert-dialog-title">Xác nhận xóa danh mục?</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setOpenDelete(false); setCatDelete(null) }}>Trở về</Button>
              <Button onClick={() => { handleDeleteCategory() }} autoFocus>Đồng ý</Button>
            </DialogActions>
          </Dialog>

          {/* dialog update */}
          <UpdateCategoryModal openUpdate={openUpdate} />
          
          {/* pagination */}
          <Pagination
            className='pt-3'
            count={Math.ceil(count / PAGY_PAGE_SIZE)}
            color="primary"
            onChange={handlePaginateChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ListCategories;
