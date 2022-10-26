import React from 'react';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const SalesGraph = () => {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Sales',
        backgroundColor: '#000000',
        borderColor: '#000000',
        data: [0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };

  return (
    <div className='w-full h-3/6'>
      <Bar data={data} className='h-3/6' />
    </div>
  );
};

export default SalesGraph;
