import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const RequireSubscription = () => {
  const location = useLocation();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  let content;

  if (!currentUser.trial || currentUser.subscribed) {
    content = <Outlet />;
  } else {
    content = <Navigate to='/dashboard/plans' />;
  }

  return content;
};

export default RequireSubscription;
