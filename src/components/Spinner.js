import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Spinner as FlowSpinner } from 'flowbite-react';

const Spinner = () => {
  return (
    <div className='mx-auto flex items-center justify-center h-screen'>
      <FlowSpinner />
    </div>
  );
};

export default Spinner;
