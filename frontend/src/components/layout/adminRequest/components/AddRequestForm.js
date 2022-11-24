import { Grid, Autocomplete, InputLabel, TextField, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";

import { BookContext } from '../../../../contexts/BookContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import { UserContext } from '../../../../contexts/UserContext';

const AddRequestForm = () => {
  const location= useLocation();
  const [username, setNewUsername] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    fullname: '',
    classname: '',
  });

  const bookR = location ? location?.state?.book : '';
  console.log(bookR)
  const sku = bookR ? bookR.sku : '';
  const [newRequest, setNewRequest] = useState({
    book: bookR?._id,
    quantity: 0,
    sku,
  });

  const {
    bookState: { books, book },
    getAllBooks,
    findBookBySKU,
  } = useContext(BookContext);

  const { setShowToast, addRequest } = useContext(RequestContext);
  const { userState: { user }, findUser, addUser } = useContext(UserContext);

  const handleUsernameChange = event => {
    setNewUsername(event.target.value);
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    });
  };
  const onValueChange = event => {
    setNewUser({
      ...newUser,
      [event.target.name]: event.target.value,
    })
  }
  const onChangeRequest = (event) => setNewRequest({
    ...newRequest,
    [event.target.name]: event.target.value,
  });

  const onHandleSubmit = async (event) => {
    event.preventDefault();
    if (!user) {
      const { user } = await addUser(newUser);
      const request = {
        books: {
          book: newRequest.book,
          quantity: newRequest.quantity,
        },
        user: user._id,
      }
      const { success, message } = await addRequest(request);
      setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    } else {
      const request = {
        books: {
          book: newRequest.book,
          quantity: newRequest.quantity,
        },
        user: user._id,
      }
      const { success, message } = await addRequest(request);
      setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    }
  }

  useEffect(() => {
    getAllBooks();
    findUser(username);
    findBookBySKU(newRequest.sku)
  }, [username, newRequest.sku]);

  return (
    <div className='w-full bg-white p-5 shadow-my'>
      <div className='mb-4'>
        <h4>Tạo yêu cầu mượn sách</h4>
      </div>
      <form onSubmit={onHandleSubmit}>
        <Grid container>
          <Grid item xs={6} md={6} className='pr-4'>
            <InputLabel shrink className='text-2xl'>
              Mã sách
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='sku'
              variant="outlined"
              className='mb-4'
              placeholder='Nhập mã sách'
              fullWidth={true}
              size="small"
              defaultValue={ bookR?.sku }
              required
              onChange={onChangeRequest}
            />
            <InputLabel shrink className='text-2xl'>
              Tên sách
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='book'
              variant="outlined"
              className='mb-4'
              placeholder='Tên sách'
              fullWidth={true}
              size="small"
              value={ `${book?.name} - ${book?.category?.name}` }
              disabled
            />
            <InputLabel shrink className='text-2xl'>
              Số lượng
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='quantity'
              variant="outlined"
              className='mb-4'
              placeholder='Nhập số lượng'
              fullWidth={true}
              size="small"
              required
              onChange={onChangeRequest}
            />
            <Button type='submit' variant="contained">Tạo mới</Button>
          </Grid>
          <Grid item xs={6} md={6}>
            <InputLabel shrink className='text-2xl'>
              Mã sinh viên:
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='username'
              className='mb-4'
              variant="outlined"
              placeholder='Mã sinh viên'
              fullWidth={true}
              size="small"
              onChange={handleUsernameChange}
              required
            />
            <InputLabel shrink className='text-2xl'>
              Tên sinh viên:
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='fullname'
              className='mb-4'
              variant="outlined"
              placeholder='Họ và tên'
              fullWidth={true}
              value = {user?.fullname}
              onChange={onValueChange}
              size="small"
              required
            />
            <InputLabel shrink className='text-2xl'>
              Lớp:
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='classname'
              className='mb-4'
              variant="outlined"
              placeholder='Lớp'
              fullWidth={true}
              value = {user?.classname}
              onChange={onValueChange}
              size="small"
              required
            />
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddRequestForm;
