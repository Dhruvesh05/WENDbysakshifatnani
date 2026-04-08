let processHandlersRegistered = false;

export async function register() {
  if (processHandlersRegistered) {
    return;
  }

  processHandlersRegistered = true;

  process.on('unhandledRejection', (reason) => {
    console.error('[server] unhandled promise rejection', reason);
  });

  process.on('uncaughtException', (error) => {
    console.error('[server] uncaught exception', error);
  });
}
