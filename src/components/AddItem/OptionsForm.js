import React, { useState } from 'react';
import Modal from 'react-modal';
import { isMobile } from 'react-device-detect';
import OptionsFormMobile from './OptionsFormMobile';

//mui
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';

const OptionsForm = ({
  setOptionName,
  setOptionVals,
  setOptions,
  optionName,
  optionVals,
  options,
}) => {
  const [optionVal, setOptionVal] = useState('');
  const [error, setError] = useState('');

  //adds one option to the optionVals
  const handleAddOptionVal = (e) => {
    setOptionVals([...optionVals, optionVal]);
    setOptionVal('');
  };

  //adds option(name and vals) to the array of options
  const handleAddOption = () => {
    if (optionName === '' || optionVals.length < 1) {
      setError('Fill in option name and add at least one variant');
    }

    const newOpt = {
      name: optionName,
      values: optionVals,
    };

    //add the new option to the array of options
    setOptions([...options, newOpt]);
    setOptionVals([]);
    setOptionName('');
    closeModal();
  };

  //stuff for modal
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '500px',
    },
  };

  return isMobile ? (
    <OptionsFormMobile
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      setOptionName={setOptionName}
      optionName={optionName}
      options={options}
      optionVals={optionVals}
      setOptionVals={setOptionVals}
      setOptions={setOptions}
      setOptionVal={setOptionVal}
      optionVal={optionVal}
      handleAddOption={handleAddOption}
      handleAddOptionVal={handleAddOptionVal}
      openModal={openModal}
    />
  ) : (
    <div className='pl-2 pr-2'>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        <div className='flex flex-col'>
          <p className='mb-4 text-xl font-medium border-b p-2'>
            Add an option to your item
          </p>
          {error && <Alert severity='error'>{error}</Alert>}
          <form>
            <input
              id='optionName'
              type='text'
              onChange={(e) => setOptionName(e.target.value)}
              value={optionName}
              className='border-2 border-slate-200 hover:border-slate-300 w-full rounded-lg mt-4 p-2 outline outline-0'
              placeholder='Enter option name (ex. Size)'
              autocomplete='off'
            />

            <div className='flex items-center'>
              <input
                id='optionVal'
                type='text'
                value={optionVal}
                placeholder='Enter option variants (ex. small)'
                onChange={(e) => setOptionVal(e.target.value)}
                className='border-2 border-slate-200 hover:border-slate-300 w-11/12 rounded-lg p-2 mt-4 outline outline-0'
                autocomplete='off'
              />

              <button
                type='button'
                onClick={handleAddOptionVal}
                className='h-10 border-2 border-slate-800 mt-4 w-1/12 rounded ml-10'
              >
                +
              </button>
            </div>
            <p className='text-sm text-gray-400'>Add variants one by one</p>
          </form>
          <div className='w-full flex-flex-wrap bg-gray-100 rounded mt-2'>
            {optionVals.length > 0 ? (
              optionVals.map((opt, optIndex) => (
                <Chip
                  label={opt}
                  onDelete={(e) =>
                    setOptionVals((optionVals) =>
                      optionVals.filter((_, index) => index !== optIndex)
                    )
                  }
                />
              ))
            ) : (
              <div className='w-full flex justify-center items-center h-10'>
                <p>No variants added</p>
              </div>
            )}
          </div>

          <button
            onClick={handleAddOption}
            className='w-full h-14 border-2 rounded border-slate-800 text-slate-800 mt-4 hover:bg-slate-800 hover:text-white'
            type='button'
          >
            Add Option
          </button>

          <button
            onClick={closeModal}
            className='w-full h-10 border-2 rounded border-red-400 text-red-400 mt-2 hover:bg-red-400 hover:text-white'
            type='button'
          >
            Cancel
          </button>
        </div>
      </Modal>

      {options.length > 0 ? (
        options.map((opt, optIndex) => (
          <div className='w-full flex flex-col bg-gray-100 p-2 relative mt-2'>
            <button
              className='absolute right-0 mr-2 text-red-500 hover:text-red-700'
              onClick={(e) =>
                setOptions((options) =>
                  options.filter((_, index) => index !== optIndex)
                )
              }
              type='button'
            >
              Delete
            </button>
            <p className='text-xl'>{opt?.name}</p>
            <div className='w-full flex flex-wrap mt-2'>
              {opt.values.map((value) => (
                <Chip label={value} className='ml-2' />
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className='w-full flex flex-col items-center justify-center h-18 p-2 rounded bg-gray-100 mt-2'>
          <p className='text-lg font-medium'>No options added</p>
          <p>Add options like size or color</p>
        </div>
      )}

      <button
        className='w-full h-16 border-2 rounded border-slate-800 text-slate-800 mt-4 font-medium'
        onClick={openModal}
        type='button'
      >
        {options.length > 0 ? '+ Add another option' : '+ Add option'}
      </button>
    </div>
  );
};

export default OptionsForm;
