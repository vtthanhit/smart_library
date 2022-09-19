import { Grid, Autocomplete, InputLabel, TextField, TextareaAutosize, Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'

import { CategoryContext } from '../../../../contexts/CategoryContext';
import { BookContext } from '../../../../contexts/BookContext';

const AddBookForm = () => {
  const {
    categoryState: { categories },
    getAllCategories,
  } = useContext(CategoryContext);

  const {
    setShowToast,
    addBook,
  } = useContext(BookContext);

  const [newBook, setNewBook] = useState({
    name: '',
    author: '',
    description: '',
    quantity: '',
    category: '',
    image: '',
  });

  const options = categories.map((category) => ({name: category.name, _id: category._id}))

  const onChangeNewBook = event => setNewBook({
    ...newBook,
    [event.target.name]: event.target.value,
  });

  const onFileChange = event => setNewBook({
    ...newBook,
    image: event.target.files[0],
  });

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const addBookFormData = new FormData();
    addBookFormData.append('image', newBook.image)
    addBookFormData.append('name', newBook.name)
    addBookFormData.append('author', newBook.author)
    addBookFormData.append('description', newBook.description)
    addBookFormData.append('quantity', newBook.quantity)
    addBookFormData.append('category', newBook.category)

    const { success, message } = await addBook(addBookFormData);
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setNewBook({
      name: '',
      author: '',
      description: '',
      quantity: '',
      category: '',
      image: '',
    });
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  return (
    <div className='w-full bg-white p-5 shadow-my'>
      <div className='mb-4'>
        <h4>Thêm mới sách</h4>
      </div>
      <form onSubmit={onSubmitForm}>
        <Grid container>
          <Grid item xs={6} md={6} className='pr-4'>
            <InputLabel shrink className='text-2xl'>
              Tên sách:
            </InputLabel>
            <TextField
              name='name'
              variant="outlined"
              placeholder='Nhập tên sách'
              size="small"
              required
              fullWidth
              label="Tên sách"
              className='mb-4'
              onChange={onChangeNewBook}
            />

            <InputLabel shrink className='text-2xl'>
              Danh mục:
            </InputLabel>
            <Autocomplete
              disablePortal
              name='category'
              size='small'
              className='w-full mb-4'
              required
              options={options}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => <TextField {...params} label="Danh mục sách" />}
              onChange={(event, option) => setNewBook({...newBook, category: option._id})}
            />

            <InputLabel shrink className='text-2xl'>
              Số lượng:
            </InputLabel>
            <TextField
              name='quantity'
              variant="outlined"
              placeholder='Nhập số lượng sách'
              size="small"
              required
              fullWidth
              label="Số lượng sách"
              className='mb-4'
              onChange={onChangeNewBook}
            />

            <div>
              <InputLabel shrink className='text-2xl'>
                Hình ảnh:
              </InputLabel>
              <label className='w-full'>
                <input type="file" className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-primary
                  hover:file:bg-violet-100 hover:file:cursor-pointer
                "
                  onChange={onFileChange}
                />
              </label>
            </div>
          </Grid>
          <Grid item xs={6} md={6}>
            <InputLabel shrink className='text-2xl'>
              Tác giả:
            </InputLabel>
            <TextField
              name='author'
              variant="outlined"
              placeholder='Nhập tên tác giả'
              size="small"
              required
              fullWidth
              className='mb-4'
              label="Tên tác giả"
              onChange={onChangeNewBook}
            />

            <InputLabel shrink className='text-2xl'>
              Mô tả:
            </InputLabel>
            <TextareaAutosize
              minRows={4.5}
              name='description'
              placeholder="Nhập mô tả ngắn của sách"
              className='border-solid border-1 border-border-color2 rounded w-full px-4 py-2 text-black mb-4'
              onChange={onChangeNewBook}
            />

            <Button type='submit' variant="contained">Tạo mới</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddBookForm
