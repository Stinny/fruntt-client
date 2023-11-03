import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useGetMarketProductsQuery } from '../api/productsApiSlice';
import Spinner from '../components/Spinner';
import Desktop from '../components/Marketplace/Desktop';
import Cookies from 'js-cookie';
import Mobile from '../components/Marketplace/Mobile';

const Marketplace = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [filter, setFilter] = useState('all');

  const {
    data: products,
    isLoading,
    isSuccess,
    refetch,
  } = useGetMarketProductsQuery({ filter });

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    refetch();
  }, [filter]);

  const marketClass = currentUser
    ? `max-w-7xl mx-auto h-fit mt-2`
    : `max-w-7xl mx-auto h-fit mt-24`;

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <Mobile
        products={products}
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
    ) : (
      <Desktop
        products={products}
        handleFilterChange={handleFilterChange}
        filter={filter}
      />
    );
  }

  return (
    <>
      <Navbar />
      <div className={marketClass}>{content}</div>
      <Footer />
    </>
  );
};

export default Marketplace;
