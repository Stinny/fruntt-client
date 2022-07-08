import React from 'react';
import { Link } from 'react-router-dom';

const Billing = () => {
  return (
    <div className='flex justify-center items-center w-full h-40'>
      <Link to='/dashboard/plans'>
        <button className='h-20 w-40 rounded border-2 border-gray-400 text-gray-400'>
          View Plans
        </button>
      </Link>
    </div>
  );
};

export default Billing;
