import React from 'react';


export function Profile() {
  return (
    <div className='p-4'>
      <h1 className='text-4xl font-bold mb-4'>Profile Page</h1>
      <div className='bg-gray-100 p-4 rounded-lg'>
        <h2 className='text-2xl font-bold mb-2'>User Information</h2>
        <p>Name: John Doe</p>
        <p>Age: 10</p>
        <p>Grade: 4</p>
      </div>
      <div className='bg-gray-100 p-4 mt-4 rounded-lg'>
        <h2 className='text-2xl font-bold mb-2'>Activity History</h2>
        <ul className='list-disc list-inside'>
          <li>Activity 1</li>
          <li>Activity 2</li>
          <li>Activity 3</li>
        </ul>
      </div>
    </div>
  );
}