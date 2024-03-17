import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';

const Payouts = () => {
  const styles = isMobile
    ? 'w-full mx-auto h-screen bg-white mt-16'
    : 'w-full mx-auto h-screen overflow-auto bg-white ml-2';

  let content;

  content = isMobile ? '' : <Desktop />;

  return (
    <>
      <Navbar />
      <div className='flex max-w-6xl mx-auto'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default Payouts;
