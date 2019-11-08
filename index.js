const express = require('express');
const app = express();

const { config } = require('./config/index');
const ticketsApi = require('./routes/tickets');

const { logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');

const notFoundHandler = require('./utils/middleware/notFoundHandler');

//body parser
app.use(express.json());

//routes
ticketsApi(app);

//404
app.use(notFoundHandler);

//errorhandlers
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


app.listen(config.port, function() {
  console.log(`listening http://localhost:${config.port}`);
});
