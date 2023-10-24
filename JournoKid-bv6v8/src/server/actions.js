import HttpError from '@wasp/core/HttpError.js'

export const createActivity = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { title, description } = args;
  const currentDate = new Date();

  // Create the new activity
  const newActivity = await context.entities.Activity.create({
    data: {
      title,
      description,
      date: currentDate,
      completed: false,
      userId: context.user.id
    }
  });

  return newActivity;
}

export const completeActivity = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const activity = await context.entities.Activity.findUnique({
    where: { id: args.activityId }
  })

  if (activity.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Activity.update({
    where: { id: args.activityId },
    data: { completed: true }
  })
}