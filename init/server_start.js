'use strict';

// core node modules
const http = require('http');


// create server | set port | start server
module.exports = (app) => {
  const server = http.createServer(app);
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    return console.log(`SERVER LISTENING ON PORT: ${PORT}`);
  });
};
