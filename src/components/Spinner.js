import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Spinner = () => {
  return (
    <div className='container mx-auto flex items-center justify-center mt-20'>
      <CircularProgress />
    </div>
  );
};

export default Spinner;
