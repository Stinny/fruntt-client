import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';

const Customization = () => {
  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto'>
        <div>Customization</div>
      </div>
      <Footer />
    </>
  );
};

export default Customization;
