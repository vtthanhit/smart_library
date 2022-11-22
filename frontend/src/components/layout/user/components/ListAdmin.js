import React, { useContext, useEffect, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputLabel, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Pagination from '@mui/material/Pagination';
import CloseIcon from '@mui/icons-material/Close';

import Loading from '../../Loading';
import { UserContext } from '../../../../contexts/UserContext';
import { PAGY_PAGE_SIZE } from '../../../../contexts/constants';

const ListAdmin = () => {
  const {
    userState: { count, users, usersLoading },
    getAdmins,
    deleteUser,
    updateUser,
    pagination,
    setPagination,
    setShowToast,
  } = useContext(UserContext);

  const [openDelete, setOpenDelete] = useState(false);
  const [userDelete, setUserDelete] = useState(null);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [userUpdate, setUserUpdate] = useState({});

  const handlePaginateChange = (event, page) => {
    const from = (page - 1) * PAGY_PAGE_SIZE;
    const to = (page - 1) * PAGY_PAGE_SIZE + PAGY_PAGE_SIZE;

    setPagination({ ...pagination, from, to });
  }

  useEffect(() => {
    setPagination({ ...pagination, count });
    getAdmins(pagination.from, pagination.to);
  }, [pagination.from, pagination.to, count]);

  if (usersLoading) {
    return <Loading />
  }
  const handleDeleteUser = async () => {
    const { success, message } = await deleteUser(userDelete);
    if (success) {
      setPagination({...pagination, count: count - 1});
      getAdmins(pagination.from, pagination.to);
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenDelete(false);
    setUserDelete(null);
  }

  const onChangeUpdateUser = event => {
    setUserUpdate({...userUpdate, [event.target.name]: event.target.value});
  }

  const onSubmitUpdateUser = async event => {
    event.preventDefault();
    const { success, message } = await updateUser(userUpdate);
    if (success) {
      getAdmins(pagination.from, pagination.to)
      setPagination({...pagination, count: count + 1});
    }
    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    setOpenUpdate(false);
  }

  return (
    <div className='bg-white bg-clip-padding shadow-my relative flex flex-col min-w-0 break-words border-border-color rounded-lg'>
      <h5 className='rounded-t-lg p-6 mb-0'>Danh sách nhân viên</h5>
      <div className='p-6 pt-0 flex-auto'>
        <div className='whitespace-nowrap overflow-x-auto'>
          <table className='mb-0'>
            <thead className='border-b-2 border-solid border-border-color'>
              <tr>
                <th>STT</th>
                <th>Mã nhân viên</th>
                <th>Tên nhân viên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user, index) => {
                  return (
                    <tr key={user._id}>
                      <td>#{(index + 1 + pagination.from) }</td>
                      <td>{user.username}</td>
                      <td>{user.fullname ? user.fullname : "Chưa đặt tên, vui lòng cập nhật!"}</td>
                      <td className='max-w-0'>
                        <Button onClick={() => {setOpenDelete(true); setUserDelete(user._id)}} className='mr-2' size="small" color="error" variant="contained" startIcon={<DeleteIcon />}>
                          Xóa
                        </Button>
                        <Button onClick={() => {setOpenUpdate(true); setUserUpdate(user)}} size="small" color="info" variant="contained" startIcon={<ModeEditOutlineIcon />}>
                          Cập nhật
                        </Button>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>

          </table>
          {/* dialog confirm delete */}
          <Dialog open={openDelete} onClose={() => { setOpenDelete(false); setUserDelete(null) }}>
            <DialogTitle id="alert-dialog-title">Xác nhận xóa nhân viên?</DialogTitle>
            <DialogActions>
              <Button onClick={() => { setOpenDelete(false); setUserDelete(null) }}>Trở về</Button>
              <Button onClick={() => { handleDeleteUser() }} autoFocus>Đồng ý</Button>
            </DialogActions>
          </Dialog>

          {/* dialog update */}
          <div>
            <Dialog open={openUpdate} onClose={() => {setOpenUpdate(false)}} fullWidth={true}>
              <form onSubmit={onSubmitUpdateUser}>
                <DialogTitle>
                  Cập nhật nhân viên!
                  <IconButton
                  aria-label="close"
                  onClick={() => {setOpenUpdate(false)}}
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
                    value={userUpdate.username}
                    required
                    onChange={onChangeUpdateUser}
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
                    value={userUpdate.fullname}
                    onChange={onChangeUpdateUser}
                  />
                  <InputLabel shrink>
                    Mật khẩu (mật định là: Abcd1234)
                  </InputLabel>
                  <TextField
                    id="outlined-basic"
                    name='password'
                    type='password'
                    variant="outlined"
                    placeholder='&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;'
                    fullWidth={true}
                    size="small"
                    onChange={onChangeUpdateUser}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {setOpenUpdate(false)}}>Hủy</Button>
                  <Button type='submit'>Cập nhật</Button>
                </DialogActions>
              </form>
            </Dialog>
          </div>

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

export default ListAdmin;
