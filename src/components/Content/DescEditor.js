import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useAddDescriptionMutation } from '../../api/productsApiSlice';
import { useNavigate } from 'react-router-dom';

const DescEditor = ({ product, getItemAgain }) => {
  const navigate = useNavigate();
  const [addDescription, result] = useAddDescriptionMutation();
  const [error, setError] = useState('');

  const [description, setDescription] = useState(
    EditorState.createWithContent(convertFromRaw(JSON.parse(product?.info)))
  );

  const handleDescriptionChange = (edits) => {
    setDescription(edits);
  };

  const handleSaveDescription = async () => {
    try {
      const addDescriptionReq = await addDescription({
        productId: product?._id,
        description: JSON.stringify(
          convertToRaw(description.getCurrentContent())
        ),
      }).unwrap();
      console.log(addDescriptionReq);
      if (addDescriptionReq === 'Description added') {
        getItemAgain();
        navigate('/dashboard/content');
      } else {
        setError('There was an error');
      }
    } catch (err) {
      setError('There was a server error');
    }
  };

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='border-b-2 w-full flex justify-between p-2 mb-6 items-center'>
        <div className='flex flex-col'>
          <p className='text-2xl font-medium'>Product Description</p>
          <p className='font-medium text-gray-400'>
            This will be seen by customers on your page before they make a
            purchase
          </p>
        </div>
        <button
          type='button'
          className='border-2 rounded w-20 h-8 flex items-center justify-center border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
          onClick={handleSaveDescription}
        >
          SAVE
        </button>
      </div>

      <div className='border rounded w-full p-2'>
        <Editor
          editorState={description}
          onEditorStateChange={handleDescriptionChange}
          placeholder='Start typing here..'
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'embedded',
              'emoji',
              'image',
              'remove',
              'history',
            ],
          }}
        />
      </div>
    </div>
  );
};

export default DescEditor;
