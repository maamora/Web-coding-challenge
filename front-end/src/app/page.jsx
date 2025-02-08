'use client';

import urls from '@/services/urls';
import { AddTask } from '@/ui/task/button';
import Table from '@/ui/task/table';
import React, { useState, useEffect } from 'react';


export default function HomePage() {
    const [taskData, setTaskData] = useState();  
  
    useEffect(() => {
      const fetchTaskData = async () => {
        try {
          const response = await urls.getAll();
          const data = await response.data;
          setTaskData(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchTaskData();
    }, []);


  return (
    <>
    <div className="max-w-full p-8">
      <div className="flex max-w-full items-center justify-between">
        <h1 className="text-2xl">Task list</h1>
        <AddTask />
      </div>
        <Table taskData={taskData} />
    </div>
    </>
  );
}
