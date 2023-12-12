import React, { useEffect, useState } from 'react';
import {
  useGetSingleOrderQuery,
  useGetShippingRatesQuery,
} from '../../api/ordersApiSlice';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Footer from '../../components/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import { useFulfillOrderMutation } from '../../api/ordersApiSlice';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import moment from 'moment';
import Modal from 'react-modal';
import { BsArrowLeftShort } from 'react-icons/bs';
import ShippingAddress from '../../components/OrderDetail/ShippingAddress';
import LabelModal from '../../components/OrderDetail/LabelModal';
import FulfillModal from '../../components/OrderDetail/FulfillModal';
import { FiDownload } from 'react-icons/fi';
import FromAddress from '../../components/OrderDetail/FromAddress';
import OrderDetailMobile from '../Mobile/Dashboard/OrderDetailMobile';
import { isMobile } from 'react-device-detect';
import { FaExternalLinkAlt } from 'react-icons/fa';
import DigitalDetail from '../../components/OrderDetail/DigitalDetail';

const OrderDetail = () => {
  const { orderId } = useParams();

  //gets the order
  const {
    data: order,
    isLoading,
    isSuccess,
    refetch,
  } = useGetSingleOrderQuery({
    orderId,
  });

  //gets the shipping rates
  const {
    data: rates,
    isLoading: gettingRates,
    isSuccess: gotRates,
    refetch: refetchRates,
  } = useGetShippingRatesQuery({
    orderId,
  });

  const [labelModaIsOpen, setLabelModalIsOpen] = useState(false);
  const [fulfillModalIsOpen, setFulfillModalIsOpen] = useState(false);

  function openLabelModal() {
    setLabelModalIsOpen(true);
  }

  function closeLabelModal() {
    setLabelModalIsOpen(false);
  }

  function openFulfillModal() {
    setFulfillModalIsOpen(true);
  }

  function closeFulfillModal() {
    setFulfillModalIsOpen(false);
  }

  useEffect(() => {
    refetch();
  }, []);

  let content;
  if (isLoading || gettingRates) {
    content = <Spinner />;
  } else if (isSuccess && gotRates) {
    content = isMobile ? (
      <OrderDetailMobile
        order={order}
        closeFulfillModal={closeFulfillModal}
        openFulfillModal={openFulfillModal}
        closeLabelModal={closeLabelModal}
        openLabelModal={openLabelModal}
        rates={rates}
        refetch={refetch}
        refetchRates={refetchRates}
        labelModaIsOpen={labelModaIsOpen}
        fulfillModalIsOpen={fulfillModalIsOpen}
      />
    ) : (
      <DigitalDetail order={order} />
    );
  }

  const styles = isMobile
    ? 'w-full mx-auto h-fit p-2 bg-gray-50'
    : 'w-9/12 mx-auto h-screen p-10 bg-gray-50';

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

export default OrderDetail;
