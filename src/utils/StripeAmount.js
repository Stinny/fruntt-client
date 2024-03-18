import React from 'react';

const StripeAmount = ({ amount }) => {
  // Convert cents to dollars
  const amountInDollars = amount / 100;

  // Format the amount using Intl.NumberFormat
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD', // Adjust currency as needed
  }).format(amountInDollars);

  return <span>{formattedAmount}</span>;
};

export default StripeAmount;
