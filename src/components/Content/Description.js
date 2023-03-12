import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Editor } from 'react-draft-wysiwyg';
import { convertFromRaw, EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Spinner from '../Spinner';

const Description = ({ product, isLoding, isSuccess, refetch }) => {
  const contentState =
    isSuccess && product.length
      ? convertFromRaw(JSON.parse(product[0]?.info))
      : '{}';

  let content;
  if (isLoding) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = product.length ? (
      <div>
        {contentState.hasText() ? (
          <div className='w-full flex justify-between items-center border-b p-2'>
            <div className='flex flex-col'>
              <p className='text-slate-800 font-medium text-xl'>
                Product description
              </p>
            </div>
            <Link
              className='border-2 rounded w-20 h-8 flex items-center justify-center border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
              to='/dashboard/description'
            >
              Edit
            </Link>
          </div>
        ) : (
          <div className='w-full flex justify-between items-center border-b p-2'>
            <div className='flex flex-col'>
              <p className='text-slate-800 font-medium text-xl'>
                Product description
              </p>
            </div>
            <Link
              className='border-2 rounded w-20 h-8 flex items-center justify-center border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
              to='/dashboard/description'
            >
              + Add
            </Link>
          </div>
        )}

        <div className='p-4'>
          {contentState.hasText() ? (
            <div className='overflow-scroll h-56 border rounded p-2'>
              <Editor
                editorState={EditorState.createWithContent(
                  convertFromRaw(JSON.parse(product[0]?.info))
                )}
                readOnly={true}
                toolbarHidden
              />
            </div>
          ) : (
            <div className='w-full mx-auto rounded border-2 flex flex-col justify-center items-center mt-2 p-2'>
              <p className='text-slate-800 text-xl font-medium text-center'>
                You have not added a product description
              </p>
              <p className='text-gray-400 w-10/12 text-center mt-2'>
                A product description helps customers understand what they are
                buying
              </p>
              <Link
                className='border-2 rounded p-2 h-8 mt-2 flex items-center justify-center border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800'
                to='/dashboard/description'
              >
                + Add product description
              </Link>
            </div>
          )}
        </div>
      </div>
    ) : (
      <>
        <div className='w-full flex items-center border-b p-2'>
          <div className='flex flex-col'>
            <p className='text-slate-800 font-medium text-xl'>
              Product description
            </p>
          </div>
        </div>
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
      </>
    );
  }
  return content;
};

export default Description;
