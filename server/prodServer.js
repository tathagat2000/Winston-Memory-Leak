const next = require("next");

const prodServer = (expressServer) => {
  const app = next({ dev: false });
  const handle = app.getRequestHandler();

  app
    .prepare()
    .then(() => {
      const server = expressServer();

      const server_port = 3000;

      console.log("Attempting to start server on Port 3000");

      // Default catch-all handler to allow Next.js to handle all routes
      server.all("*", (req, res) => {
        return handle(req, res);
      });

      server.listen(server_port, (err) => {
        if (err) throw err;

        console.log(`> Server listening on port 3000`);
      });
    })
    .catch((err) => {
      console.error(`An error occurred, unable to start the server. ${err}`);
      process.exit(1);
    });
};

module.exports = prodServer;
