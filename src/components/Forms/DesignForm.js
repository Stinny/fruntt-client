import React, { useState } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { useEditStylesMutation } from '../../api/storefrontApiSlice';
import { useNavigate, Link } from 'react-router-dom';
import { BsArrowRightShort } from 'react-icons/bs';

const DesignForm = ({ storefront }) => {
  const navigate = useNavigate();

  const [navbarBG, setNavbarBG] = useState(storefront?.style?.navbarBackground);
  const [pageBG, setPageBG] = useState(storefront?.style?.pageBackground);
  const [itemDetailsBG, setItemsDetailBG] = useState(
    storefront?.style?.itemDetailsBackground
  );
  const [buttonBG, setButtonBG] = useState(storefront?.style?.buttonBackground);
  const [buttonTextColor, setButtonTextColor] = useState(
    storefront?.style?.buttonTextColor
  );
  const [itemText, setItemText] = useState(storefront?.style?.itemText);
  const [footerBG, setFooterBG] = useState(storefront?.style?.footerBackground);

  const [editStyles, result] = useEditStylesMutation();

  const handleSaveStyles = async (e) => {
    e.preventDefault();

    const editStylesReq = await editStyles({
      storeId: storefront._id,
      navbarBG,
      pageBG,
      itemDetailsBG,
      itemText,
      buttonBG,
      buttonTextColor,
      footerBG,
    }).unwrap();
    if (editStylesReq === 'Styles saved') navigate('/dashboard/design');
  };

  return (
    <div className='w-full mx-auto'>
      <div className='mb-10 flex justify-between items-center border-b-2 p-2'>
        <h2 className='text-3xl font-medium'>Design your storefront</h2>

        <Link
          to='/dashboard/design/edit'
          className='flex justify-between items-center'
        >
          <p className='text-lg font-medium'>See preview & edits</p>
          <BsArrowRightShort className='ml-2 text-2xl font-medium' />
        </Link>

        <button
          onClick={handleSaveStyles}
          className='w-32 h-10 rounded border-slate-800 border-2'
        >
          SAVE
        </button>
      </div>
      <form className='w-full mx-auto' onSubmit={handleSaveStyles}>
        <div className='p-4 w-11/12 mx-auto'>
          <p className='text-gray-400 font-medium mt-4'>Page Styles</p>
          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Page background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={pageBG}
                  onChange={setPageBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={pageBG}
                onChange={setPageBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Navbar background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={navbarBG}
                  onChange={setNavbarBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={navbarBG}
                onChange={setNavbarBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Footer background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={footerBG}
                  onChange={setFooterBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={footerBG}
                onChange={setFooterBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <p className='text-gray-400 font-medium mt-4'>Item Section Styles</p>
          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Item details background</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={itemDetailsBG}
                  onChange={setItemsDetailBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={itemDetailsBG}
                onChange={setItemsDetailBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Item text</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={itemText}
                  onChange={setItemText}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={itemText}
                onChange={setItemText}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <p className='text-gray-400 font-medium mt-4'>Button Styles</p>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Button background:</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={buttonBG}
                  onChange={setButtonBG}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={buttonBG}
                onChange={setButtonBG}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>

          <div className='w-full flex justify-between items-center p-2 border-b mx-auto'>
            <p className='text-xl font-medium'>Button text:</p>
            <div className='flex justify-between items-center'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-400 mr-2'>Hex value:</p>
                <HexColorInput
                  color={buttonTextColor}
                  onChange={setButtonTextColor}
                  prefixed
                  className='w-28 h-10 border-2 rounded mr-4 p-2'
                />
              </div>
              <HexColorPicker
                color={buttonTextColor}
                onChange={setButtonTextColor}
                style={{ width: '200px', height: '75px' }}
              />
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='w-full h-20 border-2 border-slate-800 text-slate-800 rounded text-xl'
        >
          SAVE STYLES
        </button>
      </form>
    </div>
  );
};

export default DesignForm;
