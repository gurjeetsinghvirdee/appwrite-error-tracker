import appwriteLogError from './errorTracking';

process.on('uncaughtException', (error) => {
  appwriteLogError(error);
});

process.on('unhandledRejection', (reason, promise) => {
  appwriteLogError(reason);
});