import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';

//mui
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useHideSectionsMutation } from '../../api/storefrontApiSlice';

const HideSections = ({ storefront, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [hideDescription, setHideDescription] = useState(
    storefront?.hideDescription
  );
  const [hideQuestions, setHideQuestions] = useState(storefront?.hideQuestions);
  const [hideReviews, setHideReviews] = useState(storefront?.hideReviews);

  const [hideSections, result] = useHideSectionsMutation();
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

  const handleSaveSections = async (e) => {
    e.preventDefault();

    try {
      const hideSectionsReq = await hideSections({
        storeId: storefront?._id,
        hideQuestions: hideQuestions,
        hideReviews: hideReviews,
        hideDescription: hideDescription,
      }).unwrap();

      console.log(hideSectionsReq);
      if (hideSectionsReq === 'Sections updated') {
        refetch();
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <form onSubmit={handleSaveSections}>
          <p className='text-xl font-medium mb-4 border-b'>Hide sections</p>
          <p className='text-stone-800'>Hide product description</p>
          <Switch
            checked={hideDescription}
            onChange={(e) => setHideDescription(e.target.checked)}
          />

          <p className='text-stone-800 mt-2'>Hide customer questions</p>
          <Switch
            checked={hideQuestions}
            onChange={(e) => setHideQuestions(e.target.checked)}
          />

          <p className='text-stone-800 mt-2'>Hide customer reviews</p>
          <Switch
            checked={hideReviews}
            onChange={(e) => setHideReviews(e.target.checked)}
          />

          <button
            type='button'
            onClick={closeModal}
            className='w-full h-10 border-2 border-red-500 text-red-400 hover:text-white hover:bg-red-400 rounded mt-4'
          >
            Cancel
          </button>
          <button
            type='submit'
            className='w-full h-14 border-2 border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 rounded mt-4'
          >
            Save
          </button>
        </form>
      </Modal>
      <div className='w-full'>
        <div className='w-full border-b p-2 flex justify-between items-center'>
          <p className='text-slate-800 font-medium text-xl'>Hide Sections</p>
          <button
            className='border-2 rounded w-20 h-8 border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
            onClick={openModal}
          >
            Edit
          </button>
        </div>

        <div className='flex flex-col pl-10'>
          <FormControlLabel
            label='Hide product description'
            control={<Switch checked={storefront?.hideDescription} disabled />}
            className='mt-2'
          />

          <FormControlLabel
            label='Hide customer questions'
            control={<Switch checked={storefront?.hideQuestions} disabled />}
            className='mt-2'
          />

          <FormControlLabel
            label='Hide customer reviews'
            control={<Switch checked={storefront?.hideReviews} disabled />}
            className='mt-2'
          />
        </div>
      </div>
    </>
  );
};

export default HideSections;
