import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputLabel, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Pagination from '@mui/material/Pagination';
import CloseIcon from '@mui/icons-material/Close';

import Loading from '../../Loading';
import { CategoryContext } from '../../../../contexts/CategoryContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const ListCategories = () => {
  const {
    categoryState: { count, categories, amountBooks, categoriesLoading },
    getCategories,
    deleteCategory,
    updateCategory,
    pagination,
    setPagination,
    setShowToast,
  } = useContext(CategoryContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [catDelete, setCatDelete] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [catUpdate, setCatUpdate] = useState({});

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    getCategories(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count]);

  if (categoriesLoading) {
    return <Loading />
  }
  const handleDeleteCategory = async () => {
    const { success, message } = await deleteCategory(catDelete);
    if (success) {
      setPagination({...pagination, count: count - 1});
      getCategories(pagination.from, pagination.to);
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenDelete(false);
    setCatDelete(null);
  }

  const onChangeUpdateCategory = event => {
    setCatUpdate({...catUpdate, [event.target.name]: event.target.value});
  }

  const onSubmitUpdate = async event => {
    event.preventDefault();
    const { success, message } = await updateCategory(catUpdate);
    if (success) {
      getCategories(pagination.from, pagination.to)
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenUpdate(false);
  }

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Danh sách danh mục</h5>
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
                      <td>
                        {amountBooks.map((amountBook) => {
                          return (
                            amountBook._id === category._id ? amountBook.totalAmount : ""
                          )
                        })}
                      </td>
                      <td className='max-w-0'>
                        <Button onClick={() => {setOpenDelete(true); setCatDelete(category._id)}} className='mr-2' size="small" color="error" variant="contained" startIcon={<DeleteIcon />}>
                          Xóa
                        </Button>
                        <Button onClick={() => {setOpenUpdate(true); setCatUpdate(category)}} size="small" color="info" variant="contained" startIcon={<ModeEditOutlineIcon />}>
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
            <DialogTitle id="alert-dialog-title">Xóa danh mục sẽ xóa tất cả các đầu sách thuộc danh mục này. Bạn chắc chắn muốn xóa?</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setOpenDelete(false); setCatDelete(null) }}>Trở về</Button>
              <Button onClick={() => { handleDeleteCategory() }} autoFocus>Đồng ý</Button>
            </DialogActions>
          </Dialog>

          {/* dialog update */}
          <div>
            <Dialog open={openUpdate} onClose={() => {setOpenUpdate(false)}} fullWidth={true}>
              <form onSubmit={onSubmitUpdate}>
                <DialogTitle>
                  Cập nhật danh mục!
                  <IconButton
                  onClick={() => {setOpenUpdate(false)}}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                  }}
                  >
                    <CloseIcon />
                  </IconButton>
                </DialogTitle>
                <DialogContent>
                  <InputLabel shrink>
                    Tên danh mục
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    name='name'
                    variant="outlined"
                    placeholder='Tên danh mục'
                    fullWidth={true}
                    size="small"
                    value={catUpdate.name}
                    required
                    onChange={onChangeUpdateCategory}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {setOpenUpdate(false)}}>Hủy</Button>
                  <Button type='submit'>Cập nhật</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>

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
