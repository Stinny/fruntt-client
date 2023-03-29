import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import {
  useAddFAQMutation,
  useGetProductsQuery,
  useDeleteFAQMutation,
} from '../../api/productsApiSlice';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import Cookies from 'js-cookie';
import Spinner from '../Spinner';

const FAQs = ({ currentUser, item, refetch, isLoading, isSuccess }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  //form state
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const [addFAQ, result] = useAddFAQMutation();
  const [deleteFAQ, { result: deleteFAQRes }] = useDeleteFAQMutation();

  const handleAddFAQ = async (e) => {
    e.preventDefault();

    //only if item was retrieved successfully
    if (isSuccess) {
      try {
        const addFAQReq = await addFAQ({
          productId: item[0]?._id,
          question: question,
          answer: answer,
        }).unwrap();

        if (addFAQReq === 'FAQ added') {
          refetch();
          closeModal();
        }
      } catch (err) {
        closeModal();
        return;
      }
    }
  };

  const handleDeleteFAQ = async (faqId) => {
    try {
      const deleteFAQReq = await deleteFAQ({
        productId: item[0]?._id,
        faqId: faqId,
      }).unwrap();

      if (deleteFAQReq === 'FAQ deleted') {
        refetch();
      }
    } catch (err) {
      refetch();
      return;
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalStyles = isMobile
    ? {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
        },
      }
    : {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
        },
      };

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <div className='w-full mx-auto'>
            <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
              Add a frequently asked question
            </p>
            <form>
              <p>Question</p>
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
                placeholder='Enter question'
                onChange={(e) => setQuestion(e.target.value)}
              />
              <p className='mt-2'>Answer</p>
              <textarea
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
                placeholder='Enter answer'
                onChange={(e) => setAnswer(e.target.value)}
              />
            </form>

            <button
              onClick={handleAddFAQ}
              className='h-14 w-full border-stone-800 border-2 rounded mt-2 hover:bg-stone-800 hover:text-white'
            >
              + Add FAQ
            </button>

            <button
              onClick={closeModal}
              className='h-10 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
              type='button'
            >
              Cancel
            </button>
          </div>
        </Modal>

        {isMobile ? (
          <div className='mb-4'>
            <div className='w-full flex justify-between items-center p-2 border-b'>
              <p className='text-slate-800 font-medium text-xl'>
                Customer questions
              </p>
              {item.length ? (
                <button
                  className='border-2 rounded w-16 h-8 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800'
                  onClick={openModal}
                >
                  + Add
                </button>
              ) : (
                ''
              )}
            </div>

            {item?.length ? (
              <div className='p-2'>
                {item[0]?.faqs?.length ? (
                  <div className='w-full flex flex-col'>
                    {item[0].faqs.map((faq) => (
                      <div className='flex flex-col border-2 rounded p-2 mb-2 relative'>
                        <p>
                          <span className='font-medium'>Question:</span>{' '}
                          {faq.question}
                        </p>
                        <p className='mt-2'>
                          <span className='font-medium'>Answer:</span>{' '}
                          {faq.answer}
                        </p>
                        <button
                          onClick={(e) => handleDeleteFAQ(faq._id)}
                          className='absolute right-0 mr-2 text-red-400 hover:text-red-600'
                          type='button'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
                    <p className='text-slate-800 text-xl font-medium text-center'>
                      You have not added any customer questions
                    </p>
                    <p className='text-gray-400 text-center mt-2'>
                      These questions are visible on your page for customers to
                      read. They should relate to whatever product you are
                      offering.
                    </p>
                    <button
                      type='button'
                      className='border-2 border-slate-800 rounded text-slate-800 hover:bg-slate-800 hover:text-white w-32 h-10 mt-2'
                      onClick={openModal}
                    >
                      + Add question
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='p-4'>
                <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
                  <p className='text-slate-800 text-lg font-medium'>
                    You have not added a product yet
                  </p>

                  <Link
                    to='/dashboard/item'
                    className='border-stone-800 border-2 p-2 rounded text-sm mt-2'
                  >
                    + Add product
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className=' mb-4'>
            <div className='w-full flex justify-between items-center border-b p-2'>
              <p className='text-slate-800 font-medium text-xl'>
                Customer questions
              </p>
              {item.length ? (
                <button
                  className='border-2 rounded w-20 h-8 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
                  onClick={openModal}
                >
                  + Add
                </button>
              ) : (
                ''
              )}
            </div>

            {item?.length ? (
              <div className='p-4'>
                {item[0]?.faqs?.length ? (
                  <div className='w-full flex flex-col'>
                    {item[0].faqs.map((faq) => (
                      <div className='flex flex-col border-2 rounded p-2 mb-2 relative'>
                        <p>
                          <span className='font-medium'>Question:</span>{' '}
                          {faq.question}
                        </p>
                        <p className='mt-2'>
                          <span className='font-medium'>Answer:</span>{' '}
                          {faq.answer}
                        </p>
                        <button
                          onClick={(e) => handleDeleteFAQ(faq._id)}
                          className='absolute right-0 mr-2 text-red-400 hover:text-red-600'
                          type='button'
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
                    <p className='text-slate-800 text-xl font-medium'>
                      You have not added any customer questions
                    </p>
                    <p className='text-gray-400 w-7/12 text-center mt-2'>
                      These questions are visible on your storefront for
                      customers to read. They should relate to whatever product
                      you are offering.
                    </p>
                    <button
                      type='button'
                      className='border-2 border-slate-800 rounded text-slate-800 hover:bg-slate-800 hover:text-white w-32 h-10 mt-2'
                      onClick={openModal}
                    >
                      + Add question
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className='p-4'>
                <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
                  <p className='text-slate-800 text-lg font-medium'>
                    You have not added a product yet
                  </p>
                  <Link
                    to='/dashboard/item'
                    className='border-stone-800 border-2 p-2 rounded text-sm mt-2'
                  >
                    + Add product
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  return content;
};

export default FAQs;
