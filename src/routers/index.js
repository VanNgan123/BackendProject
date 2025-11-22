const UserRouter = require('./UserRouter');
const ProductRouter =require('./ProductRouter')
const CategoryRouter =require('./CategoryRouter')
const CartRouter = require("./CartRouter");
const OrderRouter = require("./OrderRouter");
const routes = (app) =>{
    app.use('/api/users',UserRouter);
    app.use('/api/products',ProductRouter)
    app.use('/api/category',CategoryRouter);
    app.use("/api/cart", CartRouter);
    app.use("/api/orders", OrderRouter);
}

module.exports = routes;