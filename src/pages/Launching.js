import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//mui
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Launching = () => {
  const [progress, setProgress] = React.useState(58);
  const navigate = useNavigate();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  React.useEffect(() => {
    if (progress >= 100) navigate('/dashboard');
  }, [progress]);

  return (
    <div className='h-screen w-full mx-auto'>
      <div className='mx-auto flex flex-col justify-center items-center h-full'>
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            color='inherit'
            variant='determinate'
            value={progress}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant='caption'
              component='div'
              color='text.secondary'
            >
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
        <p className='mt-4 text-xl font-medium'>Your store is launching...</p>
        <p className='text-stone-800 mt-2'>This will only take a minute</p>
      </div>
    </div>
  );
};

export default Launching;
