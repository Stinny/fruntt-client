import Cookies from 'js-cookie';

const handleLogutUser = (navigate) => {
  Cookies.remove('currentUser');
  Cookies.remove('aToken');
  Cookies.remove('rToken');
  Cookies.remove('isAuth');
  navigate('/login');
};

export default handleLogutUser;
