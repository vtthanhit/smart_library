import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import moment from 'moment'

import Loading from '../../Loading';
import { RequestContext } from '../../../../contexts/RequestContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const RequestBorrow = () => {
  const {
    requestState: { count, requests, reuqestsLoading },
    getAdminRequestBorrow,
    adminUpdateRequest,
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
  const handleUpdateRequest = async (requestId, status) => {
    const statusChange = {status}
    const { success, message } = await adminUpdateRequest(requestId, statusChange);
    if (success) {
      getAdminRequestBorrow(pagination.from, pagination.to)
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
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
                        {
                          request.status === 'PENDING' ?
                          (
                            <>
                              <Button onClick={() => handleUpdateRequest(request._id, status = 'ACCEPT')} className='mr-2' size="small" color="info" variant="contained">
                                Chấp nhận
                              </Button>
                              <Button onClick={() => handleUpdateRequest(request._id, status = 'REJECT')} className='mr-2' size="small" color="error" variant="contained">
                                Từ chối
                              </Button>
                            </>
                          ) :
                          null
                        }
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>

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