import React, { useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import moment from 'moment'

import Loading from '../../Loading';
import { RequestContext } from '../../../../contexts/RequestContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const RequestReturn = () => {
  const {
    requestState: { count, requests, reuqestsLoading },
    getAdminRequestReturn,
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
    getAdminRequestReturn(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count]);

  if (reuqestsLoading) {
    return <Loading />
  }

  const handleUpdateRequest = async (requestId) => {
    const status = {status: "ACCEPT"}
    const { success, message } = await adminUpdateRequest(requestId, status);
    if (success) {
      getAdminRequestReturn(pagination.from, pagination.to)
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
  }

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Danh sách yêu cầu trả</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-nowrap overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Mã sách</th>
                <th>Tên sách</th>
                <th>Số lượng</th>
                <th>Ngày trả</th>
                <th>Trạng thái</th>
                <th>Người trả</th>
                <th>Duyệt bởi</th>
              </tr>
            </thead>
            <tbody>
              {
                requests.map((request, index) => {
                  return (
                    <tr key={request._id}>
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>{request.books.book.sku}</td>
                      <td>{request.books.book.name}</td>
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
                      <td>{request.user_confirm.fullname}</td>
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

export default RequestReturn
