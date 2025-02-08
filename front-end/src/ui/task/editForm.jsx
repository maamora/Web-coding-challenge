'use client';

import urls from '@/services/urls';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';


const EditForm = ({ id }) => {
  const [updateForm, setUpdateForm] = useState({
    title: '',
    description: '',
    status: '',
  });
  const router = useRouter();

  useEffect(() => {
    const fetchTaskDataById = async () => {
      try {
        const response = await urls.getById(id);
        const data = response.data;
        setUpdateForm({
          title: data.title || '',
          description: data.description || '',
          status: data.status || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchTaskDataById();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const updateSubmit = async (e) => {
    e.preventDefault();
    updateTask(updateForm);
    router.push(`/`)
  };

  async function updateTask(updateFormData) {
    await urls.update(id, updateFormData).catch((e) => {
      console.log('error edit task', e);
    });
  }

  return (
    <>
      <div className='w-full p-8'>
        <h1 className='mb-8 text-xl md:text-2xl'>Edit Task</h1>
        <form onSubmit={updateSubmit}>
          <div className='grid gap-4 mb-4 grid-cols-2 mt-2'>
            <div className='relative px-5 z-0 w-full mb-1 group col-span-2 sm:col-span-1'>
              <label
                htmlFor='title-input-update'
                className='block text-sm font-medium text-gray-900 '>
                Ttile
              </label>
              <input
                name='title'
                onChange={handleChange}
                value={updateForm.title}
                placeholder='Write title...'
                type='text'
                id='title-input-update'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                required
              />
            </div>
            <div className='relative px-5 z-0 w-full mb-1 group col-span-2 sm:col-span-1'>
              <label
                htmlFor='status-input'
                className='block  text-sm font-medium text-gray-900 '>
                Status
              </label>
              <select name='status' id='status-input'
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-4 text-sm outline-2 placeholder:text-gray-500"
                value={updateForm.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className='relative z-0 w-full px-5 mb-1 group col-span-2'>
              <label
                htmlFor='description-input'
                className='block  text-sm font-medium text-gray-900'>
                Description
              </label>
              <textarea
                name='description'
                value={updateForm.description}
                onChange={handleChange}
                id='description-input'
                rows={3}
                className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none'
                placeholder='Write your description here...' required></textarea>
            </div>
          </div>
          <div className='flex justify-self-end p-6 space-x-2 border-gray-200 rounded-b'>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                Edit
              </button>
              <Link
                href='/'
                className='flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200'>
                Cancel
              </Link>
            </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
