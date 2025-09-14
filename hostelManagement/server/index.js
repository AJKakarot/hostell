require('dotenv').config(); // <-- must be first
const app = require('./config/express');
const config = require('./config/config');
const env = process.env.NODE_ENV || 'development';

// initialize mongo
require('./config/mongoose');
const passport = require('./middleware/passport');


// listen to the port
app.listen(config.port, () => {
    console.log(`listening on port ${config.port} (${config.env})`);
});

