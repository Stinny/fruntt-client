import React, { useState } from 'react';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from 'react-icons/ai';
import Modal from 'react-modal';
import { useAddSocialsMutation } from '../../api/storefrontApiSlice';

const AddSocials = ({ storefront, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [addSocials, result] = useAddSocialsMutation();

  //form state
  const [facebook, setFacebook] = useState(storefront.links.facebook);
  const [youtube, setYoutube] = useState(storefront.links.youtube);
  const [twitter, setTwitter] = useState(storefront.links.twitter);
  const [instagram, setInstagram] = useState(storefront.links.instagram);

  const handleAddSocials = async (e) => {
    e.preventDefault();
    try {
      const addSocialsReq = await addSocials({
        storeId: storefront._id,
        facebook,
        youtube,
        twitter,
        instagram,
      }).unwrap();
      console.log(addSocialsReq);
      if (addSocialsReq === 'Links added') {
        refetch();
        closeModal();
      }
    } catch (err) {
      closeModal();
      return;
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
    },
  };
  return (
    <div className='mb-4 border-b'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div>
          <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
            Add social links
          </p>
          <form className='p-2'>
            <div className='w-full flex justify-between items-center'>
              <AiOutlineFacebook className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
                placeholder='Enter Facebook link'
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineInstagram className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
                placeholder='Enter Instagram link'
                onChange={(e) => setInstagram(e.target.value)}
                value={instagram}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineYoutube className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
                placeholder='Enter Youtube link'
                onChange={(e) => setYoutube(e.target.value)}
                value={youtube}
              />
            </div>

            <div className='w-full flex justify-between items-center mt-2'>
              <AiOutlineTwitter className='text-4xl' />
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
                placeholder='Enter Twitter link'
                onChange={(e) => setTwitter(e.target.value)}
                value={twitter}
              />
            </div>

            <button
              onClick={handleAddSocials}
              className='h-14 w-full border-slate-800 border-2 rounded mt-2 hover:bg-slate-800 hover:text-white'
            >
              Save
            </button>

            <button
              onClick={closeModal}
              className='h-10 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
              type='button'
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>

      <div className='w-full flex justify-between items-center'>
        <div className='flex flex-col'>
          <p className='text-slate-800 font-medium text-xl'>Social Links</p>
          <p className='text-gray-400 text-sm'>
            Social links appear in the footer of your storefront and only when a
            link is provided
          </p>
        </div>
        <button
          className='border-2 rounded w-20 h-8 border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white'
          onClick={openModal}
        >
          Edit
        </button>
      </div>

      <div className='p-4'>
        <div className='w-full flex justify-between items-center'>
          <AiOutlineFacebook className='text-4xl' />
          <input
            type='text'
            className='border-2 border-gray-300  outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
            placeholder='You have not added a Facebook link'
            value={storefront.links.facebook}
            disabled
          />
        </div>

        <div className='w-full flex justify-between items-center mt-2'>
          <AiOutlineInstagram className='text-4xl' />
          <input
            type='text'
            className='border-2 border-gray-300  outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
            placeholder='You have not added a Instagram link'
            value={storefront.links.instagram}
            disabled
          />
        </div>

        <div className='w-full flex justify-between items-center mt-2'>
          <AiOutlineYoutube className='text-4xl' />
          <input
            type='text'
            className='border-2 border-gray-300  outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
            placeholder='You have not added a Youtube link'
            value={storefront.links.youtube}
            disabled
          />
        </div>

        <div className='w-full flex justify-between items-center mt-2'>
          <AiOutlineTwitter className='text-4xl' />
          <input
            type='text'
            className='border-2 border-gray-300  outline outline-0 focus:border-gray-400 w-10/12 rounded-lg p-2'
            placeholder='You have not added a Twitter link'
            value={storefront.links.twitter}
            disabled
          />
        </div>
      </div>
    </div>
  );
};

export default AddSocials;
