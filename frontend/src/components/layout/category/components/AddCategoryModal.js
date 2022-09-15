import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { CategoryContext } from '../../../../contexts/CategoryContext';

const AddCategoryModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    categoryState: { category, count, categories, categoriesLoading },
		addCategory,
		setShowToast,
    getCategories,
    pagination,
    setPagination,
	} = useContext(CategoryContext)

  const [newCategory, setNewCategory] = useState({
    name: '',
  });
  const onChangeNewCategory = event => setNewCategory({
    ...newCategory,
    [event.target.name]: event.target.value,
  });

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await addCategory(newCategory);
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    handleClose();
  }

  return (
    <div>
      <Button onClick={handleOpen} className='bg-primary' variant="contained" startIcon={<AddIcon />}>
        Thêm mới
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <form onSubmit={onSubmit}>
          <DialogTitle>
            Thêm mới danh mục
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
            <InputLabel shrink>
              Tên danh mục
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='name'
              variant="outlined"
              placeholder='Tên danh mục'
              fullWidth={true}
              size="small"
              required
              onChange={onChangeNewCategory}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button type='submit'>Tạo mới</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>

  )
}

export default AddCategoryModal
