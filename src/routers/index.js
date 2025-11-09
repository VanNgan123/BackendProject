const UserRouter = require('./UserRouter');

const routes = (app) =>{
    app.use('/api/users',UserRouter);
}

module.exports = routes;