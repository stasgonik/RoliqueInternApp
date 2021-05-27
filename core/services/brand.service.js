const { models: { Brand } } = require('../dataBase');

module.exports = {
    createBrand: (obj) => Brand.create(obj),
    getAllBrands: (query) => Brand.find(query).select('-__v'),
    getBrandById: (id) => Brand.findById(id),
    getSingleBrand: (query) => Brand.findOne(query),
};
