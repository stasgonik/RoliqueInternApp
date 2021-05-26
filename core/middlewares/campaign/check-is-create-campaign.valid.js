module.exports = (req, res, next) => {
    try {
        // const { body } = req;

        next();
    } catch (e) {
        next(e);
    }
};
