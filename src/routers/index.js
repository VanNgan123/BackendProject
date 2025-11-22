const UserRouter = require('./UserRouter');
const ProductRouter =require('./ProductRouter')
const CategoryRouter =require('./CategoryRouter')
const routes = (app) =>{
    app.use('/api/users',UserRouter);
    app.use('/api/products',ProductRouter)
    app.use('/api/category',CategoryRouter);
}

module.exports = routes;