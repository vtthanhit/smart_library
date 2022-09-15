import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <div className='fixed top-1/2 left-1/2'>
      <CircularProgress />
    </div>
  )
}

export default Loading;
