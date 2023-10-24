import HttpError from '@wasp/core/HttpError.js'

export const getActivitiesByDate = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const { userId } = context.user;

  const activities = await context.entities.Activity.findMany({
    where: {
      date: {
        gte: new Date(args.startDate),
        lte: new Date(args.endDate)
      },
      userId
    }
  });

  return activities;
}

export const getActivityById = async ({ id }, context) => {
  if (!context.user) {
    throw new HttpError(401)
  }

  const activity = await context.entities.Activity.findUnique({
    where: { id },
    include: { user: true }
  });

  if (!activity) {
    throw new HttpError(404, `No activity with id ${id}`);
  }

  if (activity.userId !== context.user.id) {
    throw new HttpError(403, `User is not the owner of the activity with id ${id}`)
  }

  return activity;
}