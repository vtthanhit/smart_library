import React, { useEffect, useContext } from 'react'
import { Grid, Pagination } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import { useSearchParams, useNavigate } from "react-router-dom";

import Breadcrumbs from '../Breadcrumbs';
import { BookContext } from '../../../contexts/BookContext';
import Loading from '../Loading';
import { HOME_PAGY_PAGE_SIZE } from '../../../contexts/constants';
import { covertImageBase64 } from '../book/covertImageBase64';
import { RequestContext } from '../../../contexts/RequestContext';
import ToastMessage from './components/ToastMessage';

const AdminBookCard = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const navigate= useNavigate();

  const {
    bookState: { count, books, booksLoading },
    getBooks,
    pagination,
    setPagination,
  } = useContext(BookContext);

  const {
    requestState: { request, requestsLoading },
    addRequest,
    setShowToast,
  } = useContext(RequestContext);

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * HOME_PAGY_PAGE_SIZE;
    const to = (page - 1) * HOME_PAGY_PAGE_SIZE + HOME_PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    getBooks(query, pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count, query]);

  if (booksLoading) {
    return <Loading />
  }

  const addNow = async (bookId) => {
  }

  return (
    <div className='pb-0 w-full flex items-stretch flex-auto flex-col justify-between'>
      <div className='py-6 flex-grow xxl:px-2 xxl:max-w-1400 xs:px-7 w-full mr-auto ml-auto'>
        <div className='flex justify-between items-center'>
          <Breadcrumbs />
          <ToastMessage />
        </div>
        <Grid container spacing={2}>
          {
            books.map((book) => {
              return (
                <Grid item sm={6} xs={12} md={3} key={book._id}>
                  <Card className='h-full'>
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      image={
                        book.image ? `data:image/png;base64,${covertImageBase64(book.image.data.data)}`
                        : "https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png"
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {book.name}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        Tác giả: {book.author}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        Thể loại: {book.category.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.description}
                      </Typography>
                      {book.quantity > 0 ? (<Typography variant="body2" color="text.secondary">
                        Số lượng: {book.quantity}
                      </Typography>) : (<Typography variant="body2" className='text-red-700'>
                        Hết sách
                      </Typography>)}
                    </CardContent>
                    {book.quantity > 0 ? (<CardActions>
                      <Button onClick={() => navigate('/admin/request/add_new', {state: {book}})} size="small">Cho thuê ngay</Button>
                    </CardActions>) : null}
                  </Card>
                </Grid>
              )
            })
          }
        </Grid>
        {/* pagination */}
        <Pagination
          className='pt-3'
          count={Math.ceil(count / HOME_PAGY_PAGE_SIZE)}
          color="primary"
          onChange={handlePaginateChange}
        />
      </div>
    </div>
  )
}

export default AdminBookCard
