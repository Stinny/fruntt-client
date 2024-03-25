import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Topbar from '../components/Topbar';
import Payments from '../components/Settings/Payments';
import Profile from '../components/Settings/Profile';
import Cookies from 'js-cookie';
import { useGetUpdatedUserQuery } from '../api/authApiSlice';
import Spinner from '../components/Spinner';
import Notifications from '../components/Settings/Notifications';
import { isMobile } from 'react-device-detect';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Page from '../components/Settings/Page';
import Setup from '../components/Settings/Setup';

const Settings = () => {
  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    refetch,
  } = useGetUpdatedUserQuery();

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    const updatedUser = JSON.stringify(user);
    Cookies.set('currentUser', updatedUser, { sameSite: 'Lax' });
    content = user?.setup ? (
      <Tabs>
        <TabList>
          <Tab>Account</Tab>
          <Tab>Notifications</Tab>
          <Tab>Page</Tab>
          <Tab>Payments</Tab>
        </TabList>

        <TabPanel>
          <Profile user={user} refetch={refetch} isFetching={isFetching} />
        </TabPanel>

        <TabPanel>
          <Notifications
            user={user}
            refetch={refetch}
            isFetching={isFetching}
          />
        </TabPanel>

        <TabPanel>
          <Page user={user} refetch={refetch} isFetching={isFetching} />
        </TabPanel>

        <TabPanel>
          <Payments refetch={refetch} />
        </TabPanel>
      </Tabs>
    ) : (
      <Setup refetch={refetch} />
    );
  }
  const styles = isMobile
    ? 'w-full mx-auto p-2 bg-gray-50 h-fit mt-16'
    : 'w-full mx-auto bg-white h-screen ml-2';

  return (
    <>
      <Navbar />
      <div className='flex mx-auto max-w-6xl'>
        <Topbar />
        <div className={styles}>{content}</div>
      </div>
      <Footer />
    </>
  );
};

export default Settings;
