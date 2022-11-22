import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, InputLabel, TextField, Autocomplete, TextareaAutosize, Button } from '@mui/material';
import { covertImageBase64 } from '../covertImageBase64';
import { CategoryContext } from '../../../../contexts/CategoryContext';
import { BookContext } from '../../../../contexts/BookContext';
import Loading from './../../Loading';

const UpdateBookForm = () => {
  const location = useLocation();
  const bookId = location.search.slice(4);

  const {
    bookState: { book, booksLoading },
    findBook,
    updateBook,
    setShowToast,
  } = useContext(BookContext);

  const {
    categoryState: { categories },
    getAllCategories,
  } = useContext(CategoryContext);
  
  const options = categories.map((category) => ({name: category.name, _id: category._id}));
  const [updateBookValue, setUpdateBookValue] = useState(null);

  useEffect(() => {
    findBook(bookId);
    getAllCategories();
  }, [bookId]);

  if (booksLoading) {
    return <Loading />
  }

  const onChangeUpdateBook = (event) => {
    setUpdateBookValue({
      ...updateBookValue,
      _id: book._id,
      [event.target.name]: event.target.value,
    });
  }

  const onFileChange = event => setUpdateBookValue({
    ...updateBookValue,
    _id: book._id,
    image: event.target.files[0],
  });
  
  const onSubmitUpdate = async (event) => {
    event.preventDefault();
    if (updateBookValue !== null) {
      const updateFormData = new FormData();
      if (updateBookValue.image) updateFormData.append('image', updateBookValue.image);
      if (updateBookValue.name) updateFormData.append('name', updateBookValue.name);
      if (updateBookValue.author) updateFormData.append('author', updateBookValue.author);
      if (updateBookValue.description) updateFormData.append('description', updateBookValue.description);
      if (updateBookValue.quantity) updateFormData.append('quantity', updateBookValue.quantity);
      if (updateBookValue.category) updateFormData.append('category', updateBookValue.category);
      if (updateBookValue.sku) updateFormData.append('sku', updateBookValue.sku);

      const { success, message } = await updateBook(updateFormData, updateBookValue._id);
      setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    }
    else {
      setShowToast({ open: true, message: 'Không có sự thay đổi của dữ liệu!', type: 'warning' });
    }
  }

  return (
    <div className='w-full bg-white p-5 shadow-my'>
      <div className='mb-4'>
        <h4>Cập nhật thông tin sách</h4>
      </div>
      <form onSubmit={onSubmitUpdate}>
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
              defaultValue={book.name}
              onChange={onChangeUpdateBook}
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
              value={book.category}
              isOptionEqualToValue={(option, value) => option._id === value._id}
              renderInput={(params) => <TextField {...params} label="Danh mục sách" />}
              onChange={(event, option) => setUpdateBookValue({...updateBookValue, category: option._id})}
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
              defaultValue={book.quantity}
              onChange={onChangeUpdateBook}
            />

            <div>
              <InputLabel shrink className='text-2xl'>
                Hình ảnh:
              </InputLabel>
              <div className='flex'>
                <img 
                  src={book.image 
                    ? `data:image/png;base64,${covertImageBase64(book.image.data.data)}`
                    : `https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png`
                  } 
                  width="150" 
                  className='rounded-lg shadow-my-2 mr-6'
                  />
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
              defaultValue={book.author}
              onChange={onChangeUpdateBook}
            />

            <InputLabel shrink className='text-2xl'>
              Mã sách:
            </InputLabel>
            <TextField
              name='sku'
              variant="outlined"
              placeholder='Nhập mã sách'
              size="small"
              required
              fullWidth
              className='mb-4'
              label="Mã sách"
              defaultValue={book.sku}
              onChange={onChangeUpdateBook}
            />

            <InputLabel shrink className='text-2xl'>
              Mô tả:
            </InputLabel>
            <TextareaAutosize
              minRows={4.5}
              name='description'
              placeholder="Nhập mô tả ngắn của sách"
              className='border-solid border-1 border-border-color2 rounded w-full px-4 py-2 text-black mb-4'
              defaultValue={book.description}
              onChange={onChangeUpdateBook}
            />

            <Button type='submit' variant="contained">Cập nhật</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default UpdateBookForm