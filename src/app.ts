import appwriteLogError from './errorTracking';

process.on('uncaughtException', (error) => {
  appwriteLogError(error);
});

process.on('unhandledRejection', (reason, promise) => {
  appwriteLogError(reason);
});

throw new Error("This is a test error to verify logging");