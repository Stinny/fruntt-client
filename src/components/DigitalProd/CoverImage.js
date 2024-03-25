import React, { useEffect } from 'react';
import {
  useGetCoverImageQuery,
  useDeleteItemImageMutation,
} from '../../api/productsApiSlice';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Trash } from 'react-feather';

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
    content = coverImage.length ? (
      <>
        <p className='text-xs text-stone-600'>
          {coverImage.length}/5 images uploaded
        </p>
        <div className='grid grid-cols-5 gap-2 mb-1 mt-1'>
          {coverImage.map((image, index) => (
            <div key={index} className='relative'>
              <img
                src={image?.url}
                alt={`Image ${index + 1}`}
                className='w-full h-28 object-fit rounded-md'
              />
              <button
                type='button'
                onClick={(e) =>
                  handleDeleteCoverImage({
                    productId: product._id,
                    imgId: '',
                    key: image?.key,
                  })
                }
                className='absolute top-1 right-1 bg-white text-stone-800 font-bold px-1 py-1 rounded-full'
              >
                <Trash size={14} />
              </button>
            </div>
          ))}
        </div>
        {coverImage.length < 5 ? (
          <>
            <FilePond
              file={image}
              imageResizeTargetWidth={200}
              name='productImages'
              // onupdatefiles={(file) => setImage(file)}
              onupdatefiles={(fileItems) => {
                setImage(fileItems.map((fileItem) => fileItem.file));
              }}
              allowMultiple
              instantUpload={false}
              maxFiles={5 - coverImage.length}
            />
          </>
        ) : (
          ''
        )}
      </>
    ) : (
      <>
        <p className='text-lg font-medium text-stone-800 text-center h-8'>
          Upload new cover images
        </p>
        <p className='text-stone-800 font-medium text-center text-sm'>
          Select up to 5 images one by one or by holding CTRL(recommended size
          1280x720)
        </p>

        <FilePond
          file={image}
          imageResizeTargetWidth={200}
          name='productImages'
          // onupdatefiles={(file) => setImage(file)}
          onupdatefiles={(fileItems) => {
            setImage(fileItems.map((fileItem) => fileItem.file));
          }}
          allowMultiple
          instantUpload={false}
          maxFiles={5 - coverImage.length}
        />
      </>
    );
  }

  return content;
};

export default CoverImage;
