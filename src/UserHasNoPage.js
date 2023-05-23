import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserHasNoPage = () => {
  const location = useLocation();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  let content;

  if (currentUser?.storeIds.length > 0) {
    content = <Outlet />;
  } else {
    content = <Navigate to='/home' />;
  }

  return content;
};

export default UserHasNoPage;
