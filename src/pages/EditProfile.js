import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import { useGetUpdatedUserQuery } from '../api/authApiSlice';
import Spinner from '../components/Spinner';
import EditProfileDesktop from './Dashboard/EditProfileDesktop';

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
    content = <EditProfileDesktop user={user} />;
  }
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Topbar />
        <div className='w-9/12 mx-auto p-10 h-screen overflow-y-scroll'>
          {content}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
