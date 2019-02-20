'use strict';

module.exports = () => {
  // log uncaught exceptions (to console) & terminate process (w/ non-zero code)
  process.on("uncaughtException", (error) => {
    console.log(`
    ERROR: ${error.message}

    ${error.stack}
    `);

    return process.exit(1);
  });

  // throw unhandled rejections as exceptions to be handled by above handler ^
  process.on('unhandledRejection', (error) => {
    throw error;
  });
};
