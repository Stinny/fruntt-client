import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';

const Newsletters = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl h-screen mx-auto'>Newsletters</div>
      <Footer />
    </>
  );
};

export default Newsletters;
