'use strict';

// ensure no required ENV vars undefined
module.exports = (config) => {
  const requiredEnvVars = ['db', 'userJwtKey'];

  requiredEnvVars.forEach((envVar) => {
    if (!config.get(envVar)) {
      throw new Error(`FATAL ERROR: "${envVar} UNDEFINED"`);
    }
  });
};
