import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';

const Marketing = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl h-screen mx-auto'>Marketing</div>
      <Footer />
    </>
  );
};

export default Marketing;
