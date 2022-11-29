import { Pagination } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';
import { UserContext } from '../../../../contexts/UserContext';
import Loading from '../../Loading';

const UserDashboardBookRequest = () => {
  const {
    userState: { count, users, usersLoading },
    lotUsers,
    pagination,
    setPagination,
  } = useContext(UserContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    lotUsers(query, pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count, query]);

  if (usersLoading) {
    return <Loading />
  }

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Thống kê sinh viên mượn nhiều sách nhất</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-nowrap overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Mã sinh viên</th>
                <th>Họ và tên</th>
                <th>Lớp học</th>
                <th>Số sách mượn</th>
              </tr>
            </thead>
            <tbody>
              {
                users?.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>{user.user_requests[0].username}</td>
                      <td>{user.user_requests[0].fullname}</td>
                      <td>{user.user_requests[0].classname}</td>
                      <td>{user.totalAmount}</td>
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

export default UserDashboardBookRequest;