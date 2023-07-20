import React, { useEffect } from 'react';
import {
  useGetFilesQuery,
  useDeleteFileMutation,
} from '../../api/productsApiSlice';
import moment from 'moment';
import { MdOutlineFileDownload } from 'react-icons/md';
import { AiOutlineInfoCircle, AiOutlineDelete } from 'react-icons/ai';
import { isMobile } from 'react-device-detect';

const Files = ({ productId, product, refetchProduct }) => {
  //get all files for this product
  const {
    data: files,
    isLoading,
    isSuccess,
    refetch,
  } = useGetFilesQuery(productId);
  const [deleteFile, result] = useDeleteFileMutation();

  useEffect(() => {
    refetch();
  }, []);

  const handleDeleteFile = async ({ productId, fileId, key }) => {
    try {
      const deleteFileReq = await deleteFile({ productId, fileId, key });
      refetch();
      refetchProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const desktopDisplay = isLoading ? (
    ''
  ) : files.length > 0 ? (
    files?.map((file, index) => (
      <div className='w-full flex items-center justify-between border-b mt-2'>
        <div className='w-4/12'>
          <p className='font-medium text-lg'>{file?.name}</p>
        </div>
        <div className='w-4/12 flex justify-center'>
          <p className='font-medium text-lg'>
            {' '}
            {moment.utc(product.updatedOn).format('MMM D, YYYY')}
          </p>
        </div>
        <div className='flex items-center w-4/12 justify-end'>
          <button
            className='text-red-400 text-2xl'
            type='button'
            onClick={(e) =>
              handleDeleteFile({
                productId: productId,
                fileId: file._id,
                key: file.key,
              })
            }
          >
            <AiOutlineDelete />
          </button>
          <a href={file?.url} download className='text-blue-500 text-2xl ml-4'>
            <MdOutlineFileDownload />
          </a>
        </div>
      </div>
    ))
  ) : (
    <div className='w-full rounded border-2 flex flex-col items-center justify-center h-16'>
      <p>No files added</p>
      <p className='text-gray-400'>
        Add files to include in this digital purchase
      </p>
    </div>
  );

  const mobileDisplay = isLoading ? (
    ''
  ) : files.length > 0 ? (
    files?.map((file, index) => (
      <div className='w-full flex items-center justify-between border-b mt-2'>
        <div className='w-6/12'>
          <p className='font-medium text-lg'>{file?.name}</p>
        </div>

        <div className='flex items-center w-6/12 flex justify-end'>
          <button
            className='text-red-400 text-2xl'
            type='button'
            onClick={(e) =>
              handleDeleteFile({
                productId: productId,
                fileId: file._id,
                key: file.key,
              })
            }
          >
            <AiOutlineDelete />
          </button>
          <a href={file?.url} download className='text-blue-500 text-2xl ml-4'>
            <MdOutlineFileDownload />
          </a>
        </div>
      </div>
    ))
  ) : (
    <div className='w-full rounded border-2 flex flex-col items-center justify-center'>
      <p>No files added</p>
      <p className='text-gray-400'>
        Add files to include in this digital purchase
      </p>
    </div>
  );

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = isMobile ? mobileDisplay : desktopDisplay;
  }
  return content;
};

export default Files;
