import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getActivityById from '@wasp/queries/getActivityById';
import completeActivity from '@wasp/actions/completeActivity';

export function Activity() {
  const { activityId } = useParams();
  const { data: activity, isLoading, error } = useQuery(getActivityById, { activityId });
  const completeActivityFn = useAction(completeActivity);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCompleteActivity = () => {
    completeActivityFn({ activityId });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold'>{activity.title}</h1>
      <p>{activity.description}</p>
      <p>Completed: {activity.completed ? 'Yes' : 'No'}</p>
      {!activity.completed && (
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handleCompleteActivity}>
          Complete Activity
        </button>
      )}
    </div>
  );
}