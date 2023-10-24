import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import getActivitiesByDate from '@wasp/queries/getActivitiesByDate';

export function Home() {
  const { data: activities, isLoading, error } = useQuery(getActivitiesByDate);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div>
      <h1>Welcome to JournoKid</h1>
      <p>This is the home page of the app. Start your adventure!</p>
      <h2>Activities</h2>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <Link to={`/activity/${activity.id}`}>{activity.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}