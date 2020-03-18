const mongoose = require('mongoose');

// mongoose instance connection url connection
(async function(){
    try {
        mongoose.Promise = global.Promise
        await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@mongo:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin&w=1`,
            {
                auth:
                    { authdb: 'admin' },
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            });
    } catch (err) {
        console.log('Unable to connect to database.')
    }
})();