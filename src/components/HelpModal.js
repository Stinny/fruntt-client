import React from 'react';
import Modal from 'react-modal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiHelpCircle } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const HelpModal = ({ isOpen, handleCloseModal }) => {
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '800px',
    },
  };

  return (
    <div>
      <Modal
        style={modalStyles}
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
      >
        <div className='w-full p-2 relative'>
          <button className='absolute right-0 text-red-400 hover:text-red-600'>
            <AiOutlineCloseCircle
              className='text-2xl mb-2'
              onClick={handleCloseModal}
            />
          </button>
          <div className='w-full border-b-2 p-2'>
            <p className='text-4xl font-medium'>Getting started</p>
            <p className='text-gray-400 mt-2 font-medium text-lg'>
              Heres a few simple steps to get your storefront up and running!
            </p>
          </div>
          <div className='p-2'>
            <div className='w-full flex items-center'>
              <h2 className='w-full mt-4 text-lg'>
                You can always find this help box by clicking the help icon on
                the navbar: <BiHelpCircle />
              </h2>
            </div>

            <p className='font-medium mt-4 text-xl'>Steps:</p>

            <p className='text-lg mt-4'>
              <span className='font-medium'>1.</span> Before your storefront can
              take any orders, you must connect to a payment gateway in{' '}
              <Link
                to='/settings'
                className='font-medium border-b-2 border-slate-800'
              >
                settings
              </Link>
            </p>
            <p className='mt-4 text-lg'>
              <span className='font-medium'>2.</span> Go to{' '}
              <Link to='/dashboard/item'>
                <button className='text-sm font-medium text-white w-24 rounded-xl bg-slate-800'>
                  Item
                </button>
              </Link>{' '}
              tab for adding an item to your storefront like custom merch
            </p>
            <p className='mt-4 text-lg'>
              <span className='font-medium'>3.</span> Go to{' '}
              <Link to='/dashboard/design'>
                <button className='text-sm font-medium text-white w-24 rounded-xl bg-slate-800'>
                  Design
                </button>
              </Link>{' '}
              tab for easily designing your storefront to your liking
            </p>
            <p className='mt-4 text-lg'>
              <span className='font-medium'>4.</span> Go to{' '}
              <Link to='/dashboard/content'>
                <button className='text-sm font-medium text-white w-24 rounded-xl bg-slate-800'>
                  Content
                </button>
              </Link>{' '}
              tab to add other content to your storefront like a logo, customer
              questions and social links
            </p>
            <p className='mt-4 text-lg'>
              <span className='font-medium'>5.</span> Go to{' '}
              <Link to='/dashboard/orders'>
                <button className='text-sm font-medium text-white w-24 rounded-xl bg-slate-800'>
                  Orders
                </button>{' '}
                tab for order fulfillment and purchasing shipping labels
              </Link>{' '}
              and{' '}
              <Link to='/dashboard/customers'>
                <button className='text-sm font-medium text-white w-24 rounded-xl bg-slate-800'>
                  Customers
                </button>
              </Link>{' '}
              tab for viewing all customers and requesting reviews
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HelpModal;
