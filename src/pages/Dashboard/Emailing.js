import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import { Navigate } from 'react-router-dom';
import Footer from '../../components/Footer';

const Emailing = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto'>
        <div>Emailing for your store will go here</div>
      </div>
      <Footer />
    </>
  );
};

export default Emailing;
