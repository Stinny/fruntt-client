import React from 'react';

//mui
import Chip from '@mui/material/Chip';

const AliOptions = ({ options }) => {
  return (
    <div>
      {options.length > 0 ? (
        options.map((opt, optIndex) => (
          <div className='w-full flex flex-col bg-gray-100 p-2 relative mt-2'>
            <p className='text-xl'>{opt?.name}</p>
            <div className='w-full flex flex-wrap mt-2'>
              {opt?.values.map((value) => (
                <Chip label={value.name} className='ml-2 mt-2' />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='w-full flex flex-col items-center justify-center h-18 p-2 rounded bg-gray-100 mt-2'>
          <p className='text-lg font-medium'>No options added</p>
          <p>Add options like size or color</p>
        </div>
      )}
    </div>
  );
};

export default AliOptions;
