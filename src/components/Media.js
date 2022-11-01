import React from 'react';
import {
  useGetItemImagesQuery,
  useDeleteItemImageMutation,
} from '../api/productsApiSlice';
import Spinner from './Spinner';
import { isMobile } from 'react-device-detect';

const Media = ({ productId }) => {
  const { data: images, isLoading, isSuccess, refetch } = useGetItemImagesQuery(
    productId
  );

  const [deleteItemImage, result] = useDeleteItemImageMutation();

  const handleDeleteImage = async ({ productId, imgId, key }) => {
    console.log(key);
    console.log('deleting image');
    const deleteImgReq = await deleteItemImage({
      productId,
      imgId,
      key,
    }).unwrap();
    console.log('Image deleted');
    refetch();
  };

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = isMobile
      ? images.map((img) => (
          <div className='flex flex-col w-3/12'>
            <img src={img.url} className='w-full' />
            <button
              type='button'
              className='text-red-500 hover:text-red-700'
              onClick={(e) =>
                handleDeleteImage({
                  productId: productId,
                  imgId: img._id,
                  key: img.key,
                })
              }
            >
              Delete
            </button>
          </div>
        ))
      : images.map((img) => (
          <div className='flex flex-col'>
            <img src={img.url} className='w-40' />
            <button
              type='button'
              className='text-red-500 hover:text-red-700'
              onClick={(e) =>
                handleDeleteImage({
                  productId: productId,
                  imgId: img._id,
                  key: img.key,
                })
              }
            >
              Delete
            </button>
          </div>
        ));
  }

  return (
    <div>
      <div className='p-4 flex flex-wrap w-full'>{content}</div>
    </div>
  );
};

export default Media;
