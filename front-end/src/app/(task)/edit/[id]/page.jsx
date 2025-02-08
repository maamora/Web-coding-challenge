import EditForm from '@/ui/task/editForm';
import React from 'react'

const page = ({ params }) => {

  const id = params.id;

  return <EditForm id={id} />;

};

export default page;
