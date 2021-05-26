const { models: { Brand } } = require('../dataBase');

module.exports = {
    createBrand: (obj) => Brand.create(obj),
    getAllBrands: (query) => Brand.find(query),
    getBrandById: (id) => Brand.findById(id)
};
