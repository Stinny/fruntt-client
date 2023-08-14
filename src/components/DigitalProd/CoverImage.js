import React, { useEffect } from 'react';
import {
  useGetCoverImageQuery,
  useDeleteItemImageMutation,
} from '../../api/productsApiSlice';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

const CoverImage = ({
  productId,
  product,
  image,
  setImage,
  refetchProduct,
}) => {
  const {
    data: coverImage,
    isLoading,
    isSuccess,
    refetch,
  } = useGetCoverImageQuery(productId);
  const [deleteItemImage, deleteResult] = useDeleteItemImageMutation(); //for deleting cover image

  const handleDeleteCoverImage = async ({ productId, imgId, key }) => {
    const deleteImgReq = await deleteItemImage({
      productId,
      imgId,
      key,
    }).unwrap();
    refetch();
    refetchProduct();
  };

  useEffect(() => {
    refetch();
  }, []);

  let content;

  if (isLoading) {
    content = <p>...Loading</p>;
  } else if (isSuccess) {
    content = coverImage?.url ? (
      <>
        <p className='text-gray-400 mt-4 mb-1'>Current cover image</p>
        <img src={coverImage?.url} className='rounded w-10/12' />
        <button
          type='button'
          onClick={(e) =>
            handleDeleteCoverImage({
              productId: product._id,
              imgId: '',
              key: product?.coverImage?.key,
            })
          }
          className='w-full h-8 border-2 rounded border-red-400 text-red-400 hover:text-white hover:bg-red-400 mt-2'
        >
          Delete & upload new cover image
        </button>
      </>
    ) : (
      <>
        <p className='text-lg font-medium text-slate-800 text-center h-8'>
          Upload a new cover image
        </p>
        <p className='text-gray-400 font-medium text-center'>
          This will be the image your customers will see
        </p>

        <FilePond
          file={image}
          imageResizeTargetWidth={200}
          name='productImages'
          onupdatefiles={(file) => setImage(file)}
        />
      </>
    );
  }

  return content;
};

export default CoverImage;
