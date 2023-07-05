import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAddDescriptionMutation } from '../../api/productsApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { isMobile } from 'react-device-detect';
import { toast } from 'react-toastify';

const DescEditor = ({ product, getItemAgain }) => {
  const navigate = useNavigate();
  const [addDescription, result] = useAddDescriptionMutation();
  const [error, setError] = useState('');

  const customQuillClass = 'custom-quill';

  // const [description, setDescription] = useState(
  //   EditorState.createWithContent(convertFromRaw(JSON.parse(product?.info)))
  // );

  //for quill editor
  const [value, setValue] = useState(product?.info);

  const handleSaveDescription = async () => {
    var regex = /(<([^>]+)>)/gi;

    const hasText = !!value.replace(regex, '').length;
    console.log(hasText);
    try {
      const addDescriptionReq = await addDescription({
        productId: product?._id,
        // description: JSON.stringify(
        //   convertToRaw(description.getCurrentContent())
        // ),
        description: hasText ? value : '',
      }).unwrap();
      if (addDescriptionReq === 'Description added') {
        toast.success('Product description added!');
        getItemAgain();
        navigate('/dashboard/content');
      } else {
        setError('There was an error');
      }
    } catch (err) {
      setError('There was a server error');
    }
  };

  return isMobile ? (
    <div className='max-w-6xl mx-auto'>
      <div className='border-b-2 w-full flex justify-between p-2 mb-6 items-center'>
        <div className='flex flex-col'>
          <p className='text-2xl font-medium'>Product Description</p>
        </div>
        <button
          type='button'
          className='border-2 rounded w-20 h-8 flex items-center justify-center border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
          onClick={handleSaveDescription}
        >
          SAVE
        </button>
      </div>

      <div className=' w-full p-2'>
        <ReactQuill
          // theme='snow'
          value={value}
          onChange={setValue}
          placeholder='Start typing here'
          className={customQuillClass}
        />
      </div>
    </div>
  ) : (
    <div className='max-w-6xl mx-auto'>
      <div className='border-b-2 w-full flex justify-between p-2 mb-6 items-center'>
        <div className='flex flex-col'>
          <p className='text-2xl font-medium'>Product Description</p>
          <p className='font-medium text-gray-400'>
            This will be seen by customers on your page before they make a
            purchase
          </p>
        </div>
        <div className='flex items-center'>
          <Link
            to='/dashboard/content'
            className='border-2 rounded w-20 h-8 flex items-center justify-center border-red-400 text-red-400 hover:text-white hover:bg-red-400 mr-2'
          >
            CANCEL
          </Link>
          <button
            type='button'
            className='border-2 rounded w-20 h-8 flex items-center justify-center border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
            onClick={handleSaveDescription}
          >
            SAVE
          </button>
        </div>
      </div>

      <div className=' w-full'>
        <ReactQuill
          // theme='snow'
          value={value}
          onChange={setValue}
          placeholder='Start typing here'
          className={customQuillClass}
        />
      </div>
    </div>
  );
};

export default DescEditor;
