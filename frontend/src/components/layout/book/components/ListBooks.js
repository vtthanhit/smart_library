import React, { useContext, useEffect, useState } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import Loading from '../../Loading';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';
import { BookContext } from '../../../../contexts/BookContext';
import { Link } from 'react-router-dom';
import { covertImageBase64 } from '../covertImageBase64';

const ListBooks = () => {
  const {
    bookState: { count, books, booksLoading },
    getBooks,
    deleteBook,
    pagination,
    setPagination,
    setShowToast,
  } = useContext(BookContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [bookDelete, setBookDelete] = useState(null);

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  const handleDeleteBook = async () => {
    const { success, message } = await deleteBook(bookDelete);
    if (success) {
      setPagination({...pagination, count: count - 1});
      getBooks(pagination.from, pagination.to);
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenDelete(false);
    setBookDelete(null);
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    getBooks(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count]);

  if (booksLoading) {
    return <Loading />
  }

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Danh sách sách</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-normal overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Hình ảnh</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Mô tả</th>
                <th>Thể loại</th>
                <th>Số lượng</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                books.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>
                        {
                          book.image
                          ? <img alt={book.name} src={`data:image/png;base64,${covertImageBase64(book.image.data.data)}`} width="300" className='rounded-lg shadow-my-2'/>
                          : <img alt={book.name} src='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png' width="300" className='rounded-lg shadow-my-2'/>
                        }
                      </td>
                      <td>{book.name}</td>
                      <td>{book.author}</td>
                      <td>{book.description}</td>
                      <td>{book.category.name}</td>
                      <td>{book.quantity}</td>
                      <td className='max-w-0 min-w-240'>
                        <Button onClick={() => {setOpenDelete(true); setBookDelete(book._id)}} className='mr-2' size="small" color="error" variant="contained" startIcon={<DeleteIcon />}>
                          Xóa
                        </Button>
                        <Link to={`/admin/book/update?id=${book._id}`} state={{bookId: book._id}}>
                          <Button size="small" color="info" variant="contained" startIcon={<ModeEditOutlineIcon />}>
                            Cập nhật
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          {/* dialog confirm delete */}
          <Dialog open={openDelete} onClose={() => { setOpenDelete(false); setBookDelete(null) }}>
            <DialogTitle id="alert-dialog-title">Xác nhận xóa sách?</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setOpenDelete(false); setBookDelete(null) }}>Trở về</Button>
              <Button onClick={() => { handleDeleteBook() }} autoFocus>Đồng ý</Button>
            </DialogActions>
          </Dialog>

          {/* dialog update */}
          {/* <div>
            <Dialog open={openUpdate} onClose={() => {setOpenUpdate(false)}} fullWidth={true}>
              <form onSubmit={onSubmitUpdate}>
                <DialogTitle>
                  Cập nhật danh mục!
                  aria-label="close"
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
          </div> */}

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


export default ListBooks