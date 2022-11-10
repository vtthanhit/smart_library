import { Grid, Autocomplete, InputLabel, TextField, TextareaAutosize, Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import { BookContext } from '../../../../contexts/BookContext';
import { UserContext } from '../../../../contexts/UserContext';

const AddRequestForm = () => {
  const {
    bookState: { books },
    getAllBooks,
  } = useContext(BookContext);

  const {
    userState: { users },
    getAllUsers,
  } = useContext(UserContext);

  const options = books.map((book) => ({name: book.name, author: book.author, _id: book._id}));
  const userOptions = users.map((user) => ({username: user.username, fullname: user.fullname, classname: user.classname, _id: user._id}));
  useEffect(() => {
    getAllBooks();
    getAllUsers();
  }, []);

  return (
    <div className='w-full bg-white p-5 shadow-my'>
      <div className='mb-4'>
        <h4>Tạo yêu cầu mượn sách</h4>
      </div>
      <form>
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
              // onChange={(event, option) => setNewBook({...newBook, category: option._id})}
            />
            <InputLabel shrink className='text-2xl'>
              Số lượng
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='quantity'
              variant="outlined"
              placeholder='Nhập số lượng'
              fullWidth={true}
              size="small"
              required
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <InputLabel shrink className='text-2xl'>
              Người mượn:
            </InputLabel>
            <Autocomplete
              disablePortal
              name='category'
              size='small'
              className='w-full mb-4'
              required
              options={options}
              getOptionLabel={(option) => `${option.name} - ${option.author}`}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => <TextField {...params} label="Người mượn" />}
              // onChange={(event, option) => setNewBook({...newBook, category: option._id})}
            />

            <Button type='submit' variant="contained">Tạo mới</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddRequestForm;