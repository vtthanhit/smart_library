import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import moment from 'moment'

import Loading from '../../Loading';
import { RequestContext } from '../../../../contexts/RequestContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const RequestBorrow = () => {
  const [openReturn, setOpenReturn] = useState(false);
  const [requestUpdate, setRequestUpdate] = useState();

  const {
    requestState: { count, requests, reuqestsLoading },
    getAdminRequestBorrow,
    adminUpdateRequest,
    returnRequest,
    pagination,
    setPagination,
    setShowToast,
  } = useContext(RequestContext);

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    getAdminRequestBorrow(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count]);

  if (reuqestsLoading) {
    return <Loading />
  }

  let status = '';
  const handleReturn = async () => {
    const type = { type: "RETURN" };
    const { success, message } = await returnRequest(requestUpdate, type);
    if (success) {
      getAdminRequestBorrow(pagination.from, pagination.to)
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenReturn(false);
  }

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
                <th>Người mượn</th>
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
                      <td>{moment(request.updatedAt, "YYYY-MM-DD").format("DD-MM-YYYY")}</td>
                      <td>{request.status === 'PENDING' ?
                        <p className="text-lime-500">Chờ xác nhận</p> :
                        request.status === 'ACCEPT' ?
                        <p className="text-cyan-500">Đã xác nhận</p> :
                        <p className="text-rose-500">Đã từ chối</p>
                      }
                      </td>
                      <td>{request.user.fullname}</td>
                      <td>
                        <Button onClick={() => {setOpenReturn(true); setRequestUpdate(request._id)}} size="small" color="info" variant="contained" startIcon={<KeyboardReturnIcon />}>
                          Trả
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>

          <Dialog open={openReturn} onClose={() => { setOpenReturn(false); }}>
            <DialogTitle id="alert-dialog-title">Xác nhận trả sách?</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setOpenReturn(false); }}>Trở về</Button>
              <Button onClick={() => { handleReturn(); setRequestUpdate(null) }} autoFocus>Đồng ý</Button>
            </DialogActions>
          </Dialog>

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

export default RequestBorrow