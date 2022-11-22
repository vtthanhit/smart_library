import React, { useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, IconButton, InputLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import { UserContext } from '../../../../contexts/UserContext';

const AddAdminModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    userState: { user, data, count, users, usersLoading },
		addUser,
		setShowToast,
    getAdmins,
    pagination,
    setPagination,
	} = useContext(UserContext)

  const [newUser, setNewUser] = useState({
    username: '',
    fullname: '',
    role: 'ADMIN'
  });
  const onChangeNewUser = event => setNewUser({
    ...newUser,
    [event.target.name]: event.target.value,
  });

  const onSubmit = async event => {
    event.preventDefault();
    const { success, message } = await addUser(newUser);
    if (success) {
      getAdmins(pagination.from, pagination.to)
      setPagination({...pagination, count: count + 1});
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    handleClose();
  }

  console.log("dsadsadsa" + newUser)

  return (
    <div>
      <Button onClick={handleOpen} className='bg-primary' variant="contained" startIcon={<AddIcon />}>
        Thêm mới
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <form onSubmit={onSubmit}>
          <DialogTitle>
            Thêm mới nhân viên
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
              Mã nhân viên
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='username'
              variant="outlined"
              placeholder='Mã nhân viên'
              fullWidth={true}
              size="small"
              required
            onChange={onChangeNewUser}
            />
            <InputLabel shrink>
              Họ tên nhân viên
            </InputLabel>
            <TextField
              id="outlined-basic"
              name='fullname'
              variant="outlined"
              placeholder='Họ tên nhân viên'
              fullWidth={true}
              size="small"
              onChange={onChangeNewUser}
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

export default AddAdminModal
