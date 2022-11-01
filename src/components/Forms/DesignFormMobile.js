import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import DesignPreviewMobile from '../../pages/Mobile/Dashboard/DesignPreviewMobile';
import { useEditStylesMutation } from '../../api/storefrontApiSlice';

//mui
import Switch from '@mui/material/Switch';

const DesignFormMobile = ({ storefront }) => {
  const navigate = useNavigate();

  const [navbarBG, setNavbarBG] = useState(storefront?.style?.navbarBackground);
  const [pageBG, setPageBG] = useState(storefront?.style?.pageBackground);

  const [buttonColor, setButtonColor] = useState(
    storefront?.style?.buttonColor
  );
  const [buttonTextColor, setButtonTextColor] = useState(
    storefront?.style?.buttonTextColor
  );
  const [pageText, setPageText] = useState(storefront?.style?.pageText);
  const [footerBG, setFooterBG] = useState(storefront?.style?.footerBackground);
  const [buttonStyle, setButtonStyle] = useState(
    storefront?.style?.buttonStyle
  );
  const [socialIcons, setSocialIcons] = useState(
    storefront?.style?.socialIcons
  );
  const [hideNav, setHideNav] = useState(storefront?.style?.hideNav);
  const [hideFooter, setHideFooter] = useState(storefront?.style?.hideFooter);
  const [borders, setBorders] = useState(storefront?.style?.borderColor);
  const [header, setHeader] = useState(storefront?.style?.headerColor);
  const [faqBackground, setFaqBackground] = useState(
    storefront?.style?.faqBackground
  );
  const [reviewBackground, setReviewBackground] = useState(
    storefront?.style?.reviewBackground
  );

  const [editStyles, result] = useEditStylesMutation();

  const handleBtnStyle = (e) => {
    setButtonStyle(e.target.value);
  };

  const handleSaveStyles = async (e) => {
    e.preventDefault();

    const editStylesReq = await editStyles({
      storeId: storefront._id,
      navbarBG,
      pageBG,
      pageText,
      buttonColor,
      buttonTextColor,
      footerBG,
      buttonStyle,
      hideNav,
      hideFooter,
      socialIcons,
      borders,
      header,
      reviewBackground,
      faqBackground,
    }).unwrap();
    if (editStylesReq === 'Styles saved') navigate('/dashboard/design');
  };

  const handleCancel = () => {
    navigate('/dashboard/design');
  };

  const designForm = () => {
    return (
      <form className='w-full mx-auto'>
        <div className='w-full overflow-x-scroll h-64 flex'>
          <div className='w-48 h-64 flex flex-col p-2 mx-auto'>
            <p className='text-lg font-medium mb-2'>Page</p>

            <HexColorPicker
              color={pageBG}
              onChange={setPageBG}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={pageBG}
              onChange={setPageBG}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 ml-4'>
            <p className='text-lg font-medium mb-2'>Header</p>

            <HexColorPicker
              color={navbarBG}
              onChange={setNavbarBG}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={navbarBG}
              onChange={setNavbarBG}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
            <div className='flex items-center'>
              <p>hide</p>
              <Switch
                checked={hideNav}
                onChange={(e) => setHideNav(e.target.checked)}
              />
            </div>
          </div>

          <div className='w-48 h-64 flex flex-col p-2 ml-4'>
            <p className='text-lg font-medium mb-2'>Footer</p>

            <HexColorPicker
              color={footerBG}
              onChange={setFooterBG}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={footerBG}
              onChange={setFooterBG}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />

            <div className='flex items-center'>
              <p>hide</p>
              <Switch
                checked={hideFooter}
                onChange={(e) => setHideFooter(e.target.checked)}
              />
            </div>
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Page text</p>

            <HexColorPicker
              color={pageText}
              onChange={setPageText}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400'>Hex value:</p>
            <HexColorInput
              color={pageText}
              onChange={setPageText}
              prefixed
              className='w-28 h-10 border-2 rounded p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Button</p>

            <HexColorPicker
              color={buttonColor}
              onChange={setButtonColor}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400'>Hex value:</p>
            <HexColorInput
              color={buttonColor}
              onChange={setButtonColor}
              prefixed
              className='w-28 h-10 border-2 rounded p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
            <select
              value={buttonStyle}
              className='mt-2 mb-2 rounded h-10'
              onChange={handleBtnStyle}
            >
              <option value='filled'>Filled</option>
              <option value='outlined'>Outlined</option>
            </select>
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Button text</p>

            <HexColorPicker
              color={buttonTextColor}
              onChange={setButtonTextColor}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={buttonTextColor}
              onChange={setButtonTextColor}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Social icons</p>

            <HexColorPicker
              color={socialIcons}
              onChange={setSocialIcons}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={socialIcons}
              onChange={setSocialIcons}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Borders</p>

            <HexColorPicker
              color={borders}
              onChange={setBorders}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={borders}
              onChange={setBorders}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Sub Headers</p>

            <HexColorPicker
              color={header}
              onChange={setHeader}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400 mr-2'>Hex value:</p>
            <HexColorInput
              color={header}
              onChange={setHeader}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>FAQs</p>

            <HexColorPicker
              color={faqBackground}
              onChange={setFaqBackground}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400'>Hex value:</p>
            <HexColorInput
              color={faqBackground}
              onChange={setFaqBackground}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>

          <div className='w-48 h-64 flex flex-col p-2 mx-auto ml-4'>
            <p className='text-lg font-medium mb-2'>Reviews</p>

            <HexColorPicker
              color={reviewBackground}
              onChange={setReviewBackground}
              style={{ width: '200px', height: '75px' }}
            />
            <p className='text-gray-400'>Hex value:</p>
            <HexColorInput
              color={reviewBackground}
              onChange={setReviewBackground}
              prefixed
              className='w-28 h-10 border-2 rounded mr-4 p-2 focus:outline focus:border-gray-400 focus:outline-0'
            />
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className='w-full mx-auto'>
      <div className='flex justify-between items-center border-b-2 p-2'>
        <h2 className='text-xl font-medium'>Design your storefront</h2>

        <div className='flex'>
          <button
            onClick={handleCancel}
            className='w-16 h-10 text-sm rounded border-red-400 text-red-400 hover:bg-red-400 hover:text-white border-2'
          >
            CANCEL
          </button>
          <button
            onClick={handleSaveStyles}
            className='w-16 h-10 text-sm rounded text-slate-800 border-slate-800 border-2 ml-2 hover:bg-slate-800 hover:text-white'
          >
            SAVE
          </button>
        </div>
      </div>

      <div className='flex flex-col'>
        {designForm()}
        <DesignPreviewMobile
          pageBG={pageBG}
          navbarBG={navbarBG}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          buttonStyle={buttonStyle}
          pageText={pageText}
          footerBG={footerBG}
          storefrontId={storefront._id}
          hideNav={hideNav}
          socialIcons={socialIcons}
          hideFooter={hideFooter}
          storefront={storefront}
          headerColor={header}
          borderColor={borders}
          faqBackground={faqBackground}
          reviewBackground={reviewBackground}
        />
      </div>
    </div>
  );
};

export default DesignFormMobile;
