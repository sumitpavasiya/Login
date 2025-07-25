
import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, deleteProduct, updateProduct } from './redux/blogs/Blogsplice';
import type { RootState, AppDispatch } from './redux/store';
import { categories } from './constants';
import { useNavigate } from "react-router-dom";

const ProductsList: React.FC = () => {

  interface BLogs {
    id: string;
    title: string;
    description: string;
    conclusion: string;
    thumbnail: string;
    category: string;
    createdAt: string;
  }
  const [open, setopen] = useState<Boolean>(false);
  const [editid, seteditid] = useState<string | null>(null);
  const [deleteid, setdeleteid] = useState<string | null>(null);
  const [deleteconfirm, setdeleteconfirm] = useState<Boolean>(false)
  const [filteredList, setFilteredList] = useState<BLogs[]>([]);
  const useAppDispatch: () => AppDispatch = useDispatch;
  const dispatch = useAppDispatch();
  const { list, loading, error } = useSelector((state: RootState) => state.blogs);
  const navigate = useNavigate();

  useEffect(() => {

    setFilteredList(list)
  }, [list])

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (error) return <p>Error: {error}</p>;


  const postData = (values: BLogs) => {
    if (editid) {
      dispatch(updateProduct({ id: editid, value: values }))
    } else {
      dispatch(addProduct(values))
    }
    setopen(false)
  }



  const handleSearch = (keyword: string) => {
    if (keyword.trim() === '') {
      setFilteredList(list);
    } else {
      const filtered = list.filter((item: BLogs) =>
        item.title.toLowerCase().includes(keyword.toLowerCase()) ||
        item.description.toLowerCase().includes(keyword.toLowerCase()) ||
        item.category.toLowerCase().includes(keyword.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }
  const categoryData = (items: string) => {
    const orignal = items.replace(/\s+/g, '').toLowerCase();

    if (orignal === 'all') {
      setFilteredList(list);
    } else {
      const data = list.filter(
        (item) =>
          item.category.replace(/\s+/g, '').toLowerCase() === orignal
      );
      setFilteredList(data);
    }
  };


  const deleteData = (id: string | null) => {
    if (id) {
      dispatch(deleteProduct(id));
    }
    setdeleteconfirm(false);
  };


  const formatDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };


  const handleshare = (item: BLogs) => {
    navigate(`/blog/${item.category}/${item.id}`, { state: { item } });
  }
  return (
    <>
      <div className="p-6 space-y-8">
        <Formik
          initialValues={{
            id: '',
            title: '',
            description: '',
            conclusion: '',
            thumbnail: '',
            category: '',
            createdAt: '',
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Name Required'),
            description: Yup.string().required('Description Required'),
            thumbnail: Yup.string().required('Image required'),
            category: Yup.string().required('Category required'),
            conclusion: Yup.string().required('conclusion required')
          })}
          onSubmit={postData}
        >
          {({ setFieldValue, setValues }) => (
            <>
              <div className='container'>
                <div className='w-full flex justify-end pt-6'>
                  <button
                    className="bg-orange-500 hover:bg-white hover:text-black text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition"
                    onClick={() => {
                      seteditid(null);
                      setValues({ id: '', title: '', description: '', thumbnail: '', category: '', createdAt: `${formatDate()}`, conclusion: '' });
                      setopen(true);
                    }}>
                    ADD BLOG
                  </button>
                </div>
              </div>

              <div className="flex   ">
                <div className='w-2/4'>

                  <div className="max-w-md mx-auto">

                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                      </div>
                      <input
                        type="search"
                        onChange={(e) => handleSearch(e.target.value)}
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Search Product"
                      />
                    </div>


                  </div>
                </div>
                <div className='w-2/4 flex pb-4 gap-3 overflow-x-auto'>
                  {categories.map((item, index) => (
                    <button
                      onClick={() => categoryData(item)}
                      className="px-4 py-2 border border-orange-200 w-full rounded-full  hover:bg-orange-500 hover:text-white transition whitespace-nowrap"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>


              {open && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto'>
                  <div className=' w-full md:w-2/4 rounded h-screen relative p-6 '>
                    <Form className="bg-white rounded-lg shadow-md p-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        {editid !== null ? 'Update Product' : 'Add Product'}
                      </h2>
                      <div className='grid grid-cols-1  gap-6'>
                        <div>
                          <label className='block mb-2 font-medium'>Title *</label>
                          <Field as="textarea" name="title" placeholder="Title" className="p-2 border rounded w-full  resize-none" />
                          <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />
                        </div>
                        <div>
                          <label className='block mb-2 font-medium'>Description *</label>
                          <Field as="textarea" name="description" placeholder="Description" className="p-2 border rounded w-full  resize-none" />
                          <ErrorMessage name="description" component="div" className="text-red-500 text-xs" />
                        </div>
                        <div>
                          <label className='block mb-2 font-medium'>Conclusion *</label>
                          <Field as="textarea" name="conclusion" placeholder="conclusion" className="p-2 border rounded w-full  resize-none" />
                          <ErrorMessage name="conclusion" component="div" className="text-red-500 text-xs" />
                        </div>
                        <div>
                          <label className='block mb-2 font-medium'>Category *</label>
                          <Field as="select" name="category" className="p-2 border rounded w-full">
                            <option value="" selected>Select category</option>
                            {['Expert advice',
                              'Growth tips',
                              'Case studies'].map(option => (
                                <option value={option}>{option}</option>
                              ))}
                          </Field>
                          <ErrorMessage name="category" component="div" className="text-red-500 text-xs" />
                        </div>
                        <div>
                          <label className='block mb-2 font-medium'>Image *</label>
                          <input
                            type="file"
                            accept="image/*"
                            className="p-2 border rounded w-full"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                  setFieldValue('thumbnail', reader.result);
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                          <ErrorMessage name="thumbnail" component="div" className="text-red-500 text-xs" />
                        </div>
                      </div>
                      <div className='flex justify-center mt-8 gap-4'>
                        <button type="submit" className="bg-orange-500 hover:bg-white hover:text-black text-white text-lg font-semibold py-3 px-6 rounded-md shadow-md transition">
                          {editid !== null ? 'Update blog' : 'Add blog'}
                        </button>
                        <button type="button" onClick={() => setopen(false)} className="bg-gray-100 hover:bg-gray-200  text-lg font-semibold py-3 px-6 rounded-md shadow-md transition">
                          Cancel
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              )}

              {deleteconfirm && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto'>
                  <div className=' w-full md:w-2/4 rounded relative p-6'>

                    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-md mt-8 max-w-md mx-auto">
                      <p className="text-center text-gray-700 text-lg font-medium mb-6">
                        Do you really want to delete this? Once it's gone, there's no way to recover it.
                      </p>
                      <div className="flex gap-4">
                        <button
                          type="submit"
                          className="bg-orange-500 hover:bg-white hover:text-black text-white text-lg font-semibold py-2 px-6 rounded-md shadow transition duration-200"
                          onClick={() => (deleteData(deleteid))}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          onClick={() => setdeleteconfirm(false)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg font-semibold py-2 px-6 rounded-md shadow transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              <div className="container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {loading ? (
                  <div className="col-span-full flex justify-center items-center">
                    <div className="flex items-center justify-center">
                      <div
                        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                        role="status">
                        <span
                          className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        >Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : filteredList?.length === 0 ? (
                  <div className="col-span-full text-center  text-lg">404 - No products found</div>
                ) : (
                  filteredList?.map((item, index) => (
                    <div className="space-y-2 cursor-pointer" >
                      <div onClick={() => handleshare(item)}>

                        <img
                          src={item.thumbnail}
                          alt="Blog"
                          className="w-full  object-cover rounded-lg"
                        />
                        <div className="flex text-xs font-bold text-orange-500 items-center">
                          {item.category}

                        </div>
                        <h3 className="text-xl font-bold leading-snug">
                          {item.title.length > 60 ? `${item.title.slice(0, 60)}...` : item.title}
                        </h3>

                        <p className="text-sm text-primary whitespace-pre-wrap">
                          {item.description.length > 100
                            ? `${item.description.slice(0, 100)}...`
                            : item.description}
                        </p>

                        <p className="text-sm text-primary">{item.createdAt}</p>

                      </div>

                      <div className="flex gap-3 mt-4">
                        <button
                          onClick={() => {
                            setdeleteconfirm(true);
                            setdeleteid(item.id);
                          }}
                          className="px-4 py-2 text-sm font-semibold text-red-600 border border-red-300 rounded-md hover:bg-red-50 hover:border-red-500 transition"
                        >
                          Delete
                        </button>

                        <button
                          onClick={() => {
                            setValues(item);
                            seteditid(item.id);
                            setopen(true);
                          }}
                          className="px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 hover:border-gray-500 transition"
                        >
                          Edit
                        </button>
                      </div>

                    </div>
                  ))
                )}
              </div>

            </>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ProductsList;
