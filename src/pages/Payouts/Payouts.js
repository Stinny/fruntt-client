import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Topbar from '../../components/Topbar';
import { isMobile } from 'react-device-detect';
import Desktop from './Desktop';
import {
  useGetPayoutsQuery,
  useLazyGetBalanceQuery,
} from '../../api/payoutsApiSlice';
import { Spinner } from 'flowbite-react';
import Cookies from 'js-cookie';

const Payouts = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const { data: payouts, isLoading, isSuccess, refetch } = useGetPayoutsQuery();
  const [
    getBalance,
    {
      data: balance,
      isLoading: gettingBalance,
      isSuccess: gotBalance,
      refetch: getBalanceAgain,
    },
  ] = useLazyGetBalanceQuery();

  useEffect(() => {
    const fetchBalance = async () => await getBalance();

    if (currentUser?.bankAdded) {
      fetchBalance();
    }
  }, []);

  const styles = isMobile
    ? 'w-full mx-auto h-screen bg-white mt-16'
    : 'w-full mx-auto h-screen overflow-auto bg-white ml-2';

  let content;

  if (isLoading || gettingBalance) {
    content = (
      <div
        className='w-full flex items-center justify-center border border-gray-200 rounded-md'
        style={{ height: '600px' }}
      >
        <Spinner />
      </div>
    );
  } else if (isSuccess) {
    content = isMobile ? '' : <Desktop payouts={payouts} balance={balance} />;
  }

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
