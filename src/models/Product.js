const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {type: String , require:true},
    slug: {type: String , require: true},
    
})