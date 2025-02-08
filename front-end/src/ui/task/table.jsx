import { DeleteTask, UpdateTask } from './button';

const Table = ({taskData}) => {

  return (
    <>
      <div className='mt-6 flow-root'>
        <div className='inline-block w-full align-middle'>
          <div className='rounded-lg bg-gray-50 p-2 md:pt-0'>
            <div className='md:hidden'>
              {taskData?.map((data) => (
                <div
                  key={data._id}
                  className='mb-2 w-full rounded-md bg-white p-4'>
                  <div className='flex items-center justify-between border-b pb-4'>
                    <div>
                      <div className='mb-2 flex items-center'>
                        <p>{data.title}</p>
                      </div>
                      <p className='text-sm text-gray-500'>{data.description}</p>
                    </div>
                  </div>
                  <div className='flex w-full items-center justify-between pt-4'>
                    <div>
                      <p className={`text-xl  font-semibold ${data.status === "Completed" ? 'text-green-700' : 'text-red-500'}`}>
                        {data.status}
                      </p>
                    </div>
                    <div className='flex justify-end gap-2'>
                      <UpdateTask id={data._id} />
                      <DeleteTask id={data._id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className='hidden min-w-full text-gray-900 md:table'>
              <thead className='rounded-lg text-left text-sm font-normal'>
                <tr>
                  <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                    Title
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Description
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Status
                  </th>
                  <th scope='col' className='px-3 py-5 font-medium'>
                    Date Creation
                  </th>
                  <th scope='col' className='relative text-center py-3 pl-6 pr-3'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white'>
                {taskData?.map((data) => (
                  <tr
                    key={data._id}
                    className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex items-center gap-3'>
                        <p>{data.title}</p>
                      </div>
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.description}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-3 font-semibold ${data.status === "Completed" ? 'text-green-700' : 'text-red-500'}`}>
                      {data.status}
                    </td>
                    <td className='whitespace-nowrap px-3 py-3'>
                      {data.dateStart}
                    </td>
                    <td className='whitespace-nowrap py-3 pl-6 pr-3'>
                      <div className='flex justify-center gap-3'>
                        <UpdateTask id={data._id} />
                        <DeleteTask id={data._id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
