import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import CoverImage from './CoverImage';
import Files from './Files';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Select from 'react-select';
import { Link } from 'react-router-dom';

//flowbite
import { Tooltip, Checkbox, Spinner, Badge } from 'flowbite-react';

//filepond
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

//mui
import Alert from '@mui/material/Alert';
import { HiOutlineTemplate } from 'react-icons/hi';
import { ChevronUp } from 'react-feather';

const EditDesktop = ({
  handleDelete,
  handleSaveEdit,
  setTitle,
  title,
  setDescription,
  description,
  price,
  setPrice,
  published,
  setPublished,
  setFiles,
  files,
  setImage,
  image,
  product,
  digitalType,
  setDigitalType,
  error,
  refetchProduct,
  productContent,
  setProductContent,
  callToAction,
  setCallToAction,
  payChoice,
  setPayChoice,
  suggestedPrice,
  setSuggestedPrice,
  deletingProduct,
  info,
  setInfo,
  url,
  setUrl,
  free,
  category,
  setFree,
  handleType,
  handleAction,
  handleCategory,
  setDupLink,
  dupLink,
  updatingProduct,
  emptyFields,
  inReview,
}) => {
  const typeOptions = [
    { value: 'video', label: 'Course' },
    { value: 'art', label: 'Art' },
    { value: 'ebook', label: 'E-Book' },
    { value: 'template', label: 'Template' },
    { value: 'other', label: 'Other digital media' },
  ];

  const actionOptions = [
    { value: 'buy', label: 'Buy Now' },
    { value: 'want', label: 'I want this!' },
    { value: 'get', label: 'Get Now' },
  ];

  const categories = [
    { value: 'business', label: 'Business & Finance' },
    { value: 'design', label: 'Design' },
    { value: 'software', label: 'Software Development' },
    { value: 'drawing', label: 'Drawing & Painting' },
    { value: 'writing', label: 'Writing' },
    { value: 'education', label: 'Education' },
    { value: 'self', label: 'Self Improvement' },
    { value: 'other', label: 'Other' },
  ];

  var regex = /(<([^>]+)>)/gi;
  const hasInfo = !!info.replace(regex, '').length;

  const formattedActionValue = actionOptions.find(
    (option) => option.value === callToAction
  );

  const formattedCategory = categories.find((cat) => cat.value === category);

  const [addDescription, setAddDescription] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleFree = () => {
    setFree(!free);
    setPrice(0);
  };

  return (
    <div className='w-full flex flex-col gap-2'>
      {error && (
        <Alert severity='error' className='mb-2'>
          {error}
        </Alert>
      )}
      <div className='flex items-center justify-between w-full border border-gray-200 rounded-md p-4'>
        <div className='flex flex-col items-start'>
          <p className='text-sm text-stone-800'>Edit template</p>
        </div>

        <div className='flex items-center gap-2'>
          {inReview ? (
            <Badge color='warning'>In review</Badge>
          ) : (
            <Tooltip
              content='Put your template into review to be published for sales'
              style='light'
            >
              <div className='flex items-center gap-2'>
                <Checkbox
                  onChange={(e) => setPublished(e.target.checked)}
                  checked={published}
                />
                <p className='text-xs text-stone-800'>Publish</p>
              </div>
            </Tooltip>
          )}
          <Link
            to='/dashboard/templates'
            className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
          >
            Cancel
          </Link>
          <button
            type='button'
            className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
            onClick={handleSaveEdit}
            disabled={updatingProduct}
          >
            Save
          </button>
        </div>
      </div>

      {updatingProduct ? (
        <div className='w-full rounded-md border border-gray-200 flex items-center justify-center h-96'>
          <Spinner />
        </div>
      ) : (
        <Tabs>
          <TabList>
            <Tab>Details</Tab>
            <Tab>Media</Tab>
            <Tab>Content</Tab>
          </TabList>

          <TabPanel>
            <form className='w-full flex flex-col gap-4 border border-gray-200 rounded-md bg-white p-4'>
              <div className='flex items-start w-full gap-4'>
                <div className='flex flex-col gap-4 w-6/12'>
                  <div className='flex flex-col w-full'>
                    <div className='flex justify-between w-full'>
                      <p className='text-stone-600 text-xs'>Title</p>
                      <p className='text-xs text-stone-600'>
                        {title.length}/50
                      </p>
                    </div>
                    <input
                      type='text'
                      className={`border ${
                        emptyFields.includes('field1')
                          ? 'border-red-300'
                          : 'border-gray-200'
                      } hover:border-gray-200 bg-gray-50 text-sm focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0`}
                      placeholder='Title'
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      maxLength={50}
                    />
                  </div>

                  <div className='flex flex-col w-full'>
                    <div className='flex w-full justify-between'>
                      <p className='text-stone-600 text-xs'>
                        Summary (optional)
                      </p>
                      <div>
                        <p className='text-xs text-stone-600'>
                          {description.length}/75
                        </p>
                      </div>
                    </div>
                    <textarea
                      type='text'
                      className='border border-gray-200 hover:border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 w-full rounded-md p-2 bg-gray-50 resize-none text-sm'
                      placeholder='Summary'
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      maxLength={75}
                    />
                  </div>

                  <div className='flex flex-col w-full'>
                    <p className='text-stone-600 text-xs'>Link</p>
                    <div className='flex w-full'>
                      <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                        <p className='text-sm'>fruntt.com/t/</p>
                      </div>
                      <input
                        type='text'
                        placeholder='Link'
                        className='border text-sm border-gray-200 bg-gray-50 focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 rounded-tr-md rounded-br-md p-2 pl-1 flex-1'
                        onChange={(e) => setUrl(e.target.value)}
                        value={url}
                      />
                    </div>
                  </div>
                </div>

                <div className='w-6/12 flex flex-col gap-4 items-start'>
                  <div className='flex flex-col w-full'>
                    <p className='text-stone-600 text-xs'>Call to action</p>
                    <Select
                      options={actionOptions}
                      onChange={handleAction}
                      value={formattedActionValue}
                      placeholder='Call to action'
                      menuPortalTarget={document.body}
                      menuPosition={'fixed'}
                      isSearchable={false}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          borderColor: 'rgb(229 231 235)',
                          backgroundColor: 'rgb(249 250 251)',
                          borderWidth: 1,
                          '&:hover': {
                            backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          },
                          '&:focus': {
                            backgroundColor: 'rgb(229 231 235)', // Keep the same border color on hover
                          },
                          fontSize: '14px',
                          borderRadius: '.375rem',
                          boxShadow: 'none',
                          zIndex: 99999,
                          position: 'relative',
                        }),
                        menuPortal: (provided) => ({
                          ...provided,
                          zIndex: 9999,
                          fontSize: '14px',
                        }),
                      }}
                      className='w-full'
                    />
                  </div>
                  <div className='flex flex-col w-full'>
                    <p className='text-stone-600 text-xs'>Price</p>
                    <div className='flex w-full items-start'>
                      <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                        <p className='text-sm'>$</p>
                      </div>
                      <input
                        type='number'
                        className={`border ${
                          emptyFields.includes('field4')
                            ? 'border-red-300'
                            : 'border-gray-200'
                        } hover:border-gray-200 hover:bg-gray-200 w-full text-sm rounded-tr-md rounded-br-md p-2 bg-gray-50 flex-1 focus:bg-gray-200 focus:border-gray-200`}
                        placeholder={payChoice ? '$9+' : '$9'}
                        value={price}
                        step={1}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='flex flex-col gap-4 items-start'>
                    {payChoice ? (
                      ''
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Checkbox onChange={handleFree} />
                        <p className='text-sm text-stone-600'>Free template</p>
                      </div>
                    )}
                    {free ? (
                      ''
                    ) : (
                      <div className='flex items-center gap-2'>
                        <Checkbox
                          onChange={(e) => setPayChoice(e.target.checked)}
                        />
                        <p className='text-sm text-stone-600'>
                          Customer sets price
                        </p>
                      </div>
                    )}
                  </div>

                  {payChoice ? (
                    <div className='flex items-center'>
                      <div className='flex flex-col w-6/12'>
                        <p className='text-stone-600 text-xs'>Minimum</p>
                        <div className='flex w-full items-start'>
                          <div className='rounded-tl-md rounded-bl-md bg-gray-50 border border-r-0 border-gray-200 flex items-center p-2 pr-1'>
                            <p className='text-sm'>$</p>
                          </div>
                          <input
                            type='number'
                            className={`border ${
                              emptyFields.includes('field4')
                                ? 'border-red-300'
                                : 'border-gray-200'
                            } hover:border-gray-200 hover:bg-gray-200 w-full text-sm rounded-tr-md rounded-br-md p-2 bg-gray-50 flex-1 focus:bg-gray-200 focus:border-gray-200`}
                            placeholder={payChoice ? '$9+' : '$9'}
                            value={price}
                            step={1}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className='flex flex-col w-6/12 ml-2'>
                        <p className='text-stone-600 text-xs'>Suggested</p>
                        <input
                          type='number'
                          className={`border ${
                            emptyFields.includes('field4')
                              ? 'border-red-300'
                              : 'border-gray-200'
                          } hover:border-gray-200 hover:bg-gray-200 w-full text-sm rounded-md p-2 bg-gray-50 focus:bg-gray-200 focus:border-gray-200`}
                          placeholder={payChoice ? '$9+' : '$9'}
                          value={suggestedPrice}
                          step={1}
                          onChange={(e) => setSuggestedPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>

              {hasInfo ? (
                <>
                  <div className='flex flex-col pb-10'>
                    <div className='flex items-center justify-between w-full'>
                      <p className='text-xs text-stone-600'>Edit description</p>
                    </div>
                    <ReactQuill
                      value={info}
                      onChange={setInfo}
                      className='h-80'
                      placeholder='Start typing description here...'
                    />
                  </div>
                </>
              ) : (
                <>
                  {addDescription ? (
                    <div className='flex flex-col pb-10 gap-1'>
                      <div className='flex items-center justify-between w-full'>
                        <p className='text-xs text-stone-600'>
                          Add description
                        </p>

                        <div>
                          <button
                            type='button'
                            className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                            onClick={(e) => setAddDescription(!addDescription)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                      <ReactQuill
                        value={info}
                        onChange={setInfo}
                        className='h-80'
                        placeholder='Start typing description here...'
                      />
                    </div>
                  ) : (
                    <div className='flex flex-col items-center justify-center border border-gray-200 w-full rounded-md p-4'>
                      <p className='text-stone-800 text-sm'>Description</p>
                      <p className='text-stone-600 text-xs text-center w-80'>
                        Tell potential customers a little more about your
                        template. This is visible on your template detail page.
                      </p>
                      <button
                        type='button'
                        className='flex items-center justify-center bg-gray-200 text-xs text-stone-800 rounded-md pt-1 pb-1 pl-2 pr-2 mt-2'
                        onClick={(e) => setAddDescription(!addDescription)}
                      >
                        Add Description
                      </button>
                    </div>
                  )}
                </>
              )}
            </form>
          </TabPanel>

          <TabPanel>
            <div className='border border-gray-200 rounded-md bg-white p-4 flex flex-col gap-4'>
              <CoverImage
                product={product}
                productId={product._id}
                image={image}
                setImage={setImage}
                refetchProduct={refetchProduct}
              />
            </div>
          </TabPanel>

          <TabPanel>
            <div className='flex flex-col gap-4 items-start border border-gray-200 rounded-md w-full p-4 bg-white'>
              <div className='flex flex-col w-full'>
                <div className='flex flex-col'>
                  <p className='text-stone-600 text-xs'>Duplication link</p>
                </div>
                <input
                  type='text'
                  className={`border ${
                    emptyFields.includes('field1')
                      ? 'border-red-300'
                      : 'border-gray-200'
                  } hover:border-gray-200 bg-gray-50 text-sm focus:bg-gray-200 focus:border-gray-200 hover:bg-gray-200 w-full rounded-md p-2 outline outline-0`}
                  placeholder='https://carbonated-hill-6bc.notion.site/43be8a4d9'
                  onChange={(e) => setDupLink(e.target.value)}
                  value={dupLink}
                />
              </div>
              <div className='flex flex-col items-start gap-2'>
                <button
                  type='button'
                  onClick={(e) => setShowInfo(!showInfo)}
                  className='flex items-end justify-center text-xs text-stone-600'
                >
                  {showInfo ? (
                    <>
                      Hide <ChevronUp size={16} className='ml-1' />
                    </>
                  ) : (
                    <>Where do I get this?</>
                  )}
                </button>
                {showInfo && (
                  <div className='flex flex-col gap-2'>
                    <p className='text-stone-600 text-xs w-80'>
                      Once you have created and designed a template in Notion,
                      you have the ability to share and publish it using the top
                      right menu. After you publish it, a duplication link is
                      created.
                    </p>

                    <a
                      href='https://www.notion.so/help/public-pages-and-web-publishing'
                      target='_blank'
                      className='text-xs text-stone-800 underline-offset-1 underline'
                    >
                      {' '}
                      View tutorial
                    </a>
                  </div>
                )}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      )}
    </div>
    // <>
    //   <Modal
    //     isOpen={modalIsOpen}
    //     onRequestClose={closeModal}
    //     style={modalStyles}
    //   >
    //     <div className='w-11/12 mx-auto'>
    //       <p className='text-lg font-medium text-slate-800 mb-4 border-b'>
    //         Delete Template
    //       </p>

    //       <p className='text-xl mt-2 mb-2'>
    //         Are you sure you want to delete this template?
    //       </p>

    //       {error && (
    //         <Alert className='w-full mb-2 mt-2' severity='error'>
    //           {error}
    //         </Alert>
    //       )}

    //       <button
    //         type='button'
    //         // disabled={deletingPage}
    //         onClick={handleDelete}
    //         className='h-14 w-full border-red-400 text-red-400 border-2 rounded mt-2 hover:bg-red-400 hover:text-white'
    //       >
    //         {deletingProduct ? 'Deleting template...' : 'Yes, delete template'}
    //       </button>

    //       <button
    //         onClick={closeModal}
    //         className='h-10 w-full border-slate-800 text-slate-800 border-2 rounded mt-2 hover:bg-slate-800 hover:text-white'
    //         type='button'
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   </Modal>
    //   <div className='w-full'>
    //     <div className='mb-2 flex justify-between items-center'>
    //       <div className='flex items-center justify-center bg-stone-800 rounded-md p-2'>
    //         <HiOutlineTemplate className='text-white text-xl' />
    //         <p className='text-md text-white ml-2'>Edit Template</p>
    //       </div>

    //       <FormControlLabel
    //         label='Publish to store'
    //         control={
    //           <Switch
    //             checked={published}
    //             onChange={(e) => setPublished(e.target.checked)}
    //           />
    //         }
    //         className='mt-2'
    //       />

    //       <div className='flex'>
    //         <button
    //           className='w-32 h-10 rounded border-red-400 text-red-400 border-2 mr-2 hover:text-white hover:bg-red-400 text-sm'
    //           onClick={openModal}
    //           type='button'
    //         >
    //           DELETE
    //         </button>
    //         <button
    //           className='w-32 h-10 rounded border-stone-800 border-2 hover:text-white hover:bg-stone-800 text-sm'
    //           onClick={handleSaveEdit}
    //           type='button'
    //         >
    //           SAVE
    //         </button>
    //       </div>
    //     </div>

    //     <Tabs>
    //       <TabList>
    //         <Tab>Details</Tab>
    //         <Tab>Content</Tab>
    //         <Tab>Marketplace</Tab>
    //       </TabList>

    //       <TabPanel>
    //         <form
    //           className='w-full border rounded bg-white p-2 drop-shadow-lg pb-12'
    //           onSubmit={handleSaveEdit}
    //         >
    //           {error && <Alert severity='error'>{error}</Alert>}
    //           <div className='flex items-center'>
    //             <p className='text-xl font-medium'>Details</p>
    //             <Tooltip
    //               title={
    //                 <p className='text-lg'>
    //                   Product details help your customers know what they are
    //                   buying.
    //                 </p>
    //               }
    //               className='ml-2 text-lg'
    //               placement='right-end'
    //             >
    //               <button type='button' disabled>
    //                 <AiOutlineInfoCircle />
    //               </button>
    //             </Tooltip>
    //           </div>
    //           <div className='flex justify-between w-full mt-2'>
    //             <div className='flex flex-col w-6/12'>
    //               <p className='text-stone-800 mt-2'>Title</p>
    //               <input
    //                 type='text'
    //                 className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0 mt-1'
    //                 value={title}
    //                 onChange={(e) => setTitle(e.target.value)}
    //                 maxLength={50}
    //               />
    //               <div className='w-full flex justify-end'>
    //                 <p className='text-sm text-gray-400'>{title.length}/50</p>
    //               </div>

    //               <p className='text-stone-800 mt-2'>Summary (optional)</p>
    //               <textarea
    //                 type='text'
    //                 className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0  mt-1'
    //                 value={description}
    //                 onChange={(e) => setDescription(e.target.value)}
    //                 maxLength={75}
    //               />
    //               <div className='w-full flex justify-end'>
    //                 <p className='text-sm text-gray-400'>
    //                   {description.length}/75
    //                 </p>
    //               </div>

    //               <p className='text-stone-800 mt-2'>Price</p>
    //               <div className='flex items-center'>
    //                 <div className='mr-4'>
    //                   <p className='text-xl font-medium'>$</p>
    //                 </div>
    //                 <input
    //                   type='number'
    //                   step={1}
    //                   min={0}
    //                   className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0 mt-1'
    //                   value={price}
    //                   onChange={(e) => setPrice(e.target.value)}
    //                 />
    //               </div>

    //               {payChoice ? (
    //                 ''
    //               ) : (
    //                 <FormControlLabel
    //                   label='Free template'
    //                   control={
    //                     <Switch
    //                       checked={free}
    //                       onChange={(e) => setFree(e.target.checked)}
    //                     />
    //                   }
    //                   className='mt-2'
    //                 />
    //               )}

    //               {free ? (
    //                 ''
    //               ) : (
    //                 <FormControlLabel
    //                   label='Let customers pay what they want'
    //                   control={
    //                     <Switch
    //                       checked={payChoice}
    //                       onChange={(e) => setPayChoice(e.target.checked)}
    //                     />
    //                   }
    //                   className='mt-2'
    //                 />
    //               )}

    //               {payChoice ? (
    //                 <div className='flex items-center'>
    //                   <div className='flex flex-col w-6/12'>
    //                     <p className='text-stone-800'>Minimum price</p>
    //                     <div className='flex items-center w-full mt-1'>
    //                       <div className='w-1/12'>
    //                         <p className='text-xl font-medium'>$</p>
    //                       </div>
    //                       <input
    //                         type='number'
    //                         className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-11/12 rounded p-2 outline outline-0'
    //                         step={1}
    //                         placeholder='$9+'
    //                         value={price}
    //                         disabled
    //                         style={{
    //                           WebkitAppearance: 'none',
    //                           MozAppearance: 'textfield',
    //                         }}
    //                       />
    //                     </div>
    //                   </div>
    //                   <div className='flex flex-col w-6/12 ml-2'>
    //                     <p className='text-stone-800'>
    //                       Suggested price/placeholder
    //                     </p>
    //                     <div className='flex items-center w-full mt-1'>
    //                       <div className='w-1/12'>
    //                         <p className='text-xl font-medium'>$</p>
    //                       </div>
    //                       <input
    //                         className='border-2 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 w-full rounded p-2 outline outline-0'
    //                         onChange={(e) => setSuggestedPrice(e.target.value)}
    //                         placeholder='$9+'
    //                         value={suggestedPrice}
    //                       />
    //                     </div>
    //                   </div>
    //                 </div>
    //               ) : (
    //                 ''
    //               )}
    //             </div>

    //             <div className='border-2 rounded w-6/12 ml-4 flex flex-col p-2'>
    //               <CoverImage
    //                 product={product}
    //                 productId={product._id}
    //                 image={image}
    //                 setImage={setImage}
    //                 refetchProduct={refetchProduct}
    //               />
    //               <p className='text-stone-800 mt-2'>Call to action</p>
    //               <Select
    //                 options={actionOptions}
    //                 onChange={handleAction}
    //                 value={formattedActionValue}
    //                 menuPortalTarget={document.body}
    //                 menuPosition={'fixed'}
    //                 isSearchable={false}
    //                 styles={{
    //                   control: (baseStyles, state) => ({
    //                     ...baseStyles,
    //                     borderColor: 'rgb(243 244 246)',
    //                     backgroundColor: 'rgb(243 244 246)',
    //                     borderWidth: 2,
    //                     '&:hover': {
    //                       borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
    //                       backgroundColor: 'rgb(229 231 235)',
    //                     },
    //                     boxShadow: 'none',
    //                     zIndex: 99999,
    //                     position: 'relative',
    //                   }),
    //                   menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    //                 }}
    //                 className='mt-1'
    //               />
    //               {/* <select
    //                 onChange={(e) => setCallToAction(e.target.value)}
    //                 className='w-full h-14 rounded p-2 mt-1'
    //                 value={callToAction}
    //               >
    //                 <option value='buy'>Buy Now</option>
    //                 <option value='want'>I want this!</option>
    //                 <option value='get'>Get Now</option>
    //               </select> */}

    //               <p className='text-stone-800 mt-2'>URL</p>
    //               <div className='flex items-center border-2 p-2 rounded border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200 mt-1'>
    //                 <span className='underline underline-offset-2 font-medium'>{`${currentStoreUrl}/`}</span>
    //                 <input
    //                   className='outline outline-0 border-gray-100 bg-gray-100 hover:bg-gray-200 hover:border-gray-200'
    //                   placeholder='TemplateName'
    //                   value={url}
    //                   onChange={(e) => setUrl(e.target.value)}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           <p className='text-stone-800 mt-2'>Description</p>
    //           <ReactQuill
    //             value={info}
    //             onChange={setInfo}
    //             className='h-72 mt-1'
    //             placeholder='Start typing description here...'
    //           />
    //         </form>
    //       </TabPanel>

    //       <TabPanel>
    //         <div className='p-2 pb-12 bg-white rounded drop-shadow-lg border'>
    //           <div className='flex items-center'>
    //             <p className='text-xl font-medium'>Content</p>
    //             <Tooltip
    //               title={
    //                 <p className='text-lg'>
    //                   Images, zip files, PDFs, video, etc..
    //                 </p>
    //               }
    //               className='ml-2 text-lg'
    //               placement='right-end'
    //             >
    //               <button type='button' disabled>
    //                 <AiOutlineInfoCircle />
    //               </button>
    //             </Tooltip>
    //           </div>
    //           <p className='text-stone-800 font-medium mb-4'>
    //             Add any files and content you want to include in your digital
    //             purchase. A download link will be sent to customers
    //             automatically after a purchase.
    //           </p>

    //           <Files
    //             productId={product._id}
    //             product={product}
    //             formFiles={files}
    //             setFormFiles={setFiles}
    //             refetchProduct={refetchProduct}
    //           />

    //           <div className='w-full mt-4'>
    //             <FilePond
    //               file={files}
    //               name='digitalProducts'
    //               allowMultiple
    //               onupdatefiles={(fileItems) => {
    //                 setFiles(fileItems.map((fileItem) => fileItem.file));
    //               }}
    //             />
    //           </div>

    //           <ReactQuill
    //             value={productContent}
    //             onChange={setProductContent}
    //             placeholder='Start typing content here'
    //             className='h-96'
    //           />
    //         </div>
    //       </TabPanel>

    //       <TabPanel>
    //         <div className='h-screen flex flex-col border rounded w-full shadow-lg bg-white p-2'>
    //           <div className='flex items-center'>
    //             <p className='text-2xl font-medium'>Marketplace</p>
    //             <Tooltip
    //               title={
    //                 <p className='text-lg'>
    //                   This allows you to list your product in our marketplace.
    //                 </p>
    //               }
    //               className='ml-2 text-lg'
    //               placement='right-end'
    //             >
    //               <button type='button' disabled>
    //                 <AiOutlineInfoCircle />
    //               </button>
    //             </Tooltip>
    //           </div>
    //           <p className='text-stone-800 text-lg mt-6'>
    //             List your product in our marketplace for other creators and
    //             customers to discover.
    //           </p>
    //           <FormControlLabel
    //             label='Publish to marketplace'
    //             control={
    //               <Switch
    //                 checked={marketplace}
    //                 onChange={(e) => setMarketplace(e.target.checked)}
    //               />
    //             }
    //             className='mt-2'
    //           />
    //           <p className='text-stone-800 mt-2'>Product category</p>
    //           <Select
    //             options={categories}
    //             onChange={handleCategory}
    //             value={formattedCategory}
    //             menuPortalTarget={document.body}
    //             menuPosition={'fixed'}
    //             isSearchable={false}
    //             styles={{
    //               control: (baseStyles, state) => ({
    //                 ...baseStyles,
    //                 borderColor: 'rgb(243 244 246)',
    //                 backgroundColor: 'rgb(243 244 246)',
    //                 borderWidth: 2,
    //                 '&:hover': {
    //                   borderColor: 'rgb(229 231 235)', // Keep the same border color on hover
    //                   backgroundColor: 'rgb(229 231 235)',
    //                 },
    //                 boxShadow: 'none',
    //                 zIndex: 99999,
    //                 position: 'relative',
    //               }),
    //               menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    //             }}
    //             className='mt-1 w-64'
    //           />
    //         </div>
    //       </TabPanel>
    //     </Tabs>
    //   </div>
    // </>
  );
};

export default EditDesktop;
