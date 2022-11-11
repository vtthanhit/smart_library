import { Grid, Autocomplete, InputLabel, TextField, TextareaAutosize, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';

import { BookContext } from '../../../../contexts/BookContext';
import { RequestContext } from '../../../../contexts/RequestContext';
import { UserContext } from '../../../../contexts/UserContext';

const AddRequestForm = () => {
  const [username, setNewUsername] = useState('');
  const [newUser, setNewUser] = useState({
    username: '',
    fullname: '',
    classname: '',
  });
  const [newRequest, setNewRequest] = useState({
    book: '',
    quantity: 0,
  });

  const {
    bookState: { books },
    getAllBooks,
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
      await addUser(newUser);
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
  
  const options = books.map((book) => ({name: book.name, author: book.author, _id: book._id}));
  useEffect(() => {
    getAllBooks();
    findUser(username);
  }, [username]);

  return (
    <div className='w-full bg-white p-5 shadow-my'>
      <div className='mb-4'>
        <h4>Tạo yêu cầu mượn sách</h4>
      </div>
      <form onSubmit={onHandleSubmit}>
        <Grid container>
          <Grid item xs={6} md={6} className='pr-4'>
            <InputLabel shrink className='text-2xl'>
              Tên sách
            </InputLabel>
            <Autocomplete
              disablePortal
              name='book'
              size='small'
              className='w-full mb-4'
              required
              options={options}
              getOptionLabel={(option) => `${option.name} - ${option.author}`}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => <TextField {...params} label="Tên sách" />}
              onChange={(event, option) => setNewRequest({...newRequest, book: option._id})}
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
