import React, { useContext, useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, IconButton, DialogContent, InputLabel, TextField, DialogActions, Autocomplete, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

import { RequestContext } from './../../../../contexts/RequestContext';
import { BookContext } from '../../../../contexts/BookContext';

const AddRequestModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const {
  //   categoryState: { category, data, count, categories, categoriesLoading },
	// 	addCategory,
	// 	setShowToast,
  //   getCategories,
  //   pagination,
  //   setPagination,
	// } = useContext(RequestContext)

  const {
    bookState: { books },
    getAllBooks,
  } = useContext(BookContext);

  // const [newCategory, setNewCategory] = useState({
  //   name: '',
  // });
  // const onChangeNewCategory = event => setNewCategory({
  //   ...newCategory,
  //   [event.target.name]: event.target.value,
  // });

  // const onSubmit = async event => {
  //   event.preventDefault();
  //   const { success, message } = await addCategory(newCategory);
  //   if (success) {
  //     getCategories(pagination.from, pagination.to)
  //     setPagination({...pagination, count: count + 1});
  //   }
  //   setShowToast({ open: true, message, type: success ? 'success' : 'error' });
  //   handleClose();
  // }

  const options = books.map((book) => ({name: book.name, author: book.author, _id: book._id}));
  useEffect(() => {
    getAllBooks();
  }, []);

  const divGridAdd = 
    <Grid container spacing={2} mb={1}>
      <Grid item xs={8} md={8}>
        <InputLabel shrink className='text-2xl'>
          Tên sách
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
          renderInput={(params) => <TextField {...params} label="Tên sách" />}
          // onChange={(event, option) => setNewBook({...newBook, category: option._id})}
        />
      </Grid>
      <Grid item xs={4} md={4}>
        <InputLabel shrink>
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
    </Grid>

  const [grid, setGrid] = useState([divGridAdd])

  const handleAddGridBook = () => {
    setGrid([...grid,
      divGridAdd
    ])
  }

  return (
    <div>
      <Button onClick={handleOpen} className='bg-primary' variant="contained" startIcon={<AddIcon />}>
        Tạo yêu cầu
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <form>
          <DialogTitle>
            Tạo mới yêu cầu
            <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            { grid }
          </DialogContent>
          <DialogActions>
            <IconButton
              aria-label="add"
              onClick={handleAddGridBook}
              >
              <AddIcon />
            </IconButton>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type='submit'>Tạo mới</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default AddRequestModal