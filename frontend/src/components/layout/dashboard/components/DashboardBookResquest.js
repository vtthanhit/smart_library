import { Pagination } from '@mui/material';
import { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookContext } from '../../../../contexts/BookContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';
import { covertImageBase64 } from '../../book/covertImageBase64';
import Loading from '../../Loading';

const DashboardBookRequest = () => {
  const {
    bookState: { count, books, booksLoading },
    lotBooks,
    pagination,
    setPagination,
  } = useContext(BookContext);
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    lotBooks(query, pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count, query]);

  if (booksLoading) {
    return <Loading />
  }

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Thống kê sách mượn nhiều nhất</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-nowrap overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Mã sách</th>
                <th>Hình ảnh</th>
                <th>Tên sách</th>
                <th>Tác giả</th>
                <th>Số lần được mượn</th>
              </tr>
            </thead>
            <tbody>
              {
                books?.map((book, index) => {
                  return (
                    <tr key={book._id}>
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>{book.book_requests[0].sku}</td>
                      <td>
                        {
                          book.book_requests[0].image
                          ? <img alt={book.book_requests[0].name} src={`data:image/png;base64,${covertImageBase64(book.book_requests[0].image.data.data)}`} width="300" className='rounded-lg shadow-my-2'/>
                          : <img alt={book.book_requests[0].name} src='https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png' width="300" className='rounded-lg shadow-my-2'/>
                        }
                      </td>
                      <td>{book.book_requests[0].name}</td>
                      <td>{book.book_requests[0].author}</td>
                      <td>{book.totalAmount}</td>
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

export default DashboardBookRequest;