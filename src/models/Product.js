const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {type: String , require:true},
    slug: {type: String , require: true},
    description : {type : String},
    price : {type : Number, require : true},
    salePrice :{type: Number},
    brand :{type: String},
    categories: [{type : mongoose.Schema.Types.ObjectId,ref : Category}],
    image: [{type:String}],
    stock:{type : Number , default: 0},
    specs:{type: Object},
},{timestamps:true});

const Product = mongoose.model("Product",productSchema);
module.export = Product;

