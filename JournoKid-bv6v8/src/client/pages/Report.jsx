import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getActivitiesByDate from '@wasp/queries/getActivitiesByDate';
import getActivityById from '@wasp/queries/getActivityById';
import createActivity from '@wasp/actions/createActivity';
import completeActivity from '@wasp/actions/completeActivity';

export function Report() {
  const { data: activities, isLoading, error } = useQuery(getActivitiesByDate);
  const getActivityByIdFn = useQuery(getActivityById);
  const createActivityFn = useAction(createActivity);
  const completeActivityFn = useAction(completeActivity);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateActivity = () => {
    createActivityFn({
      title: 'New Activity',
      description: 'Description of the new activity',
      date: new Date(),
      completed: false,
    });
  };

  const handleCompleteActivity = (activityId) => {
    completeActivityFn({ activityId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Monthly Report</h1>
      <button
        onClick={handleCreateActivity}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create New Activity
      </button>

      <div className='mt-4'>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'
          >
            <div>
              <h2 className='text-lg font-bold'>{activity.title}</h2>
              <p>{activity.description}</p>
              <p>Date: {activity.date}</p>
            </div>
            <div>
              {activity.completed ? 'Completed' : 'Not Completed'}
              {!activity.completed && (
                <button
                  onClick={() => handleCompleteActivity(activity.id)}
                  className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}