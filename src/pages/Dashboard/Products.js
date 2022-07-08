import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import img from '../../media/noProducts.svg';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import { useGetProductsQuery } from '../../api/productsApiSlice';
import { setProductData, deleteProduct } from '../../redux/productRedux';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import Spinner from '../../components/Spinner';
import Footer from '../../components/Footer';
import { FiPackage } from 'react-icons/fi';
import { AiOutlineFile, AiOutlineCreditCard } from 'react-icons/ai';

//mui
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';

const Products = () => {
  const dispatch = useDispatch();

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useGetProductsQuery();

  console.log(products);

  useEffect(() => {
    refetch(); //refetches the products from API
  }, []);

  //for mui data grid
  const cols = [
    {
      field: '_id',
      headerName: 'ID',
      width: 250,
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 175,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 225,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <>
            {params.row.type === 'Physical' ? (
              <p className='flex items-center'>
                Physical
                <FiPackage className='ml-2' />
              </p>
            ) : params.row.type === 'Subscription' ? (
              <p className='flex items-center'>
                Subscription
                <AiOutlineCreditCard className='ml-2' />
              </p>
            ) : (
              <p className='flex items-center'>
                Digital
                <AiOutlineFile className='ml-2' />
              </p>
            )}
          </>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price $',
      width: 100,
      align: 'center',
      headerAlign: 'center',
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return params.row.published ? (
          <button className='rounded-lg w-80 text-lime-600 bg-lime-200 font-semibold hover:cursor-default'>
            Published
          </button>
        ) : (
          <button className='rounded-lg w-60  bg-sky-200 text-sky-600 font-semibold hover:cursor-default'>
            Draft
          </button>
        );
      },
    },
    {
      field: 'action',
      headerName: 'Edit / Delete',
      width: 150,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <>
            <Link to={`/dashboard/product/edit/${params.row._id}`}>
              <HiOutlineDotsVertical className='text-2xl hover:text-sky-600' />
            </Link>
          </>
        );
      },
    },
  ];

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    content =
      products.length > 0 ? (
        <>
          <div className='w-full flex justify-between'>
            <h2 className='text-3xl font-semibold'>Your Products</h2>
            <Link
              to='/dashboard/addproduct'
              className='h-8 w-36 border-2 border-stone-800 hover:text-white hover:bg-stone-800 font-medium text-stone-800 rounded-md text-sm flex justify-center items-center'
            >
              Add Product +
            </Link>
          </div>
          <div className='w-full mx-auto mt-6'>
            {/* data grid copied over from old component */}
            <DataGrid
              rows={products}
              columns={cols}
              getRowId={(row) => row._id}
              checkboxSelection
              autoHeight
              disableSelectionOnClick={true}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableExtendRowFullWidth={true}
              components={{
                noRowsOverlay: () => (
                  <Stack
                    height='100%'
                    alignItems='center'
                    justifyContent='center'
                  >
                    No rows in DataGrid
                  </Stack>
                ),
                noResultsOverlay: () => (
                  <Stack
                    height='100%'
                    alignItems='center'
                    justifyContent='center'
                  >
                    Local filter returns no result
                  </Stack>
                ),
              }}
            />
          </div>
        </>
      ) : (
        <div className='border-2 border-gray-200 rounded w-full h-full flex flex-col justify-center items-center mt-4'>
          <h2 className='text-xl font-medium'>
            You have not added any products yet!
          </h2>
          <img src={img} className='w-2/12' />
          <Link to='/dashboard/addproduct'>
            <button className='border-2 w-36 h-8 rounded-md border-gray-200 hover:border-gray-400 hover:text-slate-400 text-slate-200 font-semibold mt-4'>
              Add product +
            </button>
          </Link>
        </div>
      );
  }

  return (
    <>
      <Navbar />
      <Topbar />
      <div className='max-w-6xl mx-auto h-screen'>{content}</div>
      <Footer />
    </>
  );
};

export default Products;
