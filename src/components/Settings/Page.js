import { Alert, Checkbox, Label, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useCheckPageMutation,
  useUpdatePageMutation,
} from '../../api/storefrontApiSlice';
import { toast } from 'react-toastify';
import { XCircle } from 'react-feather';

const Page = ({ user, isFetching, refetch }) => {
  const [pageName, setPageName] = useState(user?.store?.name);
  const [filtering, setFiltering] = useState(user?.store?.allowFiltering);
  const [sales, setSales] = useState(user?.store?.showSales);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');
  const [updatingPage, setUpdatingPage] = useState(false);
  const [taken, setTaken] = useState(false);

  const [updatePage, result] = useUpdatePageMutation();
  const [checkPage, { result: res }] = useCheckPageMutation();

  const handleUpdatePage = async (e) => {
    e.preventDefault();

    setUpdatingPage(true);

    //check if the user changed the name
    const sameName = user?.store?.name === pageName ? true : false;

    try {
      if (!sameName) {
        const checkPageReq = await checkPage({ pageName: pageName }).unwrap();

        if (checkPageReq === 'Name taken') {
          setTaken(true);
          setUpdatingPage(false);
          return;
        }
      }

      const updateReq = await updatePage({
        storeId: user?.store?._id,
        pageName: pageName,
        filtering: filtering,
        sales: sales,
      }).unwrap();

      if (updateReq === 'Page updated') {
        refetch();
        setEdit(false);
        setUpdatingPage(false);
        toast.success('Page settings updated!', {
          style: { color: 'rgb(28 25 23)' },
        });
        return;
      }
    } catch (err) {
      setUpdatingPage(false);
      setError('There was an error');
    }
  };

  useEffect(() => {
    setTaken(false);
  }, [pageName]);

  return isFetching ? (
    <div className='w-full h-72 flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
    <div className='w-full border border-gray-200 rounded-md p-4 flex flex-col'>
      {edit ? (
        <>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-sm text-stone-800'>Edit page</p>
              <p className='text-xs text-stone-600'>
                Change page name and adjust other settings
              </p>
            </div>

            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='hover:bg-red-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={(e) => setEdit(!edit)}
              >
                Cancel
              </button>
              <button
                type='button'
                className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
                onClick={handleUpdatePage}
                disabled={updatingPage}
              >
                Save
              </button>
            </div>
          </div>

          <form className='flex flex-col items-start mt-2'>
            {taken && <p className='text-xs text-red-500'>page name taken</p>}
            {error ? <Alert color='failure'>There was an error</Alert> : ''}
            <input
              type='text'
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              className='bg-gray-50 rounded-md text-sm border-gray-200 hover:bg-gray-200 focus:bg-gray-200 focus:border-gray-200 w-3/6'
              placeholder='Page name'
            />
            <p className='text-xs text-stone-600'>{`fruntt.com/${pageName}`}</p>
          </form>

          <div className='flex flex-col gap-2 mt-4'>
            <div className='flex items-center gap-2'>
              <Checkbox
                checked={filtering}
                onChange={(e) => setFiltering(e.target.checked)}
              />
              <Label htmlFor='accept' className='flex'>
                Allow filtering of templates
              </Label>
            </div>

            <div className='flex items-center gap-2'>
              <Checkbox
                checked={sales}
                onChange={(e) => setSales(e.target.checked)}
              />
              <Label htmlFor='accept' className='flex'>
                Show number of sales for each template
              </Label>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className='flex items-center justify-between w-full'>
            <div className='flex flex-col'>
              <p className='text-sm text-stone-800'>Page</p>
              <p className='text-xs text-stone-600'>
                Change page name and adjust other settings
              </p>
            </div>

            <button
              type='button'
              className='bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2 text-xs'
              onClick={(e) => setEdit(!edit)}
            >
              Edit
            </button>
          </div>

          <div className='flex flex-col items-start mt-2'>
            <input
              type='text'
              value={user?.store?.name}
              className='bg-gray-50 rounded-md text-sm border-gray-50 w-3/6'
              disabled
            />
            <p className='text-xs text-stone-600'>{`fruntt.com/${user?.store?.name}`}</p>
          </div>

          <div className='flex flex-col gap-2 mt-4'>
            <div className='flex items-center gap-2'>
              <Checkbox
                color='gray'
                disabled
                checked={user?.store?.allowFiltering}
              />
              <Label htmlFor='accept' className='flex'>
                Allow filtering of templates
              </Label>
            </div>

            <div className='flex items-center gap-2'>
              <Checkbox
                color='gray'
                disabled
                checked={user?.store?.showSales}
              />
              <Label htmlFor='accept' className='flex'>
                Show number of sales for each template
              </Label>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
