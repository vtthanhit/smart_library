import React, { useContext, useState } from 'react'
import { Grid, InputLabel, TextField, Button } from '@mui/material';

import { AuthContext } from '../../../../contexts/AuthContext';

const Profile = () => {
  const {
		authState: { user },
    updateProfile,
    setShowToast,
	} = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    fullname: user.fullname,
    password: '',
    confirm_password: '',
  });

  const handleChangeProfile = (event) => {
    setProfileData({...profileData, [event.target.name]: event.target.value});
  }

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const { success, message } = await updateProfile(profileData);

    setShowToast({ open: true, message, type: success ? 'success' : 'error' });
    if (success) {
      setProfileData({
        password: '',
        confirm_password: '',
      });
    }
  }

  return (
    <div className='w-full bg-white p-5 shadow-my'>
      <div className='mb-4'>
        <h4>Thông tin tài khoản</h4>
      </div>
      <form onSubmit={handleUpdateProfile}>
        <Grid container>
          <Grid item xs={6} md={6} className='pr-4'>
            <InputLabel shrink className='text-2xl'>
              Mã sinh viên:
            </InputLabel>
            <TextField
              disabled
              name='username'
              variant="outlined"
              size="small"
              fullWidth
              className='mb-4'
              defaultValue={user.username}
            />
            <InputLabel shrink className='text-2xl'>
              Tên đầy đủ:
            </InputLabel>
            <TextField
              name='fullname'
              variant="outlined"
              placeholder='Nhập họ tên'
              size="small"
              fullWidth
              label="Họ và tên"
              className='mb-4'
              defaultValue={user.fullname}
              onChange={handleChangeProfile}
            />
            <InputLabel shrink className='text-2xl'>
              Mật khẩu:
            </InputLabel>
            <TextField
              name='password'
              variant="outlined"
              placeholder='Nhập mật khẩu'
              size="small"
              fullWidth
              label="Mật khẩu"
              type='password'
              className='mb-4'
              value={profileData.password}
              onChange={handleChangeProfile}
            />
            <InputLabel shrink className='text-2xl'>
              Xác nhận mật khẩu:
            </InputLabel>
            <TextField
              name='confirm_password'
              variant="outlined"
              placeholder='Nhập lại mật khẩu'
              size="small"
              fullWidth
              label="Xác nhận mật khẩu"
              className='mb-4'
              type='password'
              value={profileData.confirm_password}
              onChange={handleChangeProfile}
            />
          </Grid>
          <Grid item xs={6} md={6} className='pr-4'>
            <InputLabel shrink className='text-2xl'>
              Lớp:
            </InputLabel>
            <TextField
              disabled
              name='classname'
              variant="outlined"
              size="small"
              fullWidth
              className='mb-4'
              defaultValue={user.classname}
            />
            <InputLabel shrink className='text-2xl'>
              Email:
            </InputLabel>
            <TextField
              name='email'
              variant="outlined"
              size="small"
              fullWidth
              placeholder='Nhập email'
              label="Email"
              className='mb-4'
              defaultValue={user.email}
              onChange={handleChangeProfile}
            />
            <Button className='mt-8' type='submit' variant="contained">Cập nhật tài khoản</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default Profile