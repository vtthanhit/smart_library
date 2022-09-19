import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputLabel, Autocomplete, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Pagination from '@mui/material/Pagination';
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'

import Loading from '../../Loading';
import { RequestContext } from '../../../../contexts/RequestContext';
import { BookContext } from '../../../../contexts/BookContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const RequestBorrow = () => {
  const {
    requestState: { count, requests, reuqestsLoading },
    getUserRequestBorrow,
    deleteRequestBorrow,
    pagination,
    setPagination,
    setShowToast,
  } = useContext(RequestContext);

  const {
    bookState: { books },
    getAllBooks,
  } = useContext(BookContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [requestDelete, setRequestDelete] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [requestUpdate, setRequestUpdate] = useState({});

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    getAllBooks();
    setPagination({ ...pagination, count });
    getUserRequestBorrow(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count]);

  if (reuqestsLoading) {
    return <Loading />
  }

  const handleDeleteRequest = async () => {
    const { success, message } = await deleteRequestBorrow(requestDelete);
    if (success) {
      setPagination({...pagination, count: count - 1});
      getUserRequestBorrow(pagination.from, pagination.to);
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenDelete(false);
    setRequestDelete(null);
  }

  const options = books.map((book) => ({name: book.name, author: book.author, _id: book._id}));

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Danh sách yêu cầu mượn</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-nowrap overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Số lượng</th>
                <th>Ngày mượn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                requests.map((request, index) => {
                  return (
                    <tr key={request._id}>
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>{request.books.book.name}</td>
                      <td>{request.books.book.author}</td>
                      <td>{request.books.quantity}</td>
                      <td>{moment(request.createdAt, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                      <td>{request.status === 'PENDING' ?
                        <p className="text-lime-500">Chờ xác nhận</p> :
                        request.status === 'ACCEPT' ?
                        <p className="text-cyan-500">Đã xác nhận</p> :
                        <p className="text-rose-500">Đã từ chối</p>
                      }
                      </td>
                      <td className='max-w-0'>
                        {
                          request.status === 'PENDING' ?
                          (<Button onClick={() => {setOpenDelete(true); setRequestDelete(request._id)}} className='mr-2' size="small" color="error" variant="contained" startIcon={<DeleteIcon />}>
                            Huỷ
                          </Button>) :
                          null
                        }
                        {
                          request.status === 'PENDING' ?
                          (<Button onClick={() => {setOpenUpdate(true); setRequestUpdate(request._id)}} size="small" color="info" variant="contained" startIcon={<ModeEditOutlineIcon />}>
                            Cập nhật
                          </Button>) :
                          request.status === 'ACCEPT' ?
                          (<Button size="small" color="info" variant="contained" startIcon={<KeyboardReturnIcon />}>
                            Trả
                          </Button>) :
                          null
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          {/* dialog confirm delete */}
          <Dialog open={openDelete} onClose={() => { setOpenDelete(false); setRequestDelete(null) }}>
            <DialogTitle id="alert-dialog-title">Xác nhận huỷ yêu cầu?</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setOpenDelete(false); setRequestDelete(null) }}>Trở về</Button>
              <Button onClick={() => { handleDeleteRequest() }} autoFocus>Đồng ý</Button>
            </DialogActions>
          </Dialog>

          {/* dialog update */}
          <div>
            <Dialog open={openUpdate} onClose={() => {setOpenUpdate(false)}} fullWidth={true}>
              <form>
                <DialogTitle>
                  Cập nhật yêu cầu của bạn!
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
                <InputLabel shrink className='text-2xl'>
                  Tên sách
                </InputLabel>
                <div className="test">
                <Autocomplete
                  disablePortal
                  name='category'
                  size='small'
                  className='w-full mb-4'
                  required
                  options={options}
                  value={request.books.book.name}
                  getOptionLabel={(option) => `${option.name} - ${option.author}`}
                  isOptionEqualToValue={(option, value) => option._id === value._id}
                  renderInput={(params) => <TextField {...params} label="Tên sách" />}
                  // onChange={(event, option) => setNewBook({...newBook, category: option._id})}
                />
                </div>
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

export default RequestBorrow;
