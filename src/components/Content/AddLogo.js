import React, { useState } from 'react';
import Modal from 'react-modal';
import { uploadImageRequest } from '../../api/requests';
import {
  useAddLogoMutation,
  useDeleteLogoMutation,
} from '../../api/storefrontApiSlice';

//filepond
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const AddLogo = ({ storefront, refetch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [logoFile, setLogoFile] = useState([]);
  const [name, setName] = useState(storefront?.name);

  const [addLogo, result] = useAddLogoMutation();
  const [deleteLogo, { isLoading }] = useDeleteLogoMutation();

  const handleDeleteLogo = async (key) => {
    const deleleteLogoReq = await deleteLogo({
      storeId: storefront._id,
      key: storefront.logo.key,
    }).unwrap();
    refetch();
  };

  //this needs to be refactored at some point to better handle errors
  const handleAddLogo = async (e) => {
    e.preventDefault();

    console.log(logoFile[0].file);

    const image = new FormData();
    image.append('productImages', logoFile[0].file);

    try {
      const imageDataReq = await uploadImageRequest.post(
        '/products/imageupload',
        image
      );
      if (imageDataReq.data) {
        const addLogoReq = await addLogo({
          storeId: storefront._id,
          logoUrl: imageDataReq.data[0].url,
          logoKey: imageDataReq.data[0].key,
          name: name,
        }).unwrap();

        if (addLogoReq === 'Logo added') {
          refetch();
          closeModal();
        } else {
          refetch();
          return;
        }
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
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
    },
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='w-72 mx-auto'>
          <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
            Edit storefront name & logo
          </p>
          <form>
            <p>Name</p>
            <div className='flex justify-between items-center'>
              <input
                type='text'
                className='border-2 border-gray-300 hover:border-gray-400 outline outline-0 focus:border-gray-400 w-full rounded-lg p-2'
                placeholder='Storefront name'
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              <p>.frunt.com</p>
            </div>
          </form>
          <p className='mt-2'>+ add new logo</p>
          <FilePond
            file={logoFile}
            imageResizeTargetWidth={200}
            allowReorder={true}
            name='productImages'
            onupdatefiles={(file) => setLogoFile(file)}
          />
          <button
            onClick={handleAddLogo}
            className='h-14 w-full border-slate-800 border-2 rounded mt-2'
          >
            Save
          </button>

          <button
            onClick={closeModal}
            className='h-10 w-full border-red-400 text-red-400 border-2 rounded mt-2'
            type='button'
          >
            Cancel
          </button>
        </div>
      </Modal>

      <div className='border-b mb-4'>
        <div className='w-full flex justify-between items-center mt-4'>
          <p className='text-slate-800 font-medium '>Storefront name & logo</p>
          <button
            className='border-2 rounded w-20 h-8 border-gray-400 text-gray-400'
            onClick={openModal}
          >
            Edit
          </button>
        </div>

        <div className='p-4'>
          <p className='text-gray-400 font-medium mt-2'>Name</p>
          <p className='text-xl text-gray-400 font-medium'>
            <span className='text-slate-800'>{storefront?.name}</span>
            .fruntt.com
          </p>
          <p className='text-gray-400 font-medium mt-2'>Logo</p>
          {storefront?.logo?.url ? (
            <div className=''>
              <img src={storefront?.logo?.url} className='h-16' />
              <button
                onClick={handleDeleteLogo}
                className='text-red-400 hover:text-red-500'
              >
                Delete
              </button>
            </div>
          ) : (
            <div className='w-full h-20 rounded border-2 flex flex-col justify-center items-center p-2'>
              <p className='text-slate-800 text-xl font-medium'>
                You have not added a logo yet
              </p>
              <p className='text-gray-400 w-7/12 text-center mt-2'>
                Your storefront name will appear on your navbar instead
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddLogo;
