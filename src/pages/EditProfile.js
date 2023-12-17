import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import { useGetUpdatedUserQuery } from '../api/authApiSlice';
import Spinner from '../components/Spinner';
import EditProfileDesktop from './Dashboard/EditProfileDesktop';
import { isMobile } from 'react-device-detect';
import EditProfileMobile from './Mobile/EditProfileMobile';

const EditProfile = () => {
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useGetUpdatedUserQuery();

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile ? (
      <EditProfileMobile user={user} />
    ) : (
      <EditProfileDesktop user={user} />
    );
  }

  const styles = isMobile
    ? 'w-full mx-auto p-2 h-fit mt-16'
    : 'w-10/12 mx-auto p-20 h-screen overflow-y-scroll';

  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
